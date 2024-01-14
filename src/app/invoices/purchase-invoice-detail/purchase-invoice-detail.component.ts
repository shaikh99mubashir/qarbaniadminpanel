import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-invoice-detail',
  templateUrl: './purchase-invoice-detail.component.html',
  styleUrls: ['./purchase-invoice-detail.component.scss']
})
export class PurchaseInvoiceDetailComponent implements OnInit {
  UserId :any;
  headingText = ""
  constructor(private router :Router) {
    this.Get_Url_Id();
   }

  ngOnInit(): void {
  }
  routList(){
    this.router.navigate(['invoices/purchaseinvoice'])
  }
  Get_Url_Id(){
    //Get Url ID
let Url=  this.router.url
let urlParts = Url.split('/'); // URL ko '/' ke hisab se tukdo mein baata gaya
this.UserId = urlParts.pop();

//check if User Is Coming From Edit Click
if(this.UserId == "null"){
  this.headingText = 'Add'
  // this.edit_and_Save_btn_text = 'Add'
  // this.isEdit= true;
  // this.IsAdd= false;

}
 }

}
