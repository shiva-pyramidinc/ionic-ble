import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //fitbit - C7:34:18:39:E3:91
  //bp - D1:08:0B:93:BD:00
  //bp new - B0:49:5F:02:9F:E6
  //mi band - E0:39:6E:F7:D8:ED
  deviceAddress: string = 'B0:49:5F:02:9F:E6';
  devices: any[] = [];
  statusMessage: string;
  interval: any;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.connect();
    })

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    // this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 10).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  connect() {
    console.log("connecting...");

    this.ble.autoConnect(this.deviceAddress).subscribe(
      success => {
        console.log(JSON.stringify(success));
        // this.interval = setInterval(() => {
        this.read(success);
        // }, 500)
      },
      error => { console.log(JSON.stringify(error)) }
    );
  }

  read(success) {
    /*
    //"b305b680-aee7-11e1-a730-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "b305b680-aee7-11e1-a730-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"db5b55e0-aee7-11e1-965e-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "db5b55e0-aee7-11e1-965e-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"e0b8a060-aee7-11e1-92f4-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "e0b8a060-aee7-11e1-92f4-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"0ae12b00-aee8-11e1-a192-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "0ae12b00-aee8-11e1-a192-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"10e1ba60-aee8-11e1-89e5-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "10e1ba60-aee8-11e1-89e5-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"49123040-aee8-11e1-a74d-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "49123040-aee8-11e1-a74d-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"4d0bf320-aee8-11e1-a0d9-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "4d0bf320-aee8-11e1-a0d9-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"5128ce60-aee8-11e1-b84b-0002a5d5c51b"
    this.ble.startNotification('D1:08:0B:93:BD:00', 'ecbe3980-c9a2-11e1-b1bd-0002a5d5c51b', "5128ce60-aee8-11e1-b84b-0002a5d5c51b").subscribe(
      (data) => {
        console.log("Hooray we have data" + JSON.stringify(data));
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
      
    //"560f1420-aee8-11e1-8184-0002a5d5c51b"
    this.ble.startNotification(this.deviceAddress, '1810', "2a35").subscribe(
      (data) => {
        console.log("Hooray we have data from '1810', '2a35'");
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
    //"8858eb40-aee8-11e1-bb67-0002a5d5c51b"
    // read data from a characteristic, do something with output data
    this.ble.startNotification(this.deviceAddress, '1810', "2a49").subscribe(
      (data) => {
        console.log("Hooray we have data '1810', '2a49'");
        console.log(JSON.stringify(data));
      }, (e) => {
        console.log("Failed to read characteristic from device.");
        console.log(e)
      });
*/
    success.characteristics.forEach(e => {
      this.ble.startNotification(this.deviceAddress, e.service, e.characteristic).subscribe(
        (data) => {
          console.log("Hooray we have data for");
          console.log("Service" + e.service);
          console.log("characteristic " + e.characteristic);

          let fdata = new Uint8Array(data);
          console.log(fdata);
          console.log(JSON.stringify(fdata));
        }, (e) => {
          console.log("Failed to read characteristic from device.");
          console.log(e)
        });
    });

  }

  clearTimer() {
    clearInterval(this.interval);
  }
}
