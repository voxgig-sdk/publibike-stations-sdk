package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PublibikeStations",
			"slug": "publibike-stations",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.publibike.ch/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"station": map[string]any{},
			},
		},
		"entity": map[string]any{
			"station": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"short": "Station address without the city",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "capacity",
						"short": "The maximum number of bikes a station is able to accommodate.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "city",
						"short": "City of the station",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "id",
						"req": true,
						"short": "Technical station id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "is_virtual_station",
						"short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "double",
						"name": "latitude",
						"req": true,
						"short": "Latitude of the station",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
						"name": "longitude",
						"req": true,
						"short": "Longitude of the station",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Public name of the station",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "network",
						"req": true,
						"short": "Representation of a network",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sponsors",
						"short": "An array of sponsors of this station",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "state",
						"req": true,
						"short": "Representation of a state.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "vehicles",
						"short": "All vehicles that are currently available at this station",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "zip",
						"short": "Zip code of the station",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "station",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/public/partner/stations",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "partner",
									},
									map[string]any{
										"lit": "stations",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.stations`",
								},
								"parts": []any{
									"public",
									"partner",
									"stations",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/public/stations",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "stations",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"public",
									"stations",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/stations/{id}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "stations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"public",
									"stations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
