# PublibikeStations SDK exists test

require "minitest/autorun"
require_relative "../PublibikeStations_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PublibikeStationsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
