import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringComponent } from './recurring.component';

describe('MenuItemComponent', () => {
  let component: RecurringComponent;
  let fixture: ComponentFixture<RecurringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
