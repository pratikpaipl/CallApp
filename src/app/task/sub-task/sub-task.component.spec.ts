import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubTaskComponent } from './sub-task.component';

describe('SubTaskComponent', () => {
  let component: SubTaskComponent;
  let fixture: ComponentFixture<SubTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubTaskComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
