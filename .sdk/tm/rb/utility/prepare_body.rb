# PublibikeStations SDK utility: prepare_body
require_relative 'media'
module PublibikeStationsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PublibikeStationsUtilities.raw_body(ctx.reqdata) if PublibikeStationsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
