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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "address", "req": false, "short": "Station address without the city", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "int32", "name": "capacity", "req": false, "short": "The maximum number of bikes a station is able to accommodate.", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "city", "req": false, "short": "City of the station", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "int32", "name": "id", "req": true, "short": "Technical station id", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "is_virtual_station", "req": false, "short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "format": "double", "name": "latitude", "req": true, "short": "Latitude of the station", "type": "`$NUMBER`", "index$": 5 }, { "active": true, "format": "double", "name": "longitude", "req": true, "short": "Longitude of the station", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "name", "req": true, "short": "Public name of the station", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "network", "req": true, "short": "Representation of a network", "type": "`$OBJECT`", "index$": 8 }, { "active": true, "name": "sponsors", "req": false, "short": "An array of sponsors of this station", "type": "`$ARRAY`", "index$": 9 }, { "active": true, "name": "state", "req": true, "short": "Representation of a state.", "type": "`$OBJECT`", "index$": 10 }, { "active": true, "name": "vehicles", "req": false, "short": "All vehicles that are currently available at this station", "type": "`$ARRAY`", "index$": 11 }, { "active": true, "name": "zip", "req": false, "short": "Zip code of the station", "type": "`$STRING`", "index$": 12 }], "id": { "field": "id", "name": "id" }, "name": "station", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /public/partner/stations", "json": "{\"operationId\":\"getAllStationsForPartners\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Container for stations and their vehicles.\",\"properties\":{\"stations\":{\"items\":{\"description\":\"Overview of a single station and it's vehicles\",\"properties\":{\"address\":{\"description\":\"Station address without the city\",\"type\":\"string\"},\"capacity\":{\"description\":\"The maximum number of bikes a station is able to accommodate. This is not a hard limit but can be used for displaying purposes.\",\"format\":\"int32\",\"type\":\"integer\"},\"city\":{\"description\":\"City of the station\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"is_virtual_station\":{\"description\":\"Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastructure (docks) but is defined e.g. via geolocation\",\"type\":\"boolean\"},\"latitude\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Public name of the station\",\"type\":\"string\"},\"network\":{\"description\":\"Representation of a network\",\"properties\":{\"background_img\":{\"description\":\"Background image for app (language specific)\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"logo_img\":{\"description\":\"Logo of the network (language specific)\",\"type\":\"string\"},\"name\":{\"description\":\"Translated network name\",\"type\":\"string\"},\"sponsors\":{\"description\":\"An array of sponsors for this network\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"sponsors\":{\"description\":\"An array of sponsors of this station\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"state\":{\"description\":\"Representation of a state.\",\"properties\":{\"id\":{\"description\":\"Technical state id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable state name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"vehicles\":{\"description\":\"All vehicles that are currently available at this station\",\"items\":{\"description\":\"Representation of a vehicle\",\"properties\":{\"ebike_battery_level\":{\"description\":\"E-Bike battery level in percent. The e-bike battery level is between 0 and 100. If the value is missing it is either not an e-bike or the battery level is unknown.\",\"format\":\"double\",\"maximum\":100,\"minimum\":0,\"type\":\"number\"},\"id\":{\"description\":\"Technical vehicle id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Vehicle number visible to the user\",\"type\":\"string\"},\"type\":{\"description\":\"Representation of a type.\",\"properties\":{\"id\":{\"description\":\"Technical type id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable type name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"}},\"required\":[\"id\",\"name\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"zip\":{\"description\":\"Zip code of the station\",\"type\":\"string\"}},\"required\":[\"id\",\"latitude\",\"longitude\",\"state\",\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"stations\"],\"type\":\"object\"}}},\"description\":\"Information of all the stations\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/public/partner/stations", "segments": [{ "lit": "public" }, { "lit": "partner" }, { "lit": "stations" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.stations`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /public/stations", "json": "{\"operationId\":\"getAllStations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Overview of a station to be displayed on map\",\"properties\":{\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"state\":{\"description\":\"Representation of a state.\",\"properties\":{\"id\":{\"description\":\"Technical state id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable state name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"}},\"required\":[\"id\",\"latitude\",\"longitude\",\"state\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"An array of stations\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/public/stations", "segments": [{ "lit": "public" }, { "lit": "stations" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /public/stations/{id}", "json": "{\"operationId\":\"getStationById\",\"parameters\":[{\"description\":\"The station id\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Station with current available vehicles. The id of the state is an enumeration, e.g. {1: active, 2: inactive, ...}\",\"properties\":{\"address\":{\"description\":\"Station address without the city\",\"type\":\"string\"},\"city\":{\"description\":\"City of the station\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Public name of the station\",\"type\":\"string\"},\"network\":{\"description\":\"Representation of a network\",\"properties\":{\"background_img\":{\"description\":\"Background image for app (language specific)\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"logo_img\":{\"description\":\"Logo of the network (language specific)\",\"type\":\"string\"},\"name\":{\"description\":\"Translated network name\",\"type\":\"string\"},\"sponsors\":{\"description\":\"An array of sponsors for this network\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"sponsors\":{\"description\":\"An array of sponsors of this station\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"state\":{\"description\":\"Representation of a state.\",\"properties\":{\"id\":{\"description\":\"Technical state id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable state name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"vehicles\":{\"description\":\"All vehicles that are currently available at this station\",\"items\":{\"description\":\"Representation of a vehicle\",\"properties\":{\"ebike_battery_level\":{\"description\":\"E-Bike battery level in percent. The e-bike battery level is between 0 and 100. If the value is missing it is either not an e-bike or the battery level is unknown.\",\"format\":\"double\",\"maximum\":100,\"minimum\":0,\"type\":\"number\"},\"id\":{\"description\":\"Technical vehicle id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Vehicle number visible to the user\",\"type\":\"string\"},\"type\":{\"description\":\"Representation of a type.\",\"properties\":{\"id\":{\"description\":\"Technical type id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable type name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"}},\"required\":[\"id\",\"name\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"zip\":{\"description\":\"Zip code of the station\",\"type\":\"string\"}},\"required\":[\"id\",\"latitude\",\"longitude\",\"state\",\"name\"],\"type\":\"object\"}}},\"description\":\"Station details\"},\"404\":{\"description\":\"Station not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/public/stations/{id}", "segments": [{ "lit": "public" }, { "lit": "stations" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "station", "name__orig": "station", "Name": "Station", "name_": "station", "name-": "station", "NAME": "STATION", "index$": 0 }, { "active": true, "entity": "station", "key$": "BasicStationFlow", "kind": "basic", "name": "BasicStationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "station_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "station_ref01", "srcdatavar": "station_ref01_data", "suffix": "_dt0" }, "match": { "id": "station01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-station_ref01" } }], "index$": 1 }] }, 'Station');
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