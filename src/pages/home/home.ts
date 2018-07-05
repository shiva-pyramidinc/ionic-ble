import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { TextEncoder } from 'text-encoding';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //fitbit - C7:34:18:39:E3:91
  //bp - D1:08:0B:93:BD:00
  //bp new - B0:49:5F:02:9F:E6
  //mi band - E0:39:6E:F7:D8:ED
  //GATT BP service - 0x1810, 
  //GATT characterestic 
  // Blood Pressure Feature 0x2A49  
  // Blood Pressure Measurement	0x2A35
  deviceAddress: string = '90ED30BC-CEF3-7B0A-1A7A-1628CC2662E5';
  devices: any[] = [];
  statusMessage: string;
  interval: any;
  ioService: string = "1815";
  passwordChar: string = "ffff";
  passwordString = "675168";
  systolic = null;
  diastolic = null;
  pulse = null;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone) {

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

  getBondedDevices() {

  }

  encodeCommand(cmd: string) {
    const encoded = new TextEncoder('utf-8').encode(`${cmd}`);
    //encoded[0] = encoded.length - 1;
    return encoded;
  }

  setPassword(password: string) {
    console.log("writing passwd " + password);
    this.ble.write(this.deviceAddress, this.ioService, this.passwordChar, this.encodeCommand(password).buffer).then(
      () => { console.log("password written"); this.read(); },
      e => { console.log("password Error"); console.log(JSON.stringify(e)); this.read(); }
    );
  }

  connect() {
    this.systolic = null;
    this.diastolic = null;
    this.pulse = null;

    this.setStatus('Connecting to BP monitor...')
    console.log("connecting...");

    this.ble.autoConnect(this.deviceAddress).subscribe(
      success => {
        this.setStatus('Connected to BP monitor.')
        console.log(JSON.stringify(success));
        this.setPassword(this.passwordString);
      },
      error => { this.setStatus('Disconnected from BP monitor.'); console.log(JSON.stringify(error)) }
    );
  }

  read() {
    let services = [
      {
        service: '1810',
        characteristic: '2A35'
      }];
    this.setStatus('Fetching readings from BP monitor...')
    services.forEach((e, i) => {
      // success.characteristics.forEach((e, i) => {
      this.ble.startNotification(this.deviceAddress, e.service, e.characteristic).subscribe(
        (data) => {
          // console.log("startNotification: Hooray we have data for");
          // console.log("startNotification: Service " + e.service);
          // console.log("startNotification: characteristic " + e.characteristic);

          let fdata = new Uint8Array(data);
          this.setStatus('Fetched readings from BP monitor.')
          console.log(JSON.stringify(fdata));
          this.ngZone.run(() => {
            this.systolic = fdata[1];
            this.diastolic = fdata[3];
            this.pulse = fdata[14];
          })

        }, (e) => {
          this.setStatus('Failed to get readings from BP monitor.')
          console.log("startNotification: Failed to read characteristic from device.");
          console.log(e)
        });

      // this.ble.read(this.deviceAddress, e.service, e.characteristic).then(
      //   (data) => {
      //     console.log("read: Hooray we have data for");
      //     console.log("read: Service " + e.service);
      //     console.log("read: characteristic " + e.characteristic);

      //     let fdata = new Uint8Array(data);
      //     console.log(JSON.stringify(fdata));
      //   }).catch((e) => {
      //     console.log("read: Failed to read characteristic from device.");
      //     console.log(e)
      //   });
    });


  }

  clearTimer() {
    clearInterval(this.interval);
  }
}
