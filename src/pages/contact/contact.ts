import { Component } from '@angular/core';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(private ibeacon: IBeacon) {

  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();
    console.log(JSON.stringify(delegate));
    // Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => { console.log('didRangeBeaconsInRegion error'); console.error(error) }
      );
    delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => { console.log('didRangeBeaconsInRegion error'); console.error(error) }
      );
    delegate.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        },
        error => { console.log('didEnterRegion error'); console.error(error) }
      );
  }

}
