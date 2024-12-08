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
      image: 'https://tse1.mm.bing.net/th/id/OIP.1CRKKOxgtuWJprESMlyIeQHaHa?rs=1&pid=ImgDetMain',
      brand: 'EcoBrush',
      product: 'Bamboo Toothbrush',
      greenCoins: 50,
      description: 'Made from sustainable bamboo, fully biodegradable.',
    },
    {
      image: 'https://m.media-amazon.com/images/I/51Y1T+wu6GL._SX679_.jpg',
      brand: 'GreenCarry',
      product: 'Reusable Shopping Bags',
      greenCoins: 75,
      description: 'Durable, eco-friendly bags for reducing plastic waste.',
    },
    {
      image: 'https://tse3.mm.bing.net/th/id/OIP.EGX5_gb9hO4TNlZ1H6PYgwHaHa?w=500&h=500&rs=1&pid=ImgDetMain',
      brand: 'EcoBottle',
      product: 'Stainless Steel Bottle',
      greenCoins: 100,
      description: 'Reusable water bottle, keeps beverages hot/cold.',
    },
    {
      image: 'https://image.made-in-china.com/2f0j00oBgGdbMthLku/Eeo-Friendly-Recycled-Plantable-Seed-Paper-Pencil-with-Herb-Flower-Vegetable-Seeds.jpg',
      brand: 'GrowWrite',
      product: 'Plantable Seed Pencils',
      greenCoins: 120,
      description: 'Pencils embedded with seeds to plant after use.',
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.ppu6gYDXwoYVHC7BlXXsCAHaHa?rs=1&pid=ImgDetMain',
      brand: 'Solar Lamp',
      product: 'Solar-Powered Lamp',
      greenCoins: 200,
      description: 'Solar-powered lamp, great for reducing electricity usage.',
    },
    {
      image: 'https://tse1.mm.bing.net/th/id/OIP.FHUmBHLDPbXn-ZXNMibJVgHaHa?rs=1&pid=ImgDetMain',
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
      image: 'https://imgmedia.lbb.in/media/2021/12/61c2d2e296f2a326b41b7d9d_1640157922129.png',
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
