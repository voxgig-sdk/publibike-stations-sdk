import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
