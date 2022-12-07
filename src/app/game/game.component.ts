import { StartGame } from './functions/startGame';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { GameService } from '../services/game/game.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements AfterViewInit, OnInit {
  public isLoaded: BehaviorSubject<boolean>;
  public isFocused: BehaviorSubject<boolean>;
  public focusedAt: BehaviorSubject<string>;
  public xhr: string = 'Loading Game...';

  constructor(
    private readonly api?: ApiService,
    private readonly service?: GameService
  ) {
    this.isLoaded = this.service.getIsLoaded();
    this.isFocused = this.service.getIsFocused();
    this.focusedAt = this.service.getFocusedAt();
    this.service.gameCallback.subscribe((data) => {
      if (!this[data.functionName]) return;
      this[data.functionName](...data.argument);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    new StartGame(this.api, this.service);
  }

}

