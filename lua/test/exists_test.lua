-- ProjectName SDK exists test

local sdk = require("publibike-stations_sdk")

describe("PublibikeStationsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
