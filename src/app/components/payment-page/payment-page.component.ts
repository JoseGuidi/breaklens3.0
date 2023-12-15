import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {
  url:String = '';
  id:string = '';
  status:string = '';
  json_rta = {    "collection_id": "60646156751",
  "collection_status": "approved",
  "payment_id": "60646156751",
  "status": "approved",
  "external_reference": "null",
  "payment_type": "account_money",
  "merchant_order_id": "10446625664",
  "preference_id": "430066785-8a69b7d4-0dd3-4a6f-ba2a-a2d6c805e889",
  "site_id": "MLA",
  "processing_mode": "aggregator",
  "merchant_account_id": "null"};
  constructor(private _url: ActivatedRoute){}
  ngOnInit(): void {
    this.url = this._url.snapshot.url.toString();
    this.url += " --- " + this._url.snapshot.queryParams

    let _id = this._url.snapshot.queryParamMap.get('payment_id')
    if(_id){
      this.id = _id
    }
    let _status = this._url.snapshot.queryParamMap.get('status')
    if(_status){
      this.status = _status
    }
/*
    this.id = '60646156751';
    this.status = 'rejected'*/
  }
}
