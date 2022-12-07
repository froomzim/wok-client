import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/game/model/user-profile.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  level: string;
  profile: UserProfile;

  constructor(
    private readonly api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.profile.getProfile().subscribe({
      next: (data: any) => {
        this.profile = data['data'];
        this.level = data['data']['civilization_level']['level'];
      }
    });
  }

}
