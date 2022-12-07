import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameComponent } from 'src/app/game/game.component';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourcesService } from 'src/app/services/ui/resources.service';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.component.html',
  styleUrls: [
    './gold.component.scss'
  ]
})
export class GoldComponent implements OnInit {

  public gold: BehaviorSubject<number>;
  private goldId = 'cab12924-7c62-41fc-8b55-ea0ac55e382e';

  constructor(
    private resourcesService: ResourcesService,
    private ApiService: ApiService,
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getGold();
  }

  public getGold() {
    let get = this.resourcesService.getResource(this.goldId).subscribe((data) => {
      this.gold = data;
    });
  }
}
