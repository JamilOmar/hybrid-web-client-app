import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FacilitiesComponent} from './facilities/facilities.component';
import {FacilityDetailComponent} from './facilities/facility-detail/facility-detail.component';
import {FacilityEditComponent} from './facilities/facility-edit/facility-edit.component';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    FacilitiesComponent,
    FacilityDetailComponent,
    FacilityEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
