
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'PublibikeStations',
        slug: "publibike-stations",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://api.publibike.ch/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        station: {
        },
  
    }
  }


  entity = {
    "station": {
      "fields": [
        {
          "name": "address",
          "short": "Station address without the city",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "capacity",
          "short": "The maximum number of bikes a station is able to accommodate.",
          "type": "`$INTEGER`"
        },
        {
          "name": "city",
          "short": "City of the station",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "id",
          "req": true,
          "short": "Technical station id",
          "type": "`$INTEGER`"
        },
        {
          "name": "is_virtual_station",
          "short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…",
          "type": "`$BOOLEAN`"
        },
        {
          "format": "double",
          "name": "latitude",
          "req": true,
          "short": "Latitude of the station",
          "type": "`$NUMBER`"
        },
        {
          "format": "double",
          "name": "longitude",
          "req": true,
          "short": "Longitude of the station",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Public name of the station",
          "type": "`$STRING`"
        },
        {
          "name": "network",
          "req": true,
          "short": "Representation of a network",
          "type": "`$OBJECT`"
        },
        {
          "name": "sponsors",
          "short": "An array of sponsors of this station",
          "type": "`$ARRAY`"
        },
        {
          "name": "state",
          "req": true,
          "short": "Representation of a state.",
          "type": "`$OBJECT`"
        },
        {
          "name": "vehicles",
          "short": "All vehicles that are currently available at this station",
          "type": "`$ARRAY`"
        },
        {
          "name": "zip",
          "short": "Zip code of the station",
          "type": "`$STRING`"
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
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.stations`"
              },
              "parts": [
                "public",
                "partner",
                "stations"
              ]
            },
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "public",
                "stations"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "public",
                "stations",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

