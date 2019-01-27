import {Location} from '../location/location.model';

export class Workshop {
  id: string;
  location: Location;
  title: string;
  date: string;
  desc: string;
  logo?: string;
  imgs?: string[];
  links?: string[];
}
