
import { ApiService } from 'src/app/services/api/api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private readonly gold: BehaviorSubject<number>;
  private readonly wood: BehaviorSubject<number>;
  private readonly stone: BehaviorSubject<number>;
  public basePath = 'profile-resources';

  private apiService: ApiService = {} as ApiService;

  constructor(ApiService: ApiService) {
    this.apiService = ApiService;
  }


  getResource(id: string): Observable<any> {
    let get = this.apiService.resource.getResource('/' + id);
    return get;
  }

  public addGold(amount: number): void {
    this.gold.next(this.gold.value + amount);
  }
  public subGold(amount: number): void {
    this.gold.next(this.gold.value - amount);
  }
  // #endregion

  ////#region Wood
  public getWood(): BehaviorSubject<number> {
    return this.wood;
  }
  public subWood(amount: number): void {
    this.wood.next(this.wood.value - amount);
  }
  public addWood(amount: number): void {
    this.wood.next(this.wood.value + amount);
  }
  // #endregion

  // #region Stone
  public getStone(): BehaviorSubject<number> {
    return this.stone;
  }
  public subStone(amount: number): void {
    this.stone.next(this.stone.value - amount);
  }
  public addStone(amount: number): void {
    this.stone.next(this.stone.value + amount);
  }
  // #endregion

}
