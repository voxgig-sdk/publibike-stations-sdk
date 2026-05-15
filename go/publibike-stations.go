package voxgigpublibikestationssdk

import (
	"github.com/voxgig-sdk/publibike-stations-sdk/core"
	"github.com/voxgig-sdk/publibike-stations-sdk/entity"
	"github.com/voxgig-sdk/publibike-stations-sdk/feature"
	_ "github.com/voxgig-sdk/publibike-stations-sdk/utility"
)

// Type aliases preserve external API.
type PublibikeStationsSDK = core.PublibikeStationsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PublibikeStationsEntity = core.PublibikeStationsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PublibikeStationsError = core.PublibikeStationsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewStationEntityFunc = func(client *core.PublibikeStationsSDK, entopts map[string]any) core.PublibikeStationsEntity {
		return entity.NewStationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPublibikeStationsSDK = core.NewPublibikeStationsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
