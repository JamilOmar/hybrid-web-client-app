import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FacilityService } from '../facility.service';
import { Facility } from 'src/app/shared';
@Component({
  selector: 'app-facility-edit',
  templateUrl: './facility-edit.component.html',
  styleUrls: ['./facility-edit.component.css']
})
export class FacilityEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  facilityForm: FormGroup;
  constructor(private route: ActivatedRoute, private facilityService: FacilityService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.editMode = (params['id'] != null);
      this.initForm();
      if (this.editMode) {
        await this.updateFormData();
      }
    });
  }

  private initForm() {
    const facilityName = '';
    this.facilityForm = new FormGroup({
      'name': new FormControl(facilityName, Validators.required)
    });

  }
  private async updateFormData() {
    const facility = await this.facilityService.findById(this.id);
    this.facilityForm.patchValue(facility);
  }

  async onSubmit() {
    const newFacility = new Facility();
    newFacility.name = this.facilityForm.value['name'];

    if (this.editMode) {
      await this.facilityService.updateById(this.id, newFacility);
    } else {
      await this.facilityService.create(newFacility);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['']);
  }

}
