import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTaskComponent } from './no-task.component';

describe('NoTaskComponent', () => {
  let component: NoTaskComponent;
  let fixture: ComponentFixture<NoTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
