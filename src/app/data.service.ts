import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser: any
  currentAcno:any

  //database
  database: any = {

    1000:{uname:"Arisha Barron",ph:123456789,dob:22333,address:"Address1",post:"Dubai",pin:123456,type:"Savings",acno:123,password:123,balance:5000,transaction:[]},
    1001:{uname:"Branden Gibson",ph:123456749,dob:2233,address:"Address2",post:"Dubai2",pin:1234456,type:"Savings",acno:1234,password:1234,balance:5000,transaction:[]},
    1002:{uname:"Rhonda Church",ph:123456789,dob:233,address:"Address3",post:"Dubai",pin:123456,type:"Savings",acno:12345,password:12345,balance:5000,transaction:[]},
    1003:{uname:"Georgina Hazel",ph:123456789,dob:233,address:"Address4",post:"Dubai",pin:123456,type:"Savings",acno:123456,password:123456,balance:5000,transaction:[]}
  }

  constructor(private http:HttpClient) {
    this.getDetails() }
//To save data in local storage
saveDetails(){
  localStorage.setItem("database",JSON.stringify(this.database))
  if(this.currentAcno){
    localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  }
  if(this.currentUser){
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
  }
}

//to get data from local storage
getDetails(){
  if(localStorage.getItem("database")){
    this.database=JSON.parse(localStorage.getItem("database")||'')
  }

  if(localStorage.getItem("currentAcno")){
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
  }

  if(localStorage.getItem("currentUser")){
    this.currentUser=JSON.parse(localStorage.getItem("currentUser")||'')
  }
}


  // register
  register(uname: any,ph:any,dob:any,address:any,post:any,pin:any,type:any, acno: any, password: any) {
    const data={
      uname,
      ph,
      dob,
      address,
      post,
      pin,
      type,
      acno,
      password
    }
return this.http.post('http://localhost:3000/register',data)
  }
//login
  login(acno: any, pwd: any) {


    const data={
      acno,
      pwd
    }
     return this.http.post('http://localhost:3000/login',data)

  }
  // deposit
  deposit(acno: any, pwd: any, amount: any) {
  const data={
    amount,
    acno,
    pwd
  }
  // depost api call
  return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
  }

  // add token to req header
  getOptions(){

    // to fetch token
    const token=JSON.parse(localStorage.getItem("token")|| '')

    // create http header
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append("x-access-token",token)
      options.headers=headers
    }
    return options
  }
  // withdraw
  withdraw(acno: any, pwd: any, amount: any) {
    const data={
      amount,
      acno,
      pwd
    }
    // depost api call
    return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())
  }
    


  //transaction 
  transaction(acno:any){
    const data={
      acno
    }
    // depost api call
    return this.http.post('http://localhost:3000/transaction',data,this.getOptions())
  }
    
onDelete(acno:any){
     // ondelete api call
  return this.http.delete('http://localhost:3000/onDelete/'+acno,this.getOptions())

}
  }






