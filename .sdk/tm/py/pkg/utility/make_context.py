# PublibikeStations SDK utility: make_context

from projectname_sdk.core.context import PublibikeStationsContext


def make_context_util(ctxmap, basectx):
    return PublibikeStationsContext(ctxmap, basectx)
