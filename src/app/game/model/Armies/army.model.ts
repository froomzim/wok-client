import { Injectable } from '@angular/core';
import { ArmyAmount } from './army-amount.model';

@Injectable({
  providedIn: 'root'
})

export class Army {
  'id': string;
  'name': string;
  'description': string;
  'photo': string;
  'total': number;
  'levels': Array<ArmyAmount>;
  'preferred_target': string;
  'type': string;
}
