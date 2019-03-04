import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Facility } from '../shared';
import { FacilityService } from './facility.service';
@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit , OnDestroy {

  facilities: Facility[];
  subscription: Subscription;
  constructor(private facilityService: FacilityService ,  private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit() { this.subscription = this.facilityService.facilitiesChanged.subscribe(async () => {
    this.facilities = await this.facilityService.find();
  });
  this.facilities = await this.facilityService.find();
}
onNewFacility() {
  this.router.navigate(['new'], { relativeTo: this.route });

}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
