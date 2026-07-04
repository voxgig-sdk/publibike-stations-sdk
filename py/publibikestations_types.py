# Typed models for the PublibikeStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Station:
    id: int
    latitude: float
    longitude: float
    name: str
    network: dict
    state: dict
    address: Optional[str] = None
    capacity: Optional[int] = None
    city: Optional[str] = None
    is_virtual_station: Optional[bool] = None
    sponsor: Optional[list] = None
    vehicle: Optional[list] = None
    zip: Optional[str] = None


@dataclass
class StationLoadMatch:
    id: int


@dataclass
class StationListMatch:
    address: Optional[str] = None
    capacity: Optional[int] = None
    city: Optional[str] = None
    id: Optional[int] = None
    is_virtual_station: Optional[bool] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    network: Optional[dict] = None
    sponsor: Optional[list] = None
    state: Optional[dict] = None
    vehicle: Optional[list] = None
    zip: Optional[str] = None

