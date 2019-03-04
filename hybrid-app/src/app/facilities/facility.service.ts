import { Injectable } from '@angular/core';
import {FacilityDataService} from '../data';
import {Facility} from '../shared';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  facilitiesChanged = new Subject<Facility[]>();
  constructor(private facilityData: FacilityDataService) { }
  async create(facility: Facility): Promise<Facility> {
   const data =  await this.facilityData.create(facility);
   this.facilitiesChanged.next();
   return data;

  }

  async count(where?: any): Promise<any> {
    return this.facilityData.count(where);
  }

  async find(filter?: any): Promise<Facility[]> {
    return this.facilityData.find(filter);
  }

  async updateAll(facility: Facility, where?: any): Promise<any> {
    const data =  await this.facilityData.updateAll(facility , where);
    this.facilitiesChanged.next();
    return data;
  }

  async findById(id: number): Promise<Facility> {
    return this.facilityData.findById(id);
  }

  async updateById(id: number, facility: Facility): Promise<void> {
      await this.facilityData.updateById(id , facility);
      this.facilitiesChanged.next();
  }

  async replaceById(id: number, facility: Facility,
  ): Promise<void> {
    await this.facilityData.replaceById(id , facility);
    this.facilitiesChanged.next();
  }

  async deleteById(id: number): Promise<void> {
    await this.facilityData.deleteById(id);
    this.facilitiesChanged.next();
  }
}
