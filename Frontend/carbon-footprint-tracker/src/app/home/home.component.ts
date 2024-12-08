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
      img: 'assets/environment.jpg',
      category: 'cars',
      title: 'Racing',
      description: 'Racing is the ultimate test of speed and skill...',
    },
    {
      img: 'assets/env.jpg',
      category: 'cars',
      title: 'Porsche',
      description: 'Porsche is the epitome of luxury and performance...',
    },
    {
      img: 'assets/img3.jpg',
      category: 'cars',
      title: 'Team',
      description: 'Cars are more than transportation...',
    },
    {
      img: 'assets/img4.jpg',
      category: 'cars',
      title: 'Action',
      description: 'Car action is adrenaline-fueled excitement...',
    },
    {
      img: 'assets/img5.jpg',
      category: 'cars',
      title: '3 2 1 Go',
      description: '"3, 2, 1, Go!" signals the start...',
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
