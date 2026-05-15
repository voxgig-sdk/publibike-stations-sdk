<?php
declare(strict_types=1);

// PublibikeStations SDK utility: prepare_body

class PublibikeStationsPrepareBody
{
    public static function call(PublibikeStationsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
