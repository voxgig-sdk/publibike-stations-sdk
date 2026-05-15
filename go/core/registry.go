package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewStationEntityFunc func(client *PublibikeStationsSDK, entopts map[string]any) PublibikeStationsEntity

