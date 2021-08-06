import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCardComponent } from './top-card.component';

describe('TopCardComponent', () => {
  let component: TopCardComponent;
  let fixture: ComponentFixture<TopCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
