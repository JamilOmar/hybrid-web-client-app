import { Injectable } from '@angular/core';
import Axios from 'axios';
import { IFacilityService, Facility } from '../shared';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilityDataService implements IFacilityService {

  client: any;
  constructor() {

    this.client = Axios.create(environment.facilityAPI);
  }

  async create(facility: Facility): Promise<Facility> {
    const response = await this.client.post('/facilities', facility);
    return response.data as Facility;
  }

  async count(where?: any): Promise<any> {
    const response = await this.client.get('/facilities/count', { params: where });
    return response.data.count;
  }

  async find(filter?: any): Promise<Facility[]> {
    const response = await this.client.get('/facilities', { params: filter });
    return response.data as Facility[];
  }

  async updateAll(facility: Facility, where?: any): Promise<any> {
    const response = await this.client.patch(`/facilities/${where}`, facility);
    return response.data.count;
  }

  async findById(id: number): Promise<Facility> {
    const response = await this.client.get(`/facilities/${id}`);
    return response.data;
  }

  async updateById(id: number, facility: Facility): Promise<void> {
    const response = await this.client.patch(`/facilities/${id}`, facility);
    return;
  }
  async replaceById(id: number, facility: Facility,
  ): Promise<void> {
    const response = await this.client.put(`/facilities/${id}`, facility);
    return;
  }
  async deleteById(id: number): Promise<void> {
    const response = await this.client.delete(`/facilities/${id}`);
    return;
  }
}
