import {Location} from './location.model';

export class Talk {
  id: string;
  location: Location;
  title: string;
  date: string;
  desc: string;
  logo?: string;
  imgs?: string[];
  links?: string[];
}
