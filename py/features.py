# PublibikeStations SDK feature factory

from feature.base_feature import PublibikeStationsBaseFeature
from feature.test_feature import PublibikeStationsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PublibikeStationsBaseFeature(),
        "test": lambda: PublibikeStationsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
