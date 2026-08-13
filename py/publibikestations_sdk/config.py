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
            "active": True,
            "name": "address",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "capacity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "city",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "is_virtual_station",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "network",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "sponsors",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "state",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "vehicles",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "zip",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
        ],
        "name": "station",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/public/partner/stations",
                "parts": [
                  "public",
                  "partner",
                  "stations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.stations`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/public/stations",
                "parts": [
                  "public",
                  "stations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
