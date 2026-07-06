-- Typed models for the PublibikeStations SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Station
---@field address? string
---@field capacity? number
---@field city? string
---@field id number
---@field is_virtual_station? boolean
---@field latitude number
---@field longitude number
---@field name string
---@field network table
---@field sponsor? table
---@field state table
---@field vehicle? table
---@field zip? string

---@class StationLoadMatch
---@field id number

---@class StationListMatch
---@field address? string
---@field capacity? number
---@field city? string
---@field id? number
---@field is_virtual_station? boolean
---@field latitude? number
---@field longitude? number
---@field name? string
---@field network? table
---@field sponsor? table
---@field state? table
---@field vehicle? table
---@field zip? string

local M = {}

return M
