import { PopoverController, NavParams } from '@ionic/angular';
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
  data: any;
  
  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  // @Input()
  startDate:any;  
  // @Input()
  endDate:any;  

  private subTaskCount: number = 1;
  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private fb: FormBuilder,public popover:PopoverController,public navParams: NavParams ) { 
  

  }
  createContact(name,value): FormGroup {
    return this.fb.group({ name: [name, Validators.compose([Validators.required])], value: [value, Validators.compose([Validators.required])] });
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
  this.contactList.push(this.createContact(null,null));
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

    this.data = this.navParams.data;
    this.startDate=this.data.startDate;
    this.endDate=this.data.endDate;
    console.log("nav params ", this.data);
    if (this.endDate == undefined) {
      console.log("endDate ",this.data.startDate);
      this.endDate =this.data.startDate;
      console.log("endDate ",this.endDate);
    }
    this.form = this.fb.group({
      parentId: [],
      contacts: this.fb.array([])
    });
  
    this.contactList = this.form.get('contacts') as FormArray;

    for (let i = 0; i < this.data.subTasks.length; i++) {
      const element = this.data.subTasks[i];
      this.contactList.push(this.createContact(element.name,element.value));
    }
    if(this.data.subTasks.length == 0){
      this.contactList.push(this.createContact(null,null));
    }
  }
  
  submit(){
      // this.change.emit({ isSub:1, value:this.form.value});
      this.popover.dismiss({ isSub:1, value:this.form.value});
    }
    closeModal(){
    this.popover.dismiss({ isSub:0});
    // this.change.emit({ isSub:0});
  }
}
