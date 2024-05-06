import { Component , Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';


const VALIDATORS_MESSAGE:any = {
  required:'Should Not Be Empty!',
  email:'Email Is Not Valid!',
  minlength: 'Feild Is Too Short!',
  notMatch: 'Password And Confirm Password Does Not Match!'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMessages: string[] = [];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
  this.control.statusChanges.subscribe(() =>{
    this.checkValidation();
  });
  this.control.valueChanges.subscribe(() =>{
    this.checkValidation();
  })  
  }

  checkValidation():void{
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGE[key]); 
  }

}
