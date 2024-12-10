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
      category: 'Understanding Carbon Footprint',
      title: 'Know Your CO₂ Emissions',
      description: 'Get started on understanding the impact of your daily activities on carbon emissions and how to reduce them...'
    },
    {
      img: 'assets/IMG.jpg',
      category: 'Save Natural resources',
      title: 'Rainwater Harvesting',
      description: 'Rainwater Harvesting and rainwater garden outline concept...',
    },
    {
      img: 'assets/Image.jpg',
      category: 'Learning to live sustainable.',
      title: 'A Lesson.',
      description: 'separate, recycle and compost trash.',
    },
    // {
    //   img: 'assets/img14.jpg',
    //   category: 'cars',
    //   title: 'Team',
    //   description: 'Cars are more than transportation...',
    // },
    {
      img: 'assets/Image4.jpg',
      category: 'Get Exciting rewards',
      title: 'Carbon Credits',
      description: 'Complete Tasks...',
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


