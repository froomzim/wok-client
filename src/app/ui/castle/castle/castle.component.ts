import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ResourcesService } from 'src/app/services/ui/resources.service';
import { UserProfile } from 'src/app/game/model/user-profile.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-castle',
  templateUrl: './castle.component.html',
  styleUrls: ['./castle.component.scss']
})
export class CastleComponent implements OnInit {
  profile: UserProfile;
  gold: BehaviorSubject<number>;
  wood: BehaviorSubject<number>;
  stone: BehaviorSubject<number>;

  constructor(
    ResourcesService: ResourcesService,
    private readonly api: ApiService
  ) {
    // this.gold = ResourcesService.getGold();
    this.wood = ResourcesService.getWood();
    this.stone = ResourcesService.getStone();
  }

  ngOnInit(): void {
    this.api.profile.getProfile().subscribe({
      next: (data: any) => {
        this.profile = data['data'];
      }
    });
  }

}
