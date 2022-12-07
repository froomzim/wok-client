import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-ui-manager',
  templateUrl: './ui-manager.component.html',
  styleUrls: ['./ui-manager.component.scss']
})
export class UiManagerComponent implements OnInit {
  isLoaded: BehaviorSubject<boolean>;
  isFocused: BehaviorSubject<boolean>;
  focusedAt: BehaviorSubject<string>;
  underAttacking: BehaviorSubject<boolean>;

  constructor(
    private gameService: GameService,
    private readonly api: ApiService,
  ) {
    this.isLoaded = this.gameService.getIsLoaded();
    this.isFocused = this.gameService.getIsFocused();
    this.focusedAt = this.gameService.getFocusedAt();
    this.underAttacking = this.gameService.getUnderAttacking();
  }

  ngOnInit(): void {
    this.gameService.gameCallback.subscribe((data) => {
      if (data.functionName === 'attack') {
        this.fadingAttackMessage();
      }
    });

  }

  meshEvents(name: string): void {
    this.gameService.meshEvents(name);
  }

  fadingAttackMessage() {
    var attacking = document.getElementById("attacking");
    let times = 8;
    for (let i = 0; i < times; i++) {
      setTimeout(function () {
        attacking.style.opacity = "1";
      }, 1500 * i);
      setTimeout(function () {
        attacking.style.opacity = "0";
      }, 1500 * i + 750);
    }
  }

}
