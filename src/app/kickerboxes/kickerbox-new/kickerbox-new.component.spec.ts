import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickerboxNewComponent } from './kickerbox-new.component';

describe('KickerboxNewComponent', () => {
  let component: KickerboxNewComponent;
  let fixture: ComponentFixture<KickerboxNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickerboxNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickerboxNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
