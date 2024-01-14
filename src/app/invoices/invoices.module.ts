import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular'; 
import { ColDef } from 'ag-grid-community'
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseInvoiceDetailComponent } from './purchase-invoice-detail/purchase-invoice-detail.component';
import { UpdateSaleStatusModalComponent } from './update-sale-status-modal/update-sale-status-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
const routes: Routes = [
  {
    path: 'purchaseinvoice',
    component: PurchaseInvoiceComponent,
  },
  {
    path: 'detail',
    component: PurchaseInvoiceDetailComponent,
  },
  {
    path: 'saleinvoice',
    component: SaleInvoiceComponent,
  },
  // {
  //   path: 'add-company/:id',
  //   component: CompanyAddComponent,
  // },
  
];

@NgModule({
  declarations: [
    PurchaseInvoiceComponent,
    SaleInvoiceComponent,
    PurchaseInvoiceDetailComponent,
    UpdateSaleStatusModalComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    NgbModule, NgbDatepickerModule,
    NgSelectModule,
  ]
})
export class InvoicesModule { }
