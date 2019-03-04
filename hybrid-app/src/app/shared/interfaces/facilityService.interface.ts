
import { Facility } from '../models';
export interface IFacilityService {

    create(facility: Facility): Promise<Facility>;

    count(where?: any): Promise<any>;

    find(filter?: any): Promise<Facility[]>;

    updateAll(facility: Facility, where?: any): Promise<any>;

    findById(id: number): Promise<Facility>;


    updateById(id: number, facility: Facility): Promise<void>;


    replaceById(id: number, facility: Facility,
    ): Promise<void>;

    deleteById(id: number): Promise<void>;
}
