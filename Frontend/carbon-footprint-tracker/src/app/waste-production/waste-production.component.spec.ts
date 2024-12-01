import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteProductionComponent } from './waste-production.component';

describe('WasteProductionComponent', () => {
  let component: WasteProductionComponent;
  let fixture: ComponentFixture<WasteProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteProductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
