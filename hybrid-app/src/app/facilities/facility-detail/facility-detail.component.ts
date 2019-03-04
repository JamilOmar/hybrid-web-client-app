import { Component, OnInit, Input } from '@angular/core';
import { Facility } from 'src/app/shared';
import { FacilityService } from '../facility.service';
import { ActivatedRoute, Params , Router } from '@angular/router';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.css']
})
export class FacilityDetailComponent implements OnInit {

  @Input() facility: Facility;
  @Input() index: number;
  constructor(private facilityService: FacilityService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }


  onEditFacility() {
    this.router.navigate(['../', this.facility.id, 'edit'], { relativeTo: this.route });

  }
  onDeleteFacility() {
    this.facilityService.deleteById(this.facility.id);
    this.router.navigate(['../'], { relativeTo: this.route });

  }

}
