import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientpoliceverificationlistComponent } from './patientpoliceverificationlist.component';

describe('PatientpoliceverificationlistComponent', () => {
  let component: PatientpoliceverificationlistComponent;
  let fixture: ComponentFixture<PatientpoliceverificationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientpoliceverificationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientpoliceverificationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
