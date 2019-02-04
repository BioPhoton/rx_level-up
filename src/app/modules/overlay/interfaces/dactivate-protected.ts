import { Observable } from 'rxjs/index';
export interface DeactivateProtected {
  canDeactivate(): Observable<boolean>;
}
