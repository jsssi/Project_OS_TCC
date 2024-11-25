import { Injectable } from "@angular/core";
import { employer } from "../model/employer";

@Injectable({
  providedIn: "root"
})

export default class employerService {
  private employer: employer[] = [];
  constructor() {
    this.loadLocalStorage()
  }


  private loadLocalStorage(){
    const data = localStorage.getItem('employer')
    if(data){
      this.employer = JSON.parse(data)
    }
  }
  private SaveInLocalStorage(){
    localStorage.setItem('employer' , JSON.stringify(this.employer))
  }
  getEmplyer(): employer[] {
    return this.employer;
  }
  SetEmployer(employer: employer) {
    this.SaveInLocalStorage()
    this.employer.push(employer);
  }
}
