# frozen_string_literal: true

# Typed models for the PublibikeStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Station entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] capacity
#   @return [Integer, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] is_virtual_station
#   @return [Boolean, nil]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network
#   @return [Hash]
#
# @!attribute [rw] sponsor
#   @return [Array, nil]
#
# @!attribute [rw] state
#   @return [Hash]
#
# @!attribute [rw] vehicle
#   @return [Array, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
Station = Struct.new(
  :address,
  :capacity,
  :city,
  :id,
  :is_virtual_station,
  :latitude,
  :longitude,
  :name,
  :network,
  :sponsor,
  :state,
  :vehicle,
  :zip,
  keyword_init: true
)

# Request payload for Station#load.
#
# @!attribute [rw] id
#   @return [Integer]
StationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Station#list.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] capacity
#   @return [Integer, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] is_virtual_station
#   @return [Boolean, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] network
#   @return [Hash, nil]
#
# @!attribute [rw] sponsor
#   @return [Array, nil]
#
# @!attribute [rw] state
#   @return [Hash, nil]
#
# @!attribute [rw] vehicle
#   @return [Array, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
StationListMatch = Struct.new(
  :address,
  :capacity,
  :city,
  :id,
  :is_virtual_station,
  :latitude,
  :longitude,
  :name,
  :network,
  :sponsor,
  :state,
  :vehicle,
  :zip,
  keyword_init: true
)

