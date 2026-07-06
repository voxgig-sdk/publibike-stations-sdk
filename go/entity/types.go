// Typed models for the PublibikeStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Station is the typed data model for the station entity.
type Station struct {
	Address *string `json:"address,omitempty"`
	Capacity *int `json:"capacity,omitempty"`
	City *string `json:"city,omitempty"`
	Id int `json:"id"`
	IsVirtualStation *bool `json:"is_virtual_station,omitempty"`
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Name string `json:"name"`
	Network map[string]any `json:"network"`
	Sponsor *[]any `json:"sponsor,omitempty"`
	State map[string]any `json:"state"`
	Vehicle *[]any `json:"vehicle,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// StationLoadMatch is the typed request payload for Station.LoadTyped.
type StationLoadMatch struct {
	Id int `json:"id"`
}

// StationListMatch is the typed request payload for Station.ListTyped.
type StationListMatch struct {
	Address *string `json:"address,omitempty"`
	Capacity *int `json:"capacity,omitempty"`
	City *string `json:"city,omitempty"`
	Id *int `json:"id,omitempty"`
	IsVirtualStation *bool `json:"is_virtual_station,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Network *map[string]any `json:"network,omitempty"`
	Sponsor *[]any `json:"sponsor,omitempty"`
	State *map[string]any `json:"state,omitempty"`
	Vehicle *[]any `json:"vehicle,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
