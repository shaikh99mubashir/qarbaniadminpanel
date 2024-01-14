import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceDetailComponent } from './purchase-invoice-detail.component';

describe('PurchaseInvoiceDetailComponent', () => {
  let component: PurchaseInvoiceDetailComponent;
  let fixture: ComponentFixture<PurchaseInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoiceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
