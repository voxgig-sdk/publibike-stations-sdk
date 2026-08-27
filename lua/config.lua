-- PublibikeStations SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "PublibikeStations",
      slug = "publibike-stations",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.publibike.ch/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["station"] = {},
      },
    },
    entity = {
      ["station"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["short"] = "Station address without the city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "capacity",
            ["short"] = "The maximum number of bikes a station is able to accommodate.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "city",
            ["short"] = "City of the station",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Technical station id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "is_virtual_station",
            ["short"] = "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "latitude",
            ["req"] = true,
            ["short"] = "Latitude of the station",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["req"] = true,
            ["short"] = "Longitude of the station",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Public name of the station",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "network",
            ["req"] = true,
            ["short"] = "Representation of a network",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sponsors",
            ["short"] = "An array of sponsors of this station",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "state",
            ["req"] = true,
            ["short"] = "Representation of a state.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "vehicles",
            ["short"] = "All vehicles that are currently available at this station",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "zip",
            ["short"] = "Zip code of the station",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "station",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/partner/stations",
                ["parts"] = {
                  "public",
                  "partner",
                  "stations",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.stations`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/stations",
                ["parts"] = {
                  "public",
                  "stations",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/stations/{id}",
                ["parts"] = {
                  "public",
                  "stations",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
