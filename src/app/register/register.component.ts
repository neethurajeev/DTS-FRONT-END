import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // registerform model
  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    ph:['',[Validators.required,Validators.pattern('[0-9]*')]],
    address:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    post:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    pin:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],

    })
  ds: any;

  constructor(private db:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register(){
   
    // alert("Register clicked")
    var uname=this.registerForm.value.uname
    var ph=this.registerForm.value.ph
    var dob=this.registerForm.value.Date
    var address=this.registerForm.value.address
    var post=this.registerForm.value.post
    var pin=this.registerForm.value.pin
    var type=this.registerForm.value.type
    var acno=this.registerForm.value.acno
    var password=this.registerForm.value.pwd
   
    if(this.registerForm.valid){

      this.db.register(uname,ph,dob,address,post,pin,type,acno,password)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
          this.router.navigateByUrl("")
        }
      },
      (result:any)=>{
        alert(result.error.message)
      })       
    }
    else{
      alert("Invalid form")
    }
    }

}
