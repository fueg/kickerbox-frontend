import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {KickerboxService} from '../kickerbox.service';
import {Router} from '@angular/router';
import {Kickerbox} from '../../data-model';

@Component({
  selector: 'app-kickerbox-new',
  templateUrl: './kickerbox-new.component.html',
  styleUrls: ['./kickerbox-new.component.scss']
})
export class KickerboxNewComponent implements OnInit {

  kickerboxForm: FormGroup;

  constructor(private kickerboxService: KickerboxService,
              private fb: FormBuilder,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.kickerboxForm = this.fb.group({
      kickerboxName: '',
      kickerboxLocation: '',
      kickerboxModel: ''
    });
  }

  onSubmit() {
    const {kickerboxName, kickerboxLocation, kickerboxModel} = this.kickerboxForm.value;
    const savable = new Kickerbox(kickerboxName, kickerboxLocation, kickerboxModel);

    this.kickerboxService
      .createKickerbox(savable)
      .toPromise()
      .then(() => {
        this.cancel();
      });
  }

  cancel() {
    this.rebuildForm();
    this.router.navigate(['kickerboxes']);
  }

  rebuildForm() {
    this.kickerboxForm.reset({});
  }
}
