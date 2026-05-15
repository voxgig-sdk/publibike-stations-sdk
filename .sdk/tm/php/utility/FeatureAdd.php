<?php
declare(strict_types=1);

// PublibikeStations SDK utility: feature_add

class PublibikeStationsFeatureAdd
{
    public static function call(PublibikeStationsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
