<?php
declare(strict_types=1);

// PublibikeStations SDK configuration

class PublibikeStationsConfig
{
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
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'capacity',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'city',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'is_virtual_station',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'latitude',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'longitude',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 7,
            ],
            [
              'name' => 'network',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 8,
            ],
            [
              'name' => 'sponsor',
              'req' => false,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 9,
            ],
            [
              'name' => 'state',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 10,
            ],
            [
              'name' => 'vehicle',
              'req' => false,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 11,
            ],
            [
              'name' => 'zip',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 12,
            ],
          ],
          'name' => 'station',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/public/partner/stations',
                  'parts' => [
                    'public',
                    'partner',
                    'stations',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/public/stations',
                  'parts' => [
                    'public',
                    'stations',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
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
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
