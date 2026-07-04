-- ProjectName SDK configuration

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
            ["active"] = true,
            ["name"] = "address",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "capacity",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "city",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "is_virtual_station",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "latitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "longitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "network",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "sponsor",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "state",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "vehicle",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "zip",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
        },
        ["name"] = "station",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
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
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {},
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
                ["index$"] = 1,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                      ["index$"] = 0,
                    },
                  },
                },
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
