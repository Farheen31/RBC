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

  ngOnInit() {
    this.getTime();
  }


  getTime() {
    this.date = new Date();
    setInterval(() => {
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();
      this.onSyncClocks();
    }, 1000);
  }

  animateAnalogClock() {
    this.hourHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.hour * 30) + (this.minute * 0.5) + (this.second * (0.5 / 60))}deg)` };
    this.minuteHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.minute * 6) + (this.second * 0.1)}deg)` };
    this.secondHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)` };
  }

  onSyncClocks() {
    let inputValue = (<HTMLInputElement>document.getElementById("customTime")).value || this.date;
    this.customtime = moment(inputValue, 'hh:mm:ss').toDate();
    let diff: any = new Date().getTime() - this.date.getTime();

    //add that difference to the offset time
    this.customtime.setMilliseconds(this.customtime.getMilliseconds() + diff);

    this.hour = + this.customtime.getHours();
    this.minute = + this.customtime.getMinutes();
    this.second = + this.customtime.getSeconds();

    var currentTime = this.hour + ":" + this.minute + ":" + this.second;

    (<HTMLInputElement>document.getElementById("timer")).innerHTML = currentTime;
    this.animateAnalogClock();
  }
}
