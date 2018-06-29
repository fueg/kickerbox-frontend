import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KickerboxNewComponent} from './kickerbox-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KickerboxService} from '../kickerbox.service';
import {kickerboxes} from '../../data-model';
import {of} from 'rxjs/index';
import {Router} from "@angular/router";

describe('KickerboxNewComponent', () => {
  let component: KickerboxNewComponent;
  let fixture: ComponentFixture<KickerboxNewComponent>;

  const kickerboxService = jasmine.createSpyObj('KickerboxService', <Function>['getKickerboxes']);
  const getKickerboxesSpy = kickerboxService.getKickerboxes.and.returnValue(of(kickerboxes));
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [KickerboxNewComponent],
      providers: [
        {provide: KickerboxService, useValue: kickerboxService},
        {provide: Router, useValue: routerSpy},
      ]
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

  it('should rebuild form when cancel is called', () => {
    const rebuildFormSpy = spyOn(component, 'rebuildForm').and.callThrough();

    component.kickerboxForm.setValue({
      kickerboxName: 'abc',
      kickerboxLocation: 'location',
      kickerboxModel: 'model x'
    });
    component.cancel();

    expect(rebuildFormSpy).toHaveBeenCalled();
    expect(component.kickerboxForm.value).toEqual({
      kickerboxName: null,
      kickerboxLocation: null,
      kickerboxModel: null
    });
  });
});
