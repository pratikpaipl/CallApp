import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.scss'],
})
export class SubTaskComponent implements OnInit {
  modalTitle: string;
  modelId: number;

  public form: FormGroup;
  public contactList: FormArray;
  
  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  @Input()
  startDate:any;  
  @Input()
  endDate:any;  

  private subTaskCount: number = 1;
  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private fb: FormBuilder ) { 


  }
  createContact(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])]
    });
  }


  changedFieldType(index) {
    let validators = null;

      validators = Validators.compose([
        Validators.required,
        // Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
      ]);

    this.getContactsFormGroup(index).controls['value'].setValidators(
      validators
    );

    this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
  }

  // add a contact form group
addContact() {
  this.contactList.push(this.createContact());
}


// remove contact from group
removeContact(index) {
  this.contactList.removeAt(index);
}

getContactsFormGroup(index): FormGroup {
  this.contactList = this.form.get('contacts') as FormArray;
  const formGroup = this.contactList.controls[index] as FormGroup;
  return formGroup;
}

  ngOnInit() {

    if(this.endDate == undefined || this.endDate ==''){
      this.endDate = this.startDate
    }

    this.form = this.fb.group({
      parentId: [],
      contacts: this.fb.array([this.createContact()])
    });
  
  // set contactlist to the form control containing contacts
    this.contactList = this.form.get('contacts') as FormArray;
  }
  
  submit(){
      this.change.emit({ isSub:1, value:this.form.value});
  }
  closeModal(){
    this.change.emit({ isSub:0});
  }
}
