import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaleStatusModalComponent } from './update-sale-status-modal.component';

describe('UpdateSaleStatusModalComponent', () => {
  let component: UpdateSaleStatusModalComponent;
  let fixture: ComponentFixture<UpdateSaleStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSaleStatusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSaleStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
