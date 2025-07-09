import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private balanceSub = new BehaviorSubject<number>(0);
  readonly balance$: Observable<number> = this.balanceSub.asObservable();

  setBalance(balance: number) {
    this.balanceSub.next(balance);
  }

  getBalance(): number {
    return this.balanceSub.getValue();
  }
  getHello() {
    return 'Olá do SharedService';
  }
}
