import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ColDef,CellClickedEvent } from 'ag-grid-community'
import { Router } from '@angular/router';
@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss']
})
export class PurchaseInvoiceComponent implements OnInit {
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  pageSize = 10
  public formatter: NgbDateParserFormatter;
  today: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  constructor(private ngbDateParserFormatter: NgbDateParserFormatter, private router: Router) {
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
        this.router.navigate(['pages/customer/detail',OrderId]);
     
      }
      else {
        this.router.navigate(['pages/customer/detail',OrderId]);

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
      headerTooltip: 'Vendor',
      headerName: 'Product Name',
      resizable: true,
      sortable: true,
      filter: true, floatingFilter: true,
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
    // {
    //   field: 'status', resizable: true, headerClass: 'center-aligned-header', headerTooltip: 'Status', cellClass: 'centered-cell', width: 110, filter: true, floatingFilter: true, sortable: true,
    //   cellRenderer: params => {
    //     return '<div class="badge ' + this.GetBadgeClass(params.value) + '">' + params.value + '</div>';
    //   }
    // },
    {
      field: 'amount_paid',
      headerTooltip: 'Quantity',
      headerName: 'Quantity',
      resizable: true,
      sortable: true,
      width: 120,
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
    else if (status == 'Cancelled') {
      return 'badge-danger'
    }
    else if (status == 'Paid') {
      return 'badge-success'
    }
    else if (status == 'Back Ordered') {
      return 'badge-warning'
    }
    else if (status == 'Approved') {
      return 'badge-info'
    }
    else {
      return 'badge-secondary'
    }
  }

  rowData = [
    { inv_id: 1, 
      inv_date: '01-01-2023', 
      Vendor: 'Sheep', 
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Pending', 
      amount_paid: '1000', 
      balance: '1020',
     },
    { inv_id: 2, 
      inv_date: '01-01-2023', 
      Vendor: 'Goat', 
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Cancelled', 
      amount_paid: '1000', 
      balance: '1020',
     },
    { inv_id: 3, 
      inv_date: '01-01-2023', 
      Vendor: 'Cow', 
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Paid', 
      amount_paid: '1000', 
      balance: '1020',
     },
    { inv_id: 4, 
      inv_date: '01-01-2023', 
      Vendor: 'Camel', 
      amount: '2000', vat: '20$', 
      total: '2020', 
      status: 'Approved', 
      amount_paid: '1000', 
      balance: '1020',
     },

  ];

}
