<?php
declare(strict_types=1);

// PublibikeStations SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PublibikeStationsMakeContext
{
    public static function call(array $ctxmap, ?PublibikeStationsContext $basectx): PublibikeStationsContext
    {
        return new PublibikeStationsContext($ctxmap, $basectx);
    }
}
