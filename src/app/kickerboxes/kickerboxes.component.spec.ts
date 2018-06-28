import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickerboxesComponent } from './kickerboxes.component';

describe('KickerboxesComponent', () => {
  let component: KickerboxesComponent;
  let fixture: ComponentFixture<KickerboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickerboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickerboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
