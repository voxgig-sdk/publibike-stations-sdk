# PublibikeStations SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PublibikeStationsFeatures
  def self.make_feature(name)
    case name
    when "base"
      PublibikeStationsBaseFeature.new
    when "test"
      PublibikeStationsTestFeature.new
    else
      PublibikeStationsBaseFeature.new
    end
  end
end
