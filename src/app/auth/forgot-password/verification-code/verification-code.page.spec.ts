import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificationCodePage } from './verification-code.page';

describe('VerificationCodePage', () => {
  let component: VerificationCodePage;
  let fixture: ComponentFixture<VerificationCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationCodePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
