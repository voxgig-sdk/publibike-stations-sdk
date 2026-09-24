"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublibikeStationsError = void 0;
class PublibikeStationsError extends Error {
    isPublibikeStationsError = true;
    sdk = 'PublibikeStations';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PublibikeStationsError = PublibikeStationsError;
//# sourceMappingURL=PublibikeStationsError.js.map