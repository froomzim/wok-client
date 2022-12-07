import { Injectable } from '@angular/core';
import { Army } from './army.model';

@Injectable({
  providedIn: 'root'
})

export class Armies {
  'total': number;
  'armies': Array<Army>;
}
