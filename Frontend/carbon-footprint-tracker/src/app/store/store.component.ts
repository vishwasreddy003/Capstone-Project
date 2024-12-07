import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  items = [
    {
      image: 'https://m.media-amazon.com/images/I/61ekxJk2KHL._AC_UL1500_.jpg',
      brand: 'EcoBrush',
      product: 'Bamboo Toothbrush',
      greenCoins: 50,
      description: 'Made from sustainable bamboo, fully biodegradable.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/81+sZ55xQhL._AC_UL1500_.jpg',
      brand: 'GreenCarry',
      product: 'Reusable Shopping Bags',
      greenCoins: 75,
      description: 'Durable, eco-friendly bags for reducing plastic waste.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/51mbxgHyvXL._AC_SL1001_.jpg',
      brand: 'EcoBottle',
      product: 'Stainless Steel Bottle',
      greenCoins: 100,
      description: 'Reusable water bottle, keeps beverages hot/cold.',
    },
    {
      image: 'assets/img1.jpg',
      brand: 'GrowWrite',
      product: 'Plantable Seed Pencils',
      greenCoins: 120,
      description: 'Pencils embedded with seeds to plant after use.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71IF4zE8K9L._AC_SL1500_.jpg',
      brand: 'Solar Lamp',
      product: 'Solar-Powered Lamp',
      greenCoins: 200,
      description: 'Solar-powered lamp, great for reducing electricity usage.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/91RWdMwP-BL._AC_UL1500_.jpg',
      brand: 'EarthTote',
      product: 'Cotton Tote Bag',
      greenCoins: 50,
      description: 'Stylish, reusable tote bag made from organic cotton.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71pOBsa9QlL._AC_SL1500_.jpg',
      brand: 'GreenCycle',
      product: 'Compost Bin',
      greenCoins: 300,
      description: 'Compact compost bin for converting waste into compost.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71WCMiqXo0L._AC_SL1500_.jpg',
      brand: 'GreenNotes',
      product: 'Eco-Friendly Notebook',
      greenCoins: 80,
      description: 'Made from recycled paper with minimal processing.',
    },
  ];

  selectedItem: any = null;
  redeemCode: string | null = null;

  selectItem(item: any) {
    this.selectedItem = item;
    this.redeemCode = null; // Reset redeem code when selecting a new item
  }

  closePopup() {
    this.selectedItem = null; // Close the popup
  }

  redeemItem() {
    // Generate a mock redeem code
    this.redeemCode = `REDEEM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }

  copyCode() {
    if (this.redeemCode) {
      navigator.clipboard.writeText(this.redeemCode);
      alert('Redeem code copied to clipboard!');
    }
  }
}
