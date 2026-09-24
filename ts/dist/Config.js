"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'PublibikeStations',
        slug: "publibike-stations",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.publibike.ch/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            station: {},
        }
    };
    entity = {
        "station": {
            "fields": [
                {
                    "name": "address",
                    "title": "Address",
                    "type": "`$STRING`",
                    "short": "Station address without the city"
                },
                {
                    "name": "capacity",
                    "title": "Capacity",
                    "type": "`$INTEGER`",
                    "short": "The maximum number of bikes a station is able to accommodate.",
                    "format": "int32"
                },
                {
                    "name": "city",
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "City of the station"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Technical station id",
                    "format": "int32"
                },
                {
                    "name": "is_virtual_station",
                    "title": "Is Virtual Station",
                    "type": "`$BOOLEAN`",
                    "short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…"
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Latitude of the station",
                    "format": "double"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Longitude of the station",
                    "format": "double"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Public name of the station"
                },
                {
                    "name": "network",
                    "title": "Network",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Representation of a network"
                },
                {
                    "name": "sponsors",
                    "title": "Sponsors",
                    "type": "`$ARRAY`",
                    "short": "An array of sponsors of this station"
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Representation of a state."
                },
                {
                    "name": "vehicles",
                    "title": "Vehicles",
                    "type": "`$ARRAY`",
                    "short": "All vehicles that are currently available at this station"
                },
                {
                    "name": "zip",
                    "title": "Zip",
                    "type": "`$STRING`",
                    "short": "Zip code of the station"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "station",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/public/partner/stations",
                            "segments": [
                                {
                                    "lit": "public"
                                },
                                {
                                    "lit": "partner"
                                },
                                {
                                    "lit": "stations"
                                }
                            ],
                            "parts": [
                                "public",
                                "partner",
                                "stations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.stations`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/public/stations",
                            "segments": [
                                {
                                    "lit": "public"
                                },
                                {
                                    "lit": "stations"
                                }
                            ],
                            "parts": [
                                "public",
                                "stations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/public/stations/{id}",
                            "segments": [
                                {
                                    "lit": "public"
                                },
                                {
                                    "lit": "stations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "public",
                                "stations",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map