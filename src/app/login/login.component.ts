import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="THANK YOU FOR CHOOSING US"
  accnum="User ID Please!!!"
  pswd="Password"
  acno=""
  pwd=""
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
    constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }
  
    ngOnInit(): void {
    }
    
    login(){
      var acno=this.loginForm.value.acno
      var pwd=this.loginForm.value.pwd
      if(this.loginForm.valid){
  
        this.ds.login(acno,pwd)
        .subscribe((result:any)=>{
          if(result){
            localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
            localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
            localStorage.setItem("token",JSON.stringify(result.token))
            alert(result.message)
            this.router.navigateByUrl("dashboard")
          }
        },
        (result:any)=>{
          alert(result.error.message)
        }
  
        )}
     
    else{
      alert("Invalid form")
    }
   } 
  }
  
    