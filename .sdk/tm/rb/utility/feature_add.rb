# PublibikeStations SDK utility: feature_add
module PublibikeStationsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
