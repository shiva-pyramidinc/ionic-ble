import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

/**
 * Generated class for the BluetoothlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetoothle',
  templateUrl: 'bluetoothle.html',
})
export class BluetoothlePage {

  bonded: boolean = false;
  connected: boolean = false;

  deviceAddress: string = 'B0:49:5F:02:9F:E6';//B0:49:5F:02:9F:E6 || 90ED30BC-CEF3-7B0A-1A7A-1628CC2662E5
  systolic: any;
  diastolic: any;
  pulse: any;
  devices: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform,
    private bluetoothle: BluetoothLE, private ngZone: NgZone) {
    this.platform.ready().then((readySource) => {

      console.log('Platform ready from', readySource);

      this.bluetoothle.initialize().then(ble => {
        console.log('ble', ble.status) // logs 'enabled'

        // let arr = this.bluetoothle.encodedStringToBytes('FmYATQBVAAAAAAAAAABGAAAA');
        // console.log(JSON.stringify(arr));
      });

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothlePage');
  }

  startScan() {
    this.bluetoothle.startScan({
      allowDuplicates: false,
      services: [
        "1810"
      ]
    }).subscribe(
      res => {
        console.log(JSON.stringify(res))
        if (res.name != null) {
          this.devices.push({
            localName: (<any>res).localName,
            name: res.name,
            address: res.address
          })
        }
      },
      err => {
        console.log(JSON.stringify(err))
      }
    )
  }

  stopScan() {
    this.bluetoothle.stopScan().then(
      res => {
        console.log(JSON.stringify(res))
      },
      err => {
        console.log(JSON.stringify(err))
      }
    );
  }


  bond() {
    this.bluetoothle.bond({ "address": this.deviceAddress, autoConnect: true }).subscribe(
      success => this.bondSuccess(success),
      error => this.bondError(error)
    );
  }


  stringToBytes(string) {
    var bytes = new ArrayBuffer(string.length * 2);
    var bytesUint16 = new Uint16Array(bytes);
    for (var i = 0; i < string.length; i++) {
      bytesUint16[i] = string.charCodeAt(i);
    }
    return new Uint8Array(bytesUint16);
  }

  bondSuccess(success) {
    this.bonded = true;
    console.log('bondSuccess')
    console.log(JSON.stringify(success));
  }

  bondError(error) {
    this.bonded = false;
    if (error.message = "Device already bonded") {
      this.bonded = true;
    }
    console.log('bondError')
    console.log(JSON.stringify(error));
  }

  unbond() {
    this.bluetoothle.unbond({ "address": this.deviceAddress }).then(
      success => this.unBondSuccess(success),
      error => this.unBondError(error)
    );
  }

  unBondSuccess(success) {
    console.log('unBondSuccess')
    this.bonded = false;
    console.log(JSON.stringify(success));
  }

  unBondError(error) {
    console.log('unBondError')
    this.bonded = true;
    if (error.message = "Device already unbonded") {
      this.bonded = false;
    }
    console.log(JSON.stringify(error));
  }

  connect() {
    console.log('connect...')
    this.bluetoothle.connect({ "address": this.deviceAddress, autoConnect: true }).subscribe(
      success => { this.connectSuccess(success); this.discover(); },
      error => { this.connectError(error); this.discover(); }
    );
  }

  discover() {
    console.log('discover');
    this.bluetoothle.discover({ "address": this.deviceAddress }).then(
      success => { console.log(JSON.stringify(success)); this.setNotification(); },
      error => { console.log(JSON.stringify(error)) }
    );
  }

  connectSuccess(success) {
    this.connected = true;
    console.log('connectSuccess')
    console.log(JSON.stringify(success));
  }

  setNotification() {
    let services = [{
      "service": "1810",
      "characteristic": "2A35"
    }];

    services.forEach(s => {
      this.bluetoothle.subscribe({
        "address": this.deviceAddress,
        "service": s.service,
        "characteristic": s.characteristic,
      }).subscribe(
        (data) => {
          console.log('Fetched readings from BP monitor.')
          console.log("startNotification: Hooray we have data for");
          console.log("startNotification: Service " + s.service);
          console.log("startNotification: characteristic " + s.characteristic);

          // let fdata = new Uint8Array(data.value);
          // this.setStatus('Fetched readings from BP monitor.')
          console.log(JSON.stringify(data));
          if (data.value) {
            let fdata = this.bluetoothle.encodedStringToBytes(data.value);
            this.ngZone.run(() => {
              this.systolic = fdata[1];
              this.diastolic = fdata[3];
              this.pulse = fdata[14];
            })
          }
        }, (e) => {
          console.log("startNotification: Failed to read characteristic from device.");
          console.log(JSON.stringify(e))
        });
    });
  }

  connectError(error) {
    this.connected = false;
    console.log('connectError')
    console.log(JSON.stringify(error));
  }

  disconnect() {
    this.bluetoothle.disconnect({ "address": this.deviceAddress }).then(
      success => this.disconnectSuccess(success),
      error => this.disconnectError(error)
    );
  }

  close() {
    this.bluetoothle.close({ "address": this.deviceAddress }).then(
      success => this.disconnectSuccess(success),
      error => this.disconnectError(error)
    );
  }

  disconnectSuccess(success) {
    console.log('disconnectSuccess')
    this.connected = false;
    console.log(JSON.stringify(success));
    this.close();
  }

  disconnectError(error) {
    console.log('disconnectError')
    this.connected = true;
    console.log(JSON.stringify(error));
    this.close();
  }

}
