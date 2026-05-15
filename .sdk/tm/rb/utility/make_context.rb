# PublibikeStations SDK utility: make_context
require_relative '../core/context'
module PublibikeStationsUtilities
  MakeContext = ->(ctxmap, basectx) {
    PublibikeStationsContext.new(ctxmap, basectx)
  }
end
