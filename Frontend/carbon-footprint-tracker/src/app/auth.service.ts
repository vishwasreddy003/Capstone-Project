import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Observable for login state

  private usernameSubject = new BehaviorSubject<string>('');
  private greenCoinsSubject = new BehaviorSubject<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.checkLoginStatus(); // Initialize login state
  }

  private checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('tokenId');
      const username = sessionStorage.getItem('username');
      const greenCoins = sessionStorage.getItem('greenCoins');
      
      const isLoggedIn = !!token;
      this.isLoggedInSubject.next(isLoggedIn);
      this.usernameSubject.next(username || '');
      this.greenCoinsSubject.next(greenCoins ? +greenCoins : 0);
    } else {
      this.isLoggedInSubject.next(false); // Default to logged out
      this.usernameSubject.next('');
      this.greenCoinsSubject.next(0);
    }
  }

  // Public getter for login state as an observable
  getLoginStatus$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUsername$(): Observable<string>{
    return this.usernameSubject.asObservable();
  }

  getGreenCoins$():Observable<number>{
    return this.greenCoinsSubject.asObservable();
  }

  // For components to get the current state synchronously
  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  getCurrentUsername():string{
    return this.usernameSubject.getValue();
  }

  getCurrentGreenCoins() :number{
    return this.greenCoinsSubject.getValue();
  }

  // Log in the user
  login(username:string,greenCoins:number): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('tokenId','your-token-here');
      sessionStorage.setItem('username',username);
      sessionStorage.setItem('greenCoins',greenCoins.toString());


      this.isLoggedInSubject.next(true); 
      this.usernameSubject.next(username);
      this.greenCoinsSubject.next(greenCoins);
    }
  }

  // Log out the user
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('tokenId'); // Clear session
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('greenCoins');
      this.isLoggedInSubject.next(false); // Notify subscribers
      this.usernameSubject.next('');
      this.greenCoinsSubject.next(0);
    }
  }

  // Selected month and year management
  private selectedMonthSubject = new BehaviorSubject<string | null>(null);
  private selectedYearSubject = new BehaviorSubject<string | null>(null);

  selectedMonth$ = this.selectedMonthSubject.asObservable();
  selectedYear$ = this.selectedYearSubject.asObservable();

  setSelectedMonth(month: string): void {
    this.selectedMonthSubject.next(month);
  }

  setSelectedYear(year: string): void {
    this.selectedYearSubject.next(year);
  }
}
