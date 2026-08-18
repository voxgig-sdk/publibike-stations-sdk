# PublibikeStations SDK configuration

module PublibikeStationsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "PublibikeStations",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.publibike.ch/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "station" => {},
        },
      },
      "entity" => {
        "station" => {
          "fields" => [
            {
              "name" => "address",
              "type" => "`$STRING`",
            },
            {
              "name" => "capacity",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "is_virtual_station",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "latitude",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "network",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sponsors",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "state",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "vehicles",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "zip",
              "type" => "`$STRING`",
            },
          ],
          "name" => "station",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/partner/stations",
                  "parts" => [
                    "public",
                    "partner",
                    "stations",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.stations`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/stations",
                  "parts" => [
                    "public",
                    "stations",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/stations/{id}",
                  "parts" => [
                    "public",
                    "stations",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PublibikeStationsFeatures.make_feature(name)
  end
end
