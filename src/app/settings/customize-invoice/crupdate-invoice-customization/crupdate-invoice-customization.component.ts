import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomizeInvoice } from '../customize-invoice';
@Component({
  selector: 'app-crupdate-invoice-customization',
  templateUrl: './crupdate-invoice-customization.component.html',
  styleUrls: ['./crupdate-invoice-customization.component.scss']
})
export class CrupdateInvoiceCustomizationComponent implements OnInit {
  customizeForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit() {
    this.hydrateModel();
  }

  private hydrateModel(customize?:CustomizeInvoice) {
    this.customizeForm = new FormGroup({
      company_name: new FormControl(customize?customize.company_name:"", [Validators.required]),
      address: new FormControl(customize?customize.address:"", [Validators.required]),
      contact: new FormControl(customize?customize.contact:"",[Validators.required]),
      tax_number: new FormControl(customize?customize.tax_number:""),
      font_size: new FormControl(customize?customize.font_size:""),
      color: new FormControl(customize?customize.color:""),
      due_days: new FormControl(customize?customize.due_days:""),
      default_title: new FormControl(customize?customize.default_title:"",[Validators.required]),
      default_sub_title: new FormControl(customize?customize.default_sub_title:""),
      default_footer: new FormControl(customize?customize.default_footer:""),
      memo: new FormControl(customize?customize.memo:""),
      items: new FormControl(customize?customize.items:"Items"),
      logo: new FormControl(customize?customize.logo?customize.logo:"assets/logo/avatar.png":"assets/logo/avatar.png"),
      units: new FormControl(customize?customize.units:"Qty"),
      price: new FormControl(customize?customize.price:"Price"),
      amount: new FormControl(customize?customize.amount:"Amount"),
      number: new FormControl(customize?customize.number:"N°"),
      adherent: new FormControl(customize?customize.adherent:""),
      customer_name: new FormControl(customize?customize.customer_name:"Customer Name"),
      customer_number: new FormControl(customize?customize.customer_number:"Customer N°"),
      customer_dob: new FormControl(customize?customize.customer_dob:"Customer Birth Date"),
      beneficiary: new FormControl(customize?customize.beneficiary:"Beneficiary"),
      customer_type_name: new FormControl(customize?customize.customer_type_name:"Customer Type"),
      hide_discount_table: new FormControl(customize?customize.hide_discount_table:true),
      hide_taxable_table: new FormControl(customize?customize.hide_taxable_table:false),
      hide_total_summary_table: new FormControl(customize?customize.hide_total_summary_table:false),
      hide_reception_table: new FormControl(customize?customize.hide_reception_table:true),
      hide_visa: new FormControl(customize?customize.hide_visa:true),
      hide_logo: new FormControl(customize?customize.hide_logo:false),
      is_default: new FormControl(customize?customize.hide_logo:false),
      nom_signature_cachet: new FormControl(customize?customize.nom_signature_cachet:null),
      done_title: new FormControl(customize?customize.done_title:null),
      done_where: new FormControl(customize?customize.done_title:null),
      done_at: new FormControl(customize?customize.done_at:null),
      business_id: new FormControl(customize?customize.business_id:null)
    });
  }
  get company_name() {
    return this.customizeForm.get("company_name");
  }
   get address() {
    return this.customizeForm.get("address");
  }
  get contact() {
    return this.customizeForm.get("contact");
  }
  get font_size() {
    return this.customizeForm.get("font_size");
  }

  get color() {
    return this.customizeForm.get("color");
  }
  get due_days() {
    return this.customizeForm.get("due_days");
  }
  get default_title() {
    return this.customizeForm.get("default_title");
  }
  get default_sub_title() {
    return this.customizeForm.get("default_sub_title");
  }
  get default_footer() {
    return this.customizeForm.get("default_footer");
  }
  get memo() {
    return this.customizeForm.get("memo");
  }
  get items() {
    return this.customizeForm.get("items");
  }
  get logo() {
    return this.customizeForm.get("logo");
  }
  get units() {
    return this.customizeForm.get("units");
  }
  get price() {
    return this.customizeForm.get("price");
  }
  get amount() {
    return this.customizeForm.get("amount");
  }
  get number() {
    return this.customizeForm.get("number");
  }
  get adherent() {
    return this.customizeForm.get("adherent");
  }
  get customer_name() {
    return this.customizeForm.get("customer_name");
  }
  get customer_number() {
    return this.customizeForm.get("customer_number");
  }
  get customer_dob() {
    return this.customizeForm.get("customer_dob");
  }
  get beneficiary() {
    return this.customizeForm.get("beneficiary");
  }
  get customer_type_name() {
    return this.customizeForm.get("customer_type_name");
  }
  get hide_discount_table() {
    return this.customizeForm.get("hide_discount_table");
  }
  get hide_taxable_table() {
    return this.customizeForm.get("hide_taxable_table");
  }
  get hide_total_summary_table() {
    return this.customizeForm.get("hide_total_summary_table");
  }
  get hide_reception_table() {
    return this.customizeForm.get("hide_reception_table");
  }
  get hide_visa() {
    return this.customizeForm.get("hide_visa");
  }
  get hide_logo() {
    return this.customizeForm.get("hide_logo");
  }
  get is_default() {
    return this.customizeForm.get("is_default");
  }
  get nom_signature_cachet() {
    return this.customizeForm.get("nom_signature_cachet");
  }
  get done_title() {
    return this.customizeForm.get("done_title");
  }
  get done_where() {
    return this.customizeForm.get("done_where");
  }
  get done_at() {
    return this.customizeForm.get("done_at");
  }
  get business_id() {
    return this.customizeForm.get("business_id");
  }
  get tax_number() {
    return this.customizeForm.get("tax_number");
  }


  close() {
    this.router.navigate(["/admin/settings/customize-invoice"]);
  }
  confirm(){

  }
}