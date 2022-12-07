import { Injectable } from '@angular/core';
import { Civilization, CivilizationLevel } from './civilizations/civilization.model';

@Injectable({
  providedIn: 'root'
})

export class UserProfile {
  'id': number;
  'name': string;
  'email': string;
  'avatar': string;
  'bio': string;
  'location': string;
  'civilization_id': number;
  'civilization': Array<Civilization>;
  'civilization_level': Array<CivilizationLevel>;
}
