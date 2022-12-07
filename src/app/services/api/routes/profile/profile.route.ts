import { BaseRoute } from '../baseRoute';
import { ApiService } from '../../api.service';

export class ProfileRoute extends BaseRoute {


  public basePath = 'profile';

  constructor(public apiService: ApiService) {
    super(apiService);
  }

  getProfile() {
    return this.get('');
  }

  setCivilization(civilization: string) {
    return this.post('/set-civilization', { civilization });
  }

  changeUserLevel(number: number) {
    return this.get('/change-level/' + number);
  }

  changeCivilizationPlace(arg0: string) {
    return this.get('/change-civilization-place/' + arg0);
  }

  changeCivilization(civilization: string) {
    return this.get('/change-civilization/' + civilization);
  }

  getArmy() {
    return this.get('/get-army');
  }

  createTroop(id: string, level?: number) {
    let data = {
      troop_id: id,
      troop_level: 1
    }
    return this.post('/create-troop', data);
  }

}
