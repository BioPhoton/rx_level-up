import {Location} from './location.model';

export class Workshop {
  id: string;
  location: Location;
  title: string;
  dateStart: string;
  dateEnd: string;
  desc: string;
  logo?: string;
  imgs?: string[];
  links?: string[];
}
