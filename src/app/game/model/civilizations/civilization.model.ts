export class Civilization {
  'id': number;
  'name': string;
  'description': string;
  'place': string;
  'civilization_level': CivilizationLevel;
}

export class CivilizationLevel {
  'id': number;
  'level': number;
  'civilization_place_id': string;
  'avatar': string;
  'banner': string;
  'max_population': number;
  'model_path': string;
  'waypoints': {};
}
