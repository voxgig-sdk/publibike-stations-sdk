"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "station",
        "accessor": "Station",
        "op": "load",
        "method": "GET",
        "path": "/public/stations/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "latitude": 1,
            "longitude": 1,
            "state": {
                "id": 1,
                "name": "x"
            },
            "name": "x",
            "address": "x",
            "zip": "x",
            "city": "x",
            "vehicles": [
                {
                    "id": 1,
                    "name": "x",
                    "ebike_battery_level": 1,
                    "type": {
                        "id": 1,
                        "name": "x"
                    }
                }
            ],
            "network": {
                "id": 1,
                "name": "x",
                "background_img": "x",
                "logo_img": "x",
                "sponsors": [
                    {
                        "id": 1,
                        "name": "x",
                        "image": "x",
                        "url": "x"
                    }
                ]
            },
            "sponsors": [
                {
                    "id": 1,
                    "name": "x",
                    "image": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map