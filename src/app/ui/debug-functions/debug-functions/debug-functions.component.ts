import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from 'src/app/game/model/user-profile.model';
import { ApiService } from 'src/app/services/api/api.service';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-debug-functions',
  templateUrl: './debug-functions.component.html',
  styleUrls: ['./debug-functions.component.css']
})
export class DebugFunctionsComponent implements OnInit {
  isLoaded: BehaviorSubject<boolean>;
  isFocused: BehaviorSubject<boolean>;
  focusedAt: BehaviorSubject<string>;
  profile: UserProfile;

  constructor(
    private gameService: GameService,
    private readonly api: ApiService,
  ) {
    this.isLoaded = this.gameService.getIsLoaded();
    this.isFocused = this.gameService.getIsFocused();
    this.focusedAt = this.gameService.getFocusedAt();
  }

  ngOnInit() {
    this.api.profile.getProfile().subscribe({
      next: (data: any) => {
        this.profile = data['data'];
      }
    });
  }

  attack(): void {
    this.gameService.attack();
  }

  changeUserLevel(number: number): void {
    this.api.profile.changeUserLevel(number).subscribe({
      next: (data: any) => {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

  changeCivilizationPlace(place: string) {
    this.api.profile.changeCivilizationPlace(place).subscribe({
      next: (data: any) => {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

  changeCivilization(civilization: string) {
    this.api.profile.changeCivilization(civilization).subscribe({
      next: (data: any) => {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

}
