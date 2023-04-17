import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalComponent } from './purchase-modal.component';

describe('PuchaseModalComponent', () => {
  let component: PurchaseModalComponent;
  let fixture: ComponentFixture<PurchaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
