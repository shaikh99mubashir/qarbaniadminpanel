import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef,CellClickedEvent } from 'ag-grid-community'
import { Router } from '@angular/router';
import { UpdateSaleStatusModalComponent } from '../update-sale-status-modal/update-sale-status-modal.component';


@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleInvoiceComponent implements OnInit {
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  pageSize = 10
  public formatter: NgbDateParserFormatter;
  today: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  constructor(private ngbDateParserFormatter: NgbDateParserFormatter, private router: Router,private modalService: NgbModal,) {
    this.formatter = ngbDateParserFormatter;
    
  }
  ngOnInit(): void {
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('e',e);
    
    if (e.data) {
      var OrderId = e.data.OrderId;
      const target = e.event.target as HTMLTextAreaElement;
      if (target.id === 'edit_purchase_list') {
        const modalRef = this.modalService.open(UpdateSaleStatusModalComponent, { backdrop: 'static',size:'xl' });
        // modalRef.componentInstance.OrderId = orderId;
        modalRef.componentInstance.closeModal.subscribe(() => {
          console.log('Received closeModal event in YourComponent');
          modalRef.close(); // Close the modal
        });
      }
    }
  }  


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
  
  public columnDefs: ColDef[] = [
    {
      field: 'inv_id',
      headerTooltip: 'Invoice ID',
      headerName: 'Invoice ID',
      resizable: true,
      sortable: true,
      width: 110

    },
    {
      field: 'inv_date',
      headerTooltip: 'Invoice Date',
      headerName: 'Invoice Date',
      resizable: true,
      sortable: true,
      width: 110,
    },
    {
      field: 'Vendor',
      headerTooltip: 'Customer Name',
      headerName: 'Customer Name',
      resizable: true,
      sortable: true,
      filter: 'agTextColumnFilter', floatingFilter: true,
    },
    {
      field: 'address',
      headerTooltip: 'Address',
      headerName: 'Address',
      resizable: true,
      sortable: true,
      width: 250,
      cellStyle: { 'white-space': 'nowrap' },
    },
    {
      field: 'mobileno',
      headerTooltip: 'Mobile Number',
      headerName: 'Mobile Number',
      resizable: true,
      sortable: true,
      width: 150,
    },
    {
      field: 'amount',
      headerTooltip: 'Amount',
      headerName: 'Amount',
      resizable: true,
      sortable: true,
      width: 120,
      cellStyle: { 'text-align': 'right' },
    },
    {
      field: 'vat',
      headerTooltip: 'VAT',
      headerName: 'VAT',
      resizable: true,
      sortable: true,
      width: 120,
      cellStyle: { 'text-align': 'right' },
    },
    {
      field: 'total',
      headerTooltip: 'Total',
      headerName: 'Total',
      resizable: true,
      sortable: true,
      width: 120,
      headerClass: 'right-aligned-header',
      cellStyle: { 'text-align': 'right' },
    },
    {
      field: 'status', resizable: true, headerClass: 'center-aligned-header', headerTooltip: 'Status', cellClass: 'centered-cell', width: 110, filter: true, floatingFilter: true, sortable: true,
      cellRenderer: params => {
        return '<div class="badge ' + this.GetBadgeClass(params.value) + '">' + params.value + '</div>';
      }
    },
    {
      field: 'Action',
      resizable: true,
      headerName: 'Action',
      headerTooltip: 'Action',
      cellRenderer: params => {
        return `<i class="fa fa-lg fa-edit clickable-icon" title="Scan & Ship" data-action="ready" id="edit_purchase_list"></i>
        <i class="fa fa-lg fa-trash clickable-icon delete-order-icon" title="Delete" data-action="delete" id="btnDelete"></i>
        `;
      },
      width: 120,
      filter: false
    }
  ];

  GetBadgeClass(status: string): string {
    if (status == 'Pending') {
      return 'badge-primary'
    }
    else if (status == 'Approved') {
      return 'badge-secondary'
    }
    else if (status == 'Cancelled') {
      return 'badge-danger'
    }
    else if (status == 'Book') {
      return 'badge-dark'
    }
    else if (status == 'Assigned') {
      return 'badge-success'
    }
    else if (status == 'Slaughter') {
      return 'badge-warning'
    }
    else if (status == 'Complted') {
      return 'badge-info'
    }
    else {
      return 'badge-secondary'
    }
  }

  rowData = [
    { inv_id: 1, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir Bakshi', 
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ', 
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Pending', 
     },
    { inv_id: 2, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir Bakshi',
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ',  
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Cancelled', 
     },
    { inv_id: 3, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir Bakshi', 
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ', 
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Booked', 
     },
    { inv_id: 4, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir', 
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ', 
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Approved', 
     },
    { inv_id: 5, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir', 
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ', 
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Assigned', 
     },
    { inv_id: 6, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir', 
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ', 
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Complted', 
     },
    { inv_id: 7, 
      inv_date: '01-01-2023', 
      Vendor: 'Mubashir', 
      address: 'In that case, you can use the fake address generator US and fake address ... You can quickly fill in the sign-up forms and log in to the site using a dummy ', 
      mobileno:'+923353375813',
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Slaughter', 
     },

  ];

}
