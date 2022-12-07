import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameComponent } from 'src/app/game/game.component';
import { ResourcesService } from 'src/app/services/ui/resources.service';

@Component({
  selector: 'app-wood',
  templateUrl: './wood.component.html',
  styleUrls: ['./wood.component.scss']
})
export class WoodComponent implements OnInit {
  wood: Observable<number>;
  private woodId = '0652ede7-7b9a-4b21-881a-6fc9dbe64749';

  constructor(
    private resourcesService: ResourcesService,
  ) {
    this.getWood();
  }

  ngOnInit(): void {
  }

  public getWood() {
    let get = this.resourcesService.getResource(this.woodId).subscribe((data) => {
      this.wood = data;
    });
  }
}
