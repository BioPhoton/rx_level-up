import {Location} from './location.model';

export class Talk {
  id: string;
  locationId: string;
  title: string;
  date: string;
  teaser: string;
  desc: string;
  logo?: string;
  coverImg: string;
  imgs?: string[];
  links?: string[];
}
