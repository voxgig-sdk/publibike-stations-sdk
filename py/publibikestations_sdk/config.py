# PublibikeStations SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Address",
            "type": "`$STRING`",
            "short": "Station address without the city",
          },
          {
            "name": "capacity",
            "title": "Capacity",
            "type": "`$INTEGER`",
            "short": "The maximum number of bikes a station is able to accommodate.",
            "format": "int32",
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "short": "City of the station",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Technical station id",
            "format": "int32",
          },
          {
            "name": "is_virtual_station",
            "title": "Is Virtual Station",
            "type": "`$BOOLEAN`",
            "short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…",
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Latitude of the station",
            "format": "double",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Longitude of the station",
            "format": "double",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Public name of the station",
          },
          {
            "name": "network",
            "title": "Network",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Representation of a network",
          },
          {
            "name": "sponsors",
            "title": "Sponsors",
            "type": "`$ARRAY`",
            "short": "An array of sponsors of this station",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Representation of a state.",
          },
          {
            "name": "vehicles",
            "title": "Vehicles",
            "type": "`$ARRAY`",
            "short": "All vehicles that are currently available at this station",
          },
          {
            "name": "zip",
            "title": "Zip",
            "type": "`$STRING`",
            "short": "Zip code of the station",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "public",
                  },
                  {
                    "lit": "partner",
                  },
                  {
                    "lit": "stations",
                  },
                ],
                "parts": [
                  "public",
                  "partner",
                  "stations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.stations`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/public/stations",
                "segments": [
                  {
                    "lit": "public",
                  },
                  {
                    "lit": "stations",
                  },
                ],
                "parts": [
                  "public",
                  "stations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "public",
                  },
                  {
                    "lit": "stations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "public",
                  "stations",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
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
