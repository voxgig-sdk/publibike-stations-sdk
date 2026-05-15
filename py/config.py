# PublibikeStations SDK configuration


def make_config():
    return {
        "main": {
            "name": "PublibikeStations",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.publibike.ch/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "station": {},
            },
        },
        "entity": {
      "station": {
        "fields": [
          {
            "name": "address",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "capacity",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "city",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "is_virtual_station",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "network",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "sponsor",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "state",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "vehicle",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "zip",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 12,
          },
        ],
        "name": "station",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/public/partner/stations",
                "parts": [
                  "public",
                  "partner",
                  "stations",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
              {
                "method": "GET",
                "orig": "/public/stations",
                "parts": [
                  "public",
                  "stations",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/stations/{id}",
                "parts": [
                  "public",
                  "stations",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
