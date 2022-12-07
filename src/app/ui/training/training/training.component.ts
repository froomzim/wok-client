import { Armies } from '../../../game/model/Armies/armies.model';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Army } from 'src/app/game/model/Armies/army.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  data: Array<Armies>;
  armies: Array<Army>;
  army: boolean = true;
  create_troops: boolean = false;
  troops: Array<Army>;

  constructor(
    private readonly api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getTroops();
    this.getArmy();
  }

  getTroops() {
    this.api.troop.getTroops().subscribe((troops) => {
      this.troops = troops['data'];
    });
  }

  getArmy() {
    this.api.profile.getArmy().subscribe((res) => {
      this.data = res['data'];
      for (let i = 0; i < this.data.length; i++) {
        this.armies = this.data[i].armies;
      }
    });
  }

  toArray(quantity: object) {
    return Object.keys(quantity).map((key) => {
      return { level: key, quantity: quantity[key] };
    });
  }

  startTraining() {
    this.army = false;
    this.create_troops = true;
  }

  myArmy() {
    this.create_troops = false;
    this.army = true;
  }

  createTroop(id: string) {
    this.api.profile.createTroop(id).subscribe((res) => {
      if (res['data']) {
        this.getArmy();
        alert('Troop created');

        this.create_troops = false;
        this.army = true;
      }
    });
  }
}
