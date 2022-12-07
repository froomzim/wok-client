import { randInt } from 'three/src/math/MathUtils';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent implements OnInit {
  mining: number = 0;
  kingdom: number = 0;
  defending: number = 0;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.mining < 100) {
        this.mining += randInt(0, 5);
      }
      if (this.kingdom < 100) {
        this.kingdom += randInt(0, 5) / randInt(7, 15);
      }
      if (this.defending < 100) {
        this.defending += randInt(0, 1) ;
      }
    }
      , 1000);

  }

}
