<?php
declare(strict_types=1);

// PublibikeStations SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PublibikeStationsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PublibikeStationsBaseFeature();
            case "test":
                return new PublibikeStationsTestFeature();
            default:
                return new PublibikeStationsBaseFeature();
        }
    }
}
