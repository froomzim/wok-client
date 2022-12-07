import { UserProfile } from './../../game/model/user-profile.model';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isFocused: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public focusedAt: BehaviorSubject<string> = new BehaviorSubject<string>('default');
  private isUnderAttacking: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly gameCallback: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly api?: ApiService,
  ) { }

  public getIsLoaded(): BehaviorSubject<boolean> {
    return this.isLoaded;
  }

  public setIsLoaded(isLoaded: boolean): void {
    this.isLoaded.next(isLoaded);
  }

  public getIsFocused(): BehaviorSubject<boolean> {
    return this.isFocused;
  }

  public getFocusedAt(): BehaviorSubject<string> {
    return this.focusedAt;
  }

  public setFocusedAt(focusedAt: string): void {
    this.focusedAt.next(focusedAt);
  }

  public setIsUnderAttacking(isUnderAttacking: boolean): void {
    this.isUnderAttacking.next(isUnderAttacking);
  }

  public getUnderAttacking(): BehaviorSubject<boolean> {
    return this.isUnderAttacking;
  }

  public setIsFocused(isFocused: boolean): void {
    this.isFocused.next(isFocused);
  }

  attack(): void {
    this.callComponentFunction('attack');
  }

  changeUserLevel(number: number): void {
    this.callComponentFunction('changeUserLevel', [number]);
  }

  meshEvents(name: string): void {
    this.callComponentFunction('meshEvents', [name]);
  }

  callComponentFunction(functionName: string, argument: Array<any> = []): void {
    this.gameCallback.emit({ functionName, argument });
  }
}
