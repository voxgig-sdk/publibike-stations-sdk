import { PublibikeStationsEntityBase } from '../PublibikeStationsEntityBase';
import type { PublibikeStationsSDK } from '../PublibikeStationsSDK';
import type { Control } from '../types';
import type { Station, StationLoadMatch, StationListMatch } from '../PublibikeStationsTypes';
declare class StationEntity extends PublibikeStationsEntityBase<Station> {
    constructor(client: PublibikeStationsSDK, entopts: any);
    make(this: StationEntity): StationEntity;
    load(this: any, reqmatch?: StationLoadMatch, ctrl?: Control): Promise<StationEntity>;
    list(this: any, reqmatch?: StationListMatch, ctrl?: Control): Promise<StationEntity[]>;
}
export { StationEntity };
