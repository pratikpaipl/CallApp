import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubTaskPage } from './sub-task.page';

describe('SubTaskPage', () => {
  let component: SubTaskPage;
  let fixture: ComponentFixture<SubTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubTaskPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
