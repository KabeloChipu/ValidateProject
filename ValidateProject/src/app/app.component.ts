import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { group } from '@angular/animations';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
 
    return (invalidCtrl || invalidParent);
  }
 }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ValidateProject';
  LoginForm

  userInfo=[]
 
  Email:string="";
  Password:string;
  confirmpass:string;
  constructor (public FormBuilder: FormBuilder) {
    this.LoginForm = FormBuilder.group({
      Email:["",Validators.email],
      Password:["",[Validators.required,Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
 
     });
 
     const ConfirmPasswordControl = new FormControl('',{
       validators:samevalueAs(this.LoginForm,'Password')
     });
 
 
     this.LoginForm.addControl('CornfirmPasswrd',ConfirmPasswordControl);
     function samevalueAs(group:FormGroup, controlName : string): ValidatorFn{
       return (control:FormControl)=>{
         const myValue=control.value;
         const compareValue=group.controls[controlName].value;
         return(myValue===compareValue)? null:{valueofDifferentFrom:controlName};
       }
     }
    }
 
    Login(){
      this.userInfo.push({
        Email: this.Email,
        Password:this.Password,
        CornfirmPasswrd:this.confirmpass
      })
    }
 }
