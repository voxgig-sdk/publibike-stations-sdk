import { Context } from './Context';
declare class PublibikeStationsError extends Error {
    isPublibikeStationsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PublibikeStationsError };
