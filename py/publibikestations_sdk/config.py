# PublibikeStations SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "city",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "is_virtual_station",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "network",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "sponsors",
            "type": "`$ARRAY`",
          },
          {
            "name": "state",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "vehicles",
            "type": "`$ARRAY`",
          },
          {
            "name": "zip",
            "type": "`$STRING`",
          },
        ],
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
              },
              {
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
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
