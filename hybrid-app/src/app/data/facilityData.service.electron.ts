import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IFacilityService, Facility } from '../shared';
@Injectable({
  providedIn: 'root'
})
export class FacilityDataService implements IFacilityService {
  constructor(private electronService: ElectronService) {

  }
  private createIPCPromise(eventName: string , ...params: any[]) {
    this.electronService.ipcRenderer.send(eventName, ...params);
    return new Promise((resolve, reject) => {
      this.electronService.ipcRenderer.once(`${eventName}-success`,
        (event, args) => {
          resolve(args);
        });
        this.electronService.ipcRenderer.once(`${eventName}-error`,
        (event, args) => {
          reject(args);
        });
    });
  }
  async create(facility: Facility): Promise<Facility> {
    return this.createIPCPromise( 'facility-create', facility) as Promise<Facility>;
  }
  async count(where?: any): Promise<any> {
    return this.createIPCPromise('facility-count', where);
  }
  async find(filter?: any): Promise<Facility[]> {
    return this.createIPCPromise('facility-find', filter) as Promise<Facility[]>;
  }

  async updateAll(facility: Facility, where?: any): Promise<any> {
    return this.createIPCPromise('facility-updateAll', facility , where);
  }

  async findById(id: number): Promise<Facility> {
    return this.createIPCPromise('facility-findById', id) as Promise<Facility>;
  }

  async updateById(id: number, facility: Facility): Promise<void> {

    await this.createIPCPromise('facility-updateById', id, facility);
    return;
  }
  async replaceById(id: number, facility: Facility,
  ): Promise<void> {
    await this.createIPCPromise('facility-replaceById', id, facility);
    return;
  }
  async deleteById(id: number): Promise<void> {
    await this.createIPCPromise('facility-deleteById', id);
    return;
  }
}
