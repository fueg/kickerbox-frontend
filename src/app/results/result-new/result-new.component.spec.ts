import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultNewComponent } from './result-new.component';

describe('ResultNewComponent', () => {
  let component: ResultNewComponent;
  let fixture: ComponentFixture<ResultNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
