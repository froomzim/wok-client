import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResourcesService } from 'src/app/services/ui/resources.service';

@Component({
  selector: 'app-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.scss']
})
export class StoneComponent implements OnInit {
  private stoneId = 'b0b5b2e5-5b9a-4b21-881a-6fc9dbe64749';
  stone: BehaviorSubject<number>;

  constructor(
    private resourcesService: ResourcesService,
  ) {
    this.getStone();
  }

  ngOnInit(): void {
  }

  public getStone() {
    let get = this.resourcesService.getResource(this.stoneId).subscribe((data) => {
      this.stone = data;
    });
  }

}
