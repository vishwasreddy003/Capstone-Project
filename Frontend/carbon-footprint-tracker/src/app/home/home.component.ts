import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  items = [
    {
      img: 'assets/Image2.jpg',
      category: 'Understanding Your Carbon Footprint',
      title: 'Discover Your CO₂ Impact',
      description: 'Take the first step in understanding how your daily activities contribute to carbon emissions and explore actionable ways to minimize your footprint.',
    },
    {
      img: 'assets/IMG.jpg',
      category: 'Data Trends',
      title: 'The Importance of Tracking Your Data',
      description: 'Discover how keeping track of your data can help you analyze trends, identify patterns, and make informed decisions for a more sustainable and efficient lifestyle.',
    },
    {
      img: 'assets/Image.jpg',
      category: 'Sustainable Living Practices',
      title: 'Master the Art of Sustainability',
      description: 'Discover practical ways to reduce waste by separating, recycling, and composting, making sustainability a part of your daily life.',
    },
    {
      img: 'assets/Image4.jpg',
      category: 'Earn Exciting Rewards',
      title: 'Unlock Carbon Credits',
      description: 'Engage in eco-friendly tasks and earn carbon credits that reward your efforts in creating a greener planet.',
    },
  ];
  
  itemActive = 0;
  private interval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoScroll();
    }
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  nextSlide() {
    this.itemActive = (this.itemActive + 1) % this.items.length;
  }

  prevSlide() {
    this.itemActive = (this.itemActive - 1 + this.items.length) % this.items.length;
  }

  goToSlide(index: number) {
    this.itemActive = index;
  }

  startAutoScroll() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 6000); // Auto-scroll every 6 seconds
  }

  stopAutoScroll() {
    clearInterval(this.interval);
  }
}


