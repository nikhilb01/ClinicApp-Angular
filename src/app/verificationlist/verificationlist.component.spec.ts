import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationlistComponent } from './verificationlist.component';

describe('VerificationlistComponent', () => {
  let component: VerificationlistComponent;
  let fixture: ComponentFixture<VerificationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
