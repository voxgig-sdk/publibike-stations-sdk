# PublibikeStations SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PublibikeStationsFeatures
  def self.make_feature(name)
    case name
    when "base"
      PublibikeStationsBaseFeature.new
    when "ratelimit"
      PublibikeStationsRatelimitFeature.new
    when "retry"
      PublibikeStationsRetryFeature.new
    when "test"
      PublibikeStationsTestFeature.new
    when "timeout"
      PublibikeStationsTimeoutFeature.new
    else
      PublibikeStationsBaseFeature.new
    end
  end
end
