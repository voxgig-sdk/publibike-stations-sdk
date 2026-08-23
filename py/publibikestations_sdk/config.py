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
            "slug": "publibike-stations",
            "version": "0.0.1",
            "target": "py",
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
            "short": "Station address without the city",
            "type": "`$STRING`",
          },
          {
            "name": "capacity",
            "short": "The maximum number of bikes a station is able to accommodate.",
            "type": "`$INTEGER`",
          },
          {
            "name": "city",
            "short": "City of the station",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Technical station id",
            "type": "`$INTEGER`",
          },
          {
            "name": "is_virtual_station",
            "short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "latitude",
            "req": True,
            "short": "Latitude of the station",
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "req": True,
            "short": "Longitude of the station",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Public name of the station",
            "type": "`$STRING`",
          },
          {
            "name": "network",
            "req": True,
            "short": "Representation of a network",
            "type": "`$OBJECT`",
          },
          {
            "name": "sponsors",
            "short": "An array of sponsors of this station",
            "type": "`$ARRAY`",
          },
          {
            "name": "state",
            "req": True,
            "short": "Representation of a state.",
            "type": "`$OBJECT`",
          },
          {
            "name": "vehicles",
            "short": "All vehicles that are currently available at this station",
            "type": "`$ARRAY`",
          },
          {
            "name": "zip",
            "short": "Zip code of the station",
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
