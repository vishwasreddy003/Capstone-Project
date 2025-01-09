import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../../environment.development';
import { items, rewards } from '../model/rewards';

@Component({
  selector: 'app-store',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  userCoinBalance: number = 0; 
  storeItems:rewards[] = [];
  
  ngOnInit() {

    const storedBalance = sessionStorage.getItem('greenCoins');
    this.userCoinBalance = storedBalance ? parseInt(storedBalance, 10) : 100;
    this.storeItems = items;

  }


  selectedItem: any = null;
  redeemCode: string | null = null;

  selectItem(item: any) {
    this.selectedItem = item;
    this.redeemCode = null; 
  }

  closePopup() {
    this.selectedItem = null; 
  }

  redeemItem() {
    this.redeemCode = `REDEEM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }

  copyCode(coins:number) {
    if (this.redeemCode) {
      navigator.clipboard.writeText(this.redeemCode);
      
      this.userCoinBalance -= coins;
      sessionStorage.setItem('greenCoins',this.userCoinBalance.toString());

      alert('Redeem code copied to clipboard!');
    }
  }
}
