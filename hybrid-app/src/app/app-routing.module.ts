import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilityEditComponent } from './facilities/facility-edit/facility-edit.component';
import { FacilityDetailComponent } from './facilities/facility-detail/facility-detail.component';
import { FacilitiesComponent } from './facilities/facilities.component';

const routes: Routes = [
        { path: '', component: FacilitiesComponent },
        { path: 'new', component: FacilityEditComponent},
        { path: ':id', component: FacilityDetailComponent },
        { path: ':id/edit', component: FacilityEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
