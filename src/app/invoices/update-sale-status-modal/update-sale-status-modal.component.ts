import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from 'app/main/forms/form-elements/select/select.component';
import { log } from 'console';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-update-sale-status-modal',
  templateUrl: './update-sale-status-modal.component.html',
  styleUrls: ['./update-sale-status-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateSaleStatusModalComponent implements OnInit {
  
  @ViewChild('statusSelect') statusSelect: SelectComponent;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() OrderId: number;
  @BlockUI() blockUI: NgBlockUI;
  data:any
  public selectBasic = [];
  public selectBasicLoading = false;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.GetOrderDetail()
    this.selectBasicMethod();
  }

    // select basic
    private selectBasicMethod() {
      this.selectBasicLoading = true;
      const dummyStatusData = ['Pending', 'Completed', 'Approved', 'Slaughter', 'Cancelled'];
      
    this.selectBasic = dummyStatusData.map(status => ({ status }));
    console.log('dummyStatusData',this.selectBasic );
    this.selectBasicLoading = false;
    }
  

  items: any[] = [
    {
      ProductName: 'Sheep',
      qty: '20kg',
      amount: '300$',
      totalamount: '330',
      deliverystatus: 'Self Collect',
    },
  ];

  additionalContentVisible: boolean = true;

  GetOrderDetail() {
    this.blockUI.start();
    
    console.log('OrderId========>',this.OrderId);
    
    // get orders
    // var orders = this._orderService.GetOrderDetail(this.OrderId).subscribe(res => {
    //   console.log(res.result);
    //    this.data = res.result
      
    //   this.blockUI.stop();
    // });
  }
  onCloseModal() {
    this.closeModal.emit();
  }
}
