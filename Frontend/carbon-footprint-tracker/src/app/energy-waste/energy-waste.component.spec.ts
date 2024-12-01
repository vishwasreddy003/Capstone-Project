import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyWasteComponent } from './energy-waste.component';

describe('EnergyWasteComponent', () => {
  let component: EnergyWasteComponent;
  let fixture: ComponentFixture<EnergyWasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyWasteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyWasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
