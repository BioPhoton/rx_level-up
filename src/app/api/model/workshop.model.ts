import {Location} from './location.model';

export class Workshop {
  id: string;
  locationId: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  desc: string;
  logo?: string;
  imgs?: string[];
  links?: string[];
}
