import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-store',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  items = [
    {
      image: 'assets/item1.jpg',
      brand: 'Brand A',
      greenCoins: 100,
      discountCoins: 20,
    },
    {
      image: 'assets/item2.jpg',
      brand: 'Brand B',
      greenCoins: 150,
      discountCoins: 30,
    },
    {
      image: 'assets/item3.jpg',
      brand: 'Brand C',
      greenCoins: 200,
      discountCoins: 40,
    },
  ];

  selectedItem: any = null;
  redeemCode: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openRedeemModal(item: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedItem = item;
      this.redeemCode = null;

      // Show the modal only in the browser
      const modalElement = document.getElementById('redeemModal') as HTMLElement;
      if (modalElement) {
        import('bootstrap').then(({ Modal }) => {
          const modal = new Modal(modalElement);
          modal.show();
        });
      }
    }
  }

  redeemItem() {
    // Generate a mock redeem code
    this.redeemCode = `REDEEM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }

  copyCode() {
    if (this.redeemCode && isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.redeemCode);
      alert('Redeem code copied to clipboard!');
    }
  }
}
