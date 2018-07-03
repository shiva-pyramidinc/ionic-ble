import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluetoothlePage } from './bluetoothle';

@NgModule({
  declarations: [
    BluetoothlePage,
  ],
  imports: [
    IonicPageModule.forChild(BluetoothlePage),
  ],
})
export class BluetoothlePageModule {}
