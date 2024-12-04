import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items = [
    {
      img: 'assets/img1.jpg',
      category: 'cars',
      title: 'Racing',
      description: 'Racing is the ultimate test of speed and skill...'
    },
    {
      img: 'assets/img2.jpg',
      category: 'cars',
      title: 'Porche',
      description: 'Porsche is the epitome of luxury and performance...'
    },
    {
      img: 'assets/img3.jpg',
      category: 'cars',
      title: 'Team',
      description: 'Cars are more than transportation...'
    },
    {
      img: 'assets/img4.jpg',
      category: 'cars',
      title: 'Action',
      description: 'Car action is adrenaline-fueled excitement...'
    },
    {
      img: 'assets/img5.jpg',
      category: 'cars',
      title: '3 2 1 Go',
      description: '"3, 2, 1, Go!" signals the start...'
    },
  ];

  itemActive = 0;

  nextSlide() {
    this.itemActive = (this.itemActive + 1) % this.items.length;
  }

  prevSlide() {
    this.itemActive = (this.itemActive - 1 + this.items.length) % this.items.length;
  }

  goToSlide(index: number) {
    this.itemActive = index;
  }
}
