<?php
declare(strict_types=1);

// PublibikeStations SDK configuration

class PublibikeStationsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PublibikeStations",
                "slug" => "publibike-stations",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.publibike.ch/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "station" => [],
                ],
            ],
            "entity" => [
        'station' => [
          'fields' => [
            [
              'name' => 'address',
              'short' => 'Station address without the city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'capacity',
              'short' => 'The maximum number of bikes a station is able to accommodate.',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'city',
              'short' => 'City of the station',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Technical station id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'is_virtual_station',
              'short' => 'Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'latitude',
              'req' => true,
              'short' => 'Latitude of the station',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'req' => true,
              'short' => 'Longitude of the station',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Public name of the station',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'network',
              'req' => true,
              'short' => 'Representation of a network',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sponsors',
              'short' => 'An array of sponsors of this station',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'state',
              'req' => true,
              'short' => 'Representation of a state.',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'vehicles',
              'short' => 'All vehicles that are currently available at this station',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'zip',
              'short' => 'Zip code of the station',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'station',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/partner/stations',
                  'parts' => [
                    'public',
                    'partner',
                    'stations',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.stations`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/stations',
                  'parts' => [
                    'public',
                    'stations',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/stations/{id}',
                  'parts' => [
                    'public',
                    'stations',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PublibikeStationsFeatures::make_feature($name);
    }
}
