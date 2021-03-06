import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandComponent } from './expand.component';

describe('ExpandComponent', () => {
  let component: ExpandComponent;
  let fixture: ComponentFixture<ExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
