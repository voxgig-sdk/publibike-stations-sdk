"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PUBLIBIKE_STATIONS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PUBLIBIKE_STATIONS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PublibikeStationsSDK.test();
        const ent = testsdk.Station();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PUBLIBIKE_STATIONS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'station.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "h": "Address", "n": "address", "r": false, "sh": "Station address without the city", "t": "`$STRING`", "key$": "address", "index$": 0 }, "capacity": { "a": true, "fo": "int32", "h": "Capacity", "n": "capacity", "r": false, "sh": "The maximum number of bikes a station is able to accommodate.", "t": "`$INTEGER`", "key$": "capacity", "index$": 1 }, "city": { "a": true, "h": "City", "n": "city", "r": false, "sh": "City of the station", "t": "`$STRING`", "key$": "city", "index$": 2 }, "id": { "a": true, "fo": "int32", "h": "Id", "n": "id", "r": true, "sh": "Technical station id", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "is_virtual_station": { "a": true, "h": "Is Virtual Station", "n": "is_virtual_station", "r": false, "sh": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…", "t": "`$BOOLEAN`", "key$": "is_virtual_station", "index$": 4 }, "latitude": { "a": true, "fo": "double", "h": "Latitude", "n": "latitude", "r": true, "sh": "Latitude of the station", "t": "`$NUMBER`", "key$": "latitude", "index$": 5 }, "longitude": { "a": true, "fo": "double", "h": "Longitude", "n": "longitude", "r": true, "sh": "Longitude of the station", "t": "`$NUMBER`", "key$": "longitude", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Public name of the station", "t": "`$STRING`", "key$": "name", "index$": 7 }, "network": { "a": true, "h": "Network", "n": "network", "r": true, "sh": "Representation of a network", "t": "`$OBJECT`", "key$": "network", "index$": 8 }, "sponsors": { "a": true, "h": "Sponsors", "n": "sponsors", "r": false, "sh": "An array of sponsors of this station", "t": "`$ARRAY`", "key$": "sponsors", "index$": 9 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "Representation of a state.", "t": "`$OBJECT`", "key$": "state", "index$": 10 }, "vehicles": { "a": true, "h": "Vehicles", "n": "vehicles", "r": false, "sh": "All vehicles that are currently available at this station", "t": "`$ARRAY`", "key$": "vehicles", "index$": 11 }, "zip": { "a": true, "h": "Zip", "n": "zip", "r": false, "sh": "Zip code of the station", "t": "`$STRING`", "key$": "zip", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "station", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /public/partner/stations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/public/partner/stations", "q": {}, "r": {}, "s": [{ "lit": "public" }, { "lit": "partner" }, { "lit": "stations" }], "t": { "req": "`reqdata`", "res": "`body.stations`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /public/stations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/public/stations", "q": {}, "r": {}, "s": [{ "lit": "public" }, { "lit": "stations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /public/stations/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/public/stations/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "public" }, { "lit": "stations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "station", "name__orig": "station", "Name": "Station", "name_": "station", "name-": "station", "NAME": "STATION", "index$": 0 }, { "active": true, "entity": "station", "key$": "BasicStationFlow", "kind": "basic", "name": "BasicStationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "station_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "station_ref01", "srcdatavar": "station_ref01_data", "suffix": "_dt0" }, "m": { "id": "station01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-station_ref01" } }], "index$": 1 }] }, 'Station', { "GET /public/partner/stations": { "protocol": "http", "operationId": "getAllStationsForPartners", "responses": { "200": { "description": "Information of all the stations", "content": { "application/json": { "schema": { "type": "object", "description": "Container for stations and their vehicles.", "required": ["stations"], "properties": { "stations": { "items": { "description": "Overview of a single station and it's vehicles", "properties": { "address": { "description": "Station address without the city", "type": "string", "key$": "address" }, "capacity": { "description": "The maximum number of bikes a station is able to accommodate. This is not a hard limit but can be used for displaying purposes.", "format": "int32", "type": "integer", "key$": "capacity" }, "city": { "description": "City of the station", "type": "string", "key$": "city" }, "id": { "description": "Technical station id", "format": "int32", "type": "integer", "key$": "id" }, "is_virtual_station": { "description": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastructure (docks) but is defined e.g. via geolocation", "type": "boolean", "key$": "is_virtual_station" }, "latitude": { "description": "Latitude of the station", "format": "double", "type": "number", "key$": "latitude" }, "longitude": { "description": "Longitude of the station", "format": "double", "type": "number", "key$": "longitude" }, "name": { "description": "Public name of the station", "type": "string", "key$": "name" }, "network": { "description": "Representation of a network", "properties": { "background_img": { "description": "Background image for app (language specific)", "type": "string" }, "id": { "description": "Technical station id", "format": "int32", "type": "integer" }, "logo_img": { "description": "Logo of the network (language specific)", "type": "string" }, "name": { "description": "Translated network name", "type": "string" }, "sponsors": { "description": "An array of sponsors for this network", "items": { "description": "Represents a sponsor item containing an image and link (translated).", "properties": { "id": { "description": "Technical sponsor id.", "format": "int32", "type": "integer" }, "image": { "description": "Logo of the sponsor.", "type": "string" }, "name": { "description": "Name of the sponsor.", "type": "string" }, "url": { "description": "URL to sponsor website.", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Sponsor" }, "type": "array" } }, "required": ["id", "name"], "type": "object", "x-ref": "#/components/schemas/Network", "key$": "network" }, "sponsors": { "description": "An array of sponsors of this station", "items": { "description": "Represents a sponsor item containing an image and link (translated).", "properties": { "id": { "description": "Technical sponsor id.", "format": "int32", "type": "integer" }, "image": { "description": "Logo of the sponsor.", "type": "string" }, "name": { "description": "Name of the sponsor.", "type": "string" }, "url": { "description": "URL to sponsor website.", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Sponsor" }, "type": "array", "key$": "sponsors" }, "state": { "description": "Representation of a state.", "properties": { "id": { "description": "Technical state id", "format": "int32", "type": "integer" }, "name": { "description": "Translated human-readable state name", "type": "string" } }, "required": ["id", "name"], "type": "object", "x-ref": "#/components/schemas/State", "key$": "state" }, "vehicles": { "description": "All vehicles that are currently available at this station", "items": { "description": "Representation of a vehicle", "properties": { "ebike_battery_level": { "description": "E-Bike battery level in percent. The e-bike battery level is between 0 and 100. If the value is missing it is either not an e-bike or the battery level is unknown.", "format": "double", "maximum": 100, "minimum": 0, "type": "number" }, "id": { "description": "Technical vehicle id", "format": "int32", "type": "integer" }, "name": { "description": "Vehicle number visible to the user", "type": "string" }, "type": { "description": "Representation of a type.", "properties": { "id": { "description": "Technical type id", "format": "int32", "type": "integer" }, "name": { "description": "Translated human-readable type name", "type": "string" } }, "required": ["id", "name"], "type": "object", "x-ref": "#/components/schemas/Type" } }, "required": ["id", "name", "type"], "type": "object", "x-ref": "#/components/schemas/Vehicle" }, "type": "array", "key$": "vehicles" }, "zip": { "description": "Zip code of the station", "type": "string", "key$": "zip" } }, "required": ["id", "latitude", "longitude", "state", "name"], "type": "object", "x-ref": "#/components/schemas/StationForPartner", "index$": 0 }, "key$": "stations", "type": "array" } }, "x-ref": "#/components/schemas/StationsForPartner" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /public/stations": { "protocol": "http", "operationId": "getAllStations", "responses": { "200": { "description": "An array of stations", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "description": "Overview of a station to be displayed on map", "required": ["id", "latitude", "longitude", "state"], "properties": { "id": { "type": "integer", "format": "int32", "description": "Technical station id", "key$": "id" }, "latitude": { "type": "number", "format": "double", "description": "Latitude of the station", "key$": "latitude" }, "longitude": { "type": "number", "format": "double", "description": "Longitude of the station", "key$": "longitude" }, "state": { "type": "object", "description": "Representation of a state.", "required": ["id", "name"], "properties": { "id": { "description": "Technical state id", "format": "int32", "type": "integer" }, "name": { "description": "Translated human-readable state name", "type": "string" } }, "x-ref": "#/components/schemas/State", "key$": "state" } }, "x-ref": "#/components/schemas/StationOverview", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /public/stations/{id}": { "protocol": "http", "operationId": "getStationById", "responses": { "200": { "description": "Station details", "content": { "application/json": { "schema": { "type": "object", "description": "Station with current available vehicles. The id of the state is an enumeration, e.g. {1: active, 2: inactive, ...}", "required": ["id", "latitude", "longitude", "state", "name"], "properties": { "id": { "type": "integer", "format": "int32", "description": "Technical station id", "key$": "id" }, "latitude": { "type": "number", "format": "double", "description": "Latitude of the station", "key$": "latitude" }, "longitude": { "type": "number", "format": "double", "description": "Longitude of the station", "key$": "longitude" }, "state": { "type": "object", "description": "Representation of a state.", "required": ["id", "name"], "properties": { "id": { "description": "Technical state id", "format": "int32", "type": "integer" }, "name": { "description": "Translated human-readable state name", "type": "string" } }, "x-ref": "#/components/schemas/State", "key$": "state" }, "name": { "type": "string", "description": "Public name of the station", "key$": "name" }, "address": { "type": "string", "description": "Station address without the city", "key$": "address" }, "zip": { "type": "string", "description": "Zip code of the station", "key$": "zip" }, "city": { "type": "string", "description": "City of the station", "key$": "city" }, "vehicles": { "type": "array", "description": "All vehicles that are currently available at this station", "items": { "type": "object", "description": "Representation of a vehicle", "required": ["id", "name", "type"], "properties": { "id": { "description": "Technical vehicle id", "format": "int32", "type": "integer" }, "name": { "description": "Vehicle number visible to the user", "type": "string" }, "ebike_battery_level": { "description": "E-Bike battery level in percent. The e-bike battery level is between 0 and 100. If the value is missing it is either not an e-bike or the battery level is unknown.", "format": "double", "maximum": 100, "minimum": 0, "type": "number" }, "type": { "description": "Representation of a type.", "properties": { "id": { "description": "Technical type id", "format": "int32", "type": "integer" }, "name": { "description": "Translated human-readable type name", "type": "string" } }, "required": ["id", "name"], "type": "object", "x-ref": "#/components/schemas/Type" } }, "x-ref": "#/components/schemas/Vehicle" }, "key$": "vehicles" }, "network": { "type": "object", "description": "Representation of a network", "required": ["id", "name"], "properties": { "id": { "description": "Technical station id", "format": "int32", "type": "integer" }, "name": { "description": "Translated network name", "type": "string" }, "background_img": { "description": "Background image for app (language specific)", "type": "string" }, "logo_img": { "description": "Logo of the network (language specific)", "type": "string" }, "sponsors": { "description": "An array of sponsors for this network", "items": { "description": "Represents a sponsor item containing an image and link (translated).", "properties": { "id": { "description": "Technical sponsor id.", "format": "int32", "type": "integer" }, "image": { "description": "Logo of the sponsor.", "type": "string" }, "name": { "description": "Name of the sponsor.", "type": "string" }, "url": { "description": "URL to sponsor website.", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Sponsor" }, "type": "array" } }, "x-ref": "#/components/schemas/Network", "key$": "network" }, "sponsors": { "type": "array", "description": "An array of sponsors of this station", "items": { "type": "object", "description": "Represents a sponsor item containing an image and link (translated).", "properties": { "id": { "description": "Technical sponsor id.", "format": "int32", "type": "integer" }, "name": { "description": "Name of the sponsor.", "type": "string" }, "image": { "description": "Logo of the sponsor.", "type": "string" }, "url": { "description": "URL to sponsor website.", "type": "string" } }, "x-ref": "#/components/schemas/Sponsor" }, "key$": "sponsors" } }, "x-ref": "#/components/schemas/StationDetails", "index$": 0 } } } }, "404": { "description": "Station not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "The station id", "schema": { "type": "integer", "format": "int32" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let station_ref01_data = Object.values(setup.data.existing.station)[0];
        // LIST
        const station_ref01_ent = client.Station();
        const station_ref01_match = {};
        const station_ref01_list = (await station_ref01_ent.list(station_ref01_match)).map((e) => e.data());
        // LOAD
        const station_ref01_match_dt0 = {};
        station_ref01_match_dt0.id = station_ref01_data.id;
        const station_ref01_data_dt0 = (await station_ref01_ent.load(station_ref01_match_dt0)).data();
        (0, node_assert_1.default)(station_ref01_data_dt0.id === station_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/station/StationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PublibikeStationsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['station01', 'station02', 'station03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PUBLIBIKE_STATIONS_TEST_STATION_ENTID': idmap,
        'PUBLIBIKE_STATIONS_TEST_LIVE': 'FALSE',
        'PUBLIBIKE_STATIONS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PUBLIBIKE_STATIONS_TEST_STATION_ENTID'];
    const live = 'TRUE' === env.PUBLIBIKE_STATIONS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PUBLIBIKE_STATIONS_TEST_STATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PublibikeStationsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PUBLIBIKE_STATIONS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=StationEntity.test.js.map