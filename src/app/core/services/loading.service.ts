import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }
}
