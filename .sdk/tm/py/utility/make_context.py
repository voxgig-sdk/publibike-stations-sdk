# PublibikeStations SDK utility: make_context

from core.context import PublibikeStationsContext


def make_context_util(ctxmap, basectx):
    return PublibikeStationsContext(ctxmap, basectx)
