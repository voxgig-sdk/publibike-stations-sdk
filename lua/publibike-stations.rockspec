package = "voxgig-sdk-publibike-stations"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/publibike-stations-sdk.git",
  tag = "lua/v0.0.1",
  dir = "publibike-stations-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the PubliBike Stations public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/publibike-stations-sdk",
  issues_url = "https://github.com/voxgig-sdk/publibike-stations-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "publibike-stations" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["publibike-stations_sdk"] = "publibike-stations_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
