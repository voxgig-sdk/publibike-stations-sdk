-- PublibikeStations SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "PublibikeStations",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "capacity",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "is_virtual_station",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "latitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "network",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sponsors",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "state",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "vehicles",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "zip",
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
