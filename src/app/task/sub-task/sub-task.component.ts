import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.scss'],
})
export class SubTaskComponent implements OnInit {
  modalTitle: string;
  modelId: number;


  @Input()
  startDate:any;  

  public myForm: FormGroup;
  private subTaskCount: number = 1;
  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder ) { 

    this.myForm = formBuilder.group({
      Subtask1: ['', Validators.required],
    });
  }

  addControl(){
    this.subTaskCount++;
    this.myForm.addControl('Subtask' + this.subTaskCount, new FormControl('', Validators.required));
  }
  removeControl(control){
    this.myForm.removeControl(control.key);
  }
  ngOnInit() {
    // this.modelId = this.navParams.data.paramID;
    // this.modalTitle = this.navParams.data.paramTitle;
  }

  submit(){
      this.change.emit('');
  }

}
