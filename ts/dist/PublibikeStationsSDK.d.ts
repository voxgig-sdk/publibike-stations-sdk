import { StationEntity } from './entity/StationEntity';
export type * from './PublibikeStationsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PublibikeStationsEntityBase } from './PublibikeStationsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class PublibikeStationsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Station(entopts?: Record<string, any>): StationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PublibikeStationsSDK;
    tester(testopts?: any, sdkopts?: any): PublibikeStationsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PublibikeStationsSDK;
export { stdutil, config, BaseFeature, PublibikeStationsEntityBase, PublibikeStationsSDK, SDK, };
export type { DirectResult };
