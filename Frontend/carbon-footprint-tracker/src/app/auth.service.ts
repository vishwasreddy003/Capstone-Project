import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Observable for login state

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.checkLoginStatus(); // Initialize login state
  }

  private checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = !!sessionStorage.getItem('tokenId'); // Check sessionStorage for login status
      this.isLoggedInSubject.next(isLoggedIn); // Update the observable
    } else {
      this.isLoggedInSubject.next(false); // Default to logged out
    }
  }

  // Public getter for login state as an observable
  getLoginStatus$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // For components to get the current state synchronously
  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  // Log in the user
  login(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedInSubject.next(true); 
    }
  }

  // Log out the user
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('tokenId'); // Clear session
      this.isLoggedInSubject.next(false); // Notify subscribers
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
