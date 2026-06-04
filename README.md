# PublibikeStations SDK

Look up PubliBike bike-sharing stations across Switzerland with live vehicle and e-bike availability

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About PubliBike Stations API

The [PubliBike](https://www.publibike.ch) Stations API exposes the station network operated by PubliBike AG, the Swiss nationwide bike-sharing system. It is the same data that powers the official PubliBike apps and map.

What you get from the API:

- A list of all public stations with id, name, address, city, postal code, latitude/longitude and capacity.
- Per-station state (health/status), network and sponsor metadata, and a `is_virtual_station` flag in line with the GBFS specification.
- Vehicles currently parked at each station, including a user-visible vehicle number, type, and `ebike_battery_level` (0-100%) when the vehicle is an e-bike.
- A partner endpoint that returns all visible stations together with their current vehicles in a single response.

Operational notes: the API is served over HTTPS at `https://api.publibike.ch/v1` and has CORS enabled. No authentication is documented for the public endpoints. The partner stations endpoint should not be polled more often than every minute.

## Try it

**TypeScript**
```bash
npm install publibike-stations
```

**Python**
```bash
pip install publibike-stations-sdk
```

**PHP**
```bash
composer require voxgig/publibike-stations-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/publibike-stations-sdk/go
```

**Ruby**
```bash
gem install publibike-stations-sdk
```

**Lua**
```bash
luarocks install publibike-stations-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PublibikeStationsSDK } from 'publibike-stations'

const client = new PublibikeStationsSDK({})

// List all stations
const stations = await client.Station().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o publibike-stations-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "publibike-stations": {
      "command": "/abs/path/to/publibike-stations-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Station** | A PubliBike bike-sharing station with location, capacity, state and the vehicles currently parked there; exposed via `GET /public/stations`, `GET /public/stations/{id}` and `GET /public/partner/stations`. | `/public/partner/stations` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from publibikestations_sdk import PublibikeStationsSDK

client = PublibikeStationsSDK({})

# List all stations
stations, err = client.Station(None).list(None, None)

# Load a specific station
station, err = client.Station(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'publibikestations_sdk.php';

$client = new PublibikeStationsSDK([]);

// List all stations
[$stations, $err] = $client->Station(null)->list(null, null);

// Load a specific station
[$station, $err] = $client->Station(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/publibike-stations-sdk/go"

client := sdk.NewPublibikeStationsSDK(map[string]any{})

// List all stations
stations, err := client.Station(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "PublibikeStations_sdk"

client = PublibikeStationsSDK.new({})

# List all stations
stations, err = client.Station(nil).list(nil, nil)

# Load a specific station
station, err = client.Station(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("publibike-stations_sdk")

local client = sdk.new({})

-- List all stations
local stations, err = client:Station(nil):list(nil, nil)

-- Load a specific station
local station, err = client:Station(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PublibikeStationsSDK.test()
const result = await client.Station().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PublibikeStationsSDK.test(None, None)
result, err = client.Station(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PublibikeStationsSDK::test(null, null);
[$result, $err] = $client->Station(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Station(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PublibikeStationsSDK.test(nil, nil)
result, err = client.Station(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Station(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the PubliBike Stations API

- Upstream: [https://www.publibike.ch](https://www.publibike.ch)
- API docs: [https://api.publibike.ch/v1/static/api.html](https://api.publibike.ch/v1/static/api.html)

- No open licence is published; contact PubliBike AG for terms covering redistribution or commercial use.
- Service contact: support@publibike.ch.
- General terms of business: https://www.publibike.ch/en/publibike/agb.
- Documentation recommends polling the partner stations endpoint no more often than once per minute.

---

Generated from the PubliBike Stations API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
