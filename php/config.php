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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'capacity',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'is_virtual_station',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'latitude',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'network',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sponsors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'state',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'vehicles',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'zip',
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
