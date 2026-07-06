<?php
declare(strict_types=1);

// Typed models for the PublibikeStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Station entity data model. */
class Station
{
    public ?string $address = null;
    public ?int $capacity = null;
    public ?string $city = null;
    public int $id;
    public ?bool $is_virtual_station = null;
    public float $latitude;
    public float $longitude;
    public string $name;
    public array $network;
    public ?array $sponsor = null;
    public array $state;
    public ?array $vehicle = null;
    public ?string $zip = null;
}

/** Request payload for Station#load. */
class StationLoadMatch
{
    public int $id;
}

/** Request payload for Station#list. */
class StationListMatch
{
    public ?string $address = null;
    public ?int $capacity = null;
    public ?string $city = null;
    public ?int $id = null;
    public ?bool $is_virtual_station = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $network = null;
    public ?array $sponsor = null;
    public ?array $state = null;
    public ?array $vehicle = null;
    public ?string $zip = null;
}

