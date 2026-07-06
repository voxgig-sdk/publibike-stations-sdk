// Typed models for the PublibikeStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Station {
  address?: string
  capacity?: number
  city?: string
  id: number
  is_virtual_station?: boolean
  latitude: number
  longitude: number
  name: string
  network: Record<string, any>
  sponsor?: any[]
  state: Record<string, any>
  vehicle?: any[]
  zip?: string
}

export interface StationLoadMatch {
  id: number
}

export interface StationListMatch {
  address?: string
  capacity?: number
  city?: string
  id?: number
  is_virtual_station?: boolean
  latitude?: number
  longitude?: number
  name?: string
  network?: Record<string, any>
  sponsor?: any[]
  state?: Record<string, any>
  vehicle?: any[]
  zip?: string
}

