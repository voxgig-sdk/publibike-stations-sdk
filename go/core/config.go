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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Address",
						"type": "`$STRING`",
						"short": "Station address without the city",
					},
					map[string]any{
						"name": "capacity",
						"title": "Capacity",
						"type": "`$INTEGER`",
						"short": "The maximum number of bikes a station is able to accommodate.",
						"format": "int32",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"short": "City of the station",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Technical station id",
						"format": "int32",
					},
					map[string]any{
						"name": "is_virtual_station",
						"title": "Is Virtual Station",
						"type": "`$BOOLEAN`",
						"short": "Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Latitude of the station",
						"format": "double",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Longitude of the station",
						"format": "double",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Public name of the station",
					},
					map[string]any{
						"name": "network",
						"title": "Network",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Representation of a network",
					},
					map[string]any{
						"name": "sponsors",
						"title": "Sponsors",
						"type": "`$ARRAY`",
						"short": "An array of sponsors of this station",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Representation of a state.",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"short": "All vehicles that are currently available at this station",
					},
					map[string]any{
						"name": "zip",
						"title": "Zip",
						"type": "`$STRING`",
						"short": "Zip code of the station",
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
								"parts": []any{
									"public",
									"partner",
									"stations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.stations`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"public",
									"stations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"public",
									"stations",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
