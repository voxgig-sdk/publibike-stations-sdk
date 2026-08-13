# PublibikeStations SDK feature factory

from publibikestations_sdk.feature.base_feature import PublibikeStationsBaseFeature
from publibikestations_sdk.feature.test_feature import PublibikeStationsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PublibikeStationsBaseFeature(),
        "test": lambda: PublibikeStationsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
