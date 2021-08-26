import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'sub-task',
  templateUrl: './sub-task.page.html',
  styleUrls: ['./sub-task.page.scss'],
})
export class SubTaskPage implements OnInit {


  public form: FormGroup;
  public contactList: FormArray;


  constructor(private fb: FormBuilder ) { 
    this.form = this.fb.group({
      parent_task_id: [null, Validators.compose([Validators.required])],
      contacts: this.fb.array([this.createContact()])
    });
  
  // // set contactlist to the form control containing contacts
    this.contactList = this.form.get('contacts') as FormArray;
  }

  addControl(){

    console.log('Ádd Controll ',this.contactList);
    this.contactList.push(this.createContact());
  }
// remove contact from group
removeContact(index) {
  this.contactList.removeAt(index);
}

ngOnInit() {
    
  }
  createContact(): FormGroup {
    return this.fb.group({
      // type: ['email', Validators.compose([Validators.required])],
      taskname: [null, Validators.compose([Validators.required])],
      start_date: [null, Validators.compose([Validators.required])]
    });
  }
    // returns all form groups under contacts
    get contactFormGroup() {
      return this.form.get('contacts') as FormArray;
    }
  
 // get the formgroup under contacts form array
   getContactsFormGroup(index): FormGroup {
  // this.contactList = this.form.get('contacts') as FormArray;
  const formGroup = this.contactList.controls[index] as FormGroup;
  return formGroup;
}
  createSubTask(){
    const postData = new FormData();

   
    // for (let i = 0; i < this.myForm.controls. .length; i++) {
    //   const element = array[i];
      
    // }

    // postData.append('start_date',this.getDate(startDate))
    // postData.append('due_date',this.getDate(endDate))

  }
  submit(){
    console.log(this.form.value);
  }

}
