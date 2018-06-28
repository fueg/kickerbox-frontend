import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TeamsService} from '../teams.service';
import {Router} from '@angular/router';
import {Team} from '../../data-model';

@Component({
  selector: 'app-team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.scss']
})
export class TeamNewComponent implements OnInit {

  teamForm: FormGroup;

  constructor(private teamService: TeamsService,
              private fb: FormBuilder,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.teamForm = this.fb.group({
      teamName: '',
      teamMemberOne: '',
      teamMemberTwo: '',
    });
  }

  onSubmit() {
    const {teamName, teamMemberOne, teamMemberTwo} = this.teamForm.value;
    const savable = new Team(teamName, teamMemberOne, teamMemberTwo);

    this.teamService
      .createTeam(savable)
      .toPromise()
      .then(() => {
        this.cancel();
      });
  }

  cancel() {
    this.rebuildForm();
    this.router.navigate(['/teams']);
  }

  rebuildForm() {
    this.teamForm.reset({});
  }
}
