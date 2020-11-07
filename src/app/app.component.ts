import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sync Clocks';
  date: Date;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  customtime: Date;
  hourHandStyle;
  minuteHandStyle;
  secondHandStyle;
  hh1: any; mm1: any; ss1: any;

  ngOnInit() {
    this.getTime();
  }


  getTime() {
    setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();
      this.animateAnalogClock();
    }, 1000);
  }

  animateAnalogClock() {
    this.hourHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.hour * 30) + (this.minute * 0.5) + (this.second * (0.5 / 60))}deg)` };

    this.minuteHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.minute * 6) + (this.second * 0.1)}deg)` };

    this.secondHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)` };
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  onSyncClocks() {
    let inputValue = (<HTMLInputElement>document.getElementById("cutomTime")).value;
    this.customtime = moment(inputValue, 'hh:mm:ss').toDate();
    let current = new Date();
    let diff: any = current.getTime() - this.date.getTime();

    //add that difference to the offset time
    this.customtime.setMilliseconds(this.customtime.getMilliseconds() + diff);

    this.hh1 = this.customtime.getHours();
    this.mm1 = this.customtime.getMinutes();
    this.ss1 = this.customtime.getSeconds();
    this.hour = + this.hh1;
    this.minute = + this.mm1;
    this.second = + this.ss1;


    this.animateAnalogClock();
  }
}
