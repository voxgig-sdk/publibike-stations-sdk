<?php
declare(strict_types=1);

// PublibikeStations SDK base feature

class PublibikeStationsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PublibikeStationsContext $ctx, array $options): void {}
    public function PostConstruct(PublibikeStationsContext $ctx): void {}
    public function PostConstructEntity(PublibikeStationsContext $ctx): void {}
    public function SetData(PublibikeStationsContext $ctx): void {}
    public function GetData(PublibikeStationsContext $ctx): void {}
    public function GetMatch(PublibikeStationsContext $ctx): void {}
    public function SetMatch(PublibikeStationsContext $ctx): void {}
    public function PrePoint(PublibikeStationsContext $ctx): void {}
    public function PreSpec(PublibikeStationsContext $ctx): void {}
    public function PreRequest(PublibikeStationsContext $ctx): void {}
    public function PreResponse(PublibikeStationsContext $ctx): void {}
    public function PreResult(PublibikeStationsContext $ctx): void {}
    public function PreDone(PublibikeStationsContext $ctx): void {}
    public function PreUnexpected(PublibikeStationsContext $ctx): void {}
}
