<?php
declare(strict_types=1);

// Station entity test

require_once __DIR__ . '/../publibikestations_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class StationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PublibikeStationsSDK::test(null, null);
        $ent = $testsdk->Station(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = station_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "station." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PUBLIBIKESTATIONS_TEST_STATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $station_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.station")));
        $station_ref01_data = null;
        if (count($station_ref01_data_raw) > 0) {
            $station_ref01_data = Helpers::to_map($station_ref01_data_raw[0][1]);
        }

        // LIST
        $station_ref01_ent = $client->Station(null);
        $station_ref01_match = [];

        [$station_ref01_list_result, $err] = $station_ref01_ent->list($station_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($station_ref01_list_result);

        // LOAD
        $station_ref01_match_dt0 = [
            "id" => $station_ref01_data["id"],
        ];
        [$station_ref01_data_dt0_loaded, $err] = $station_ref01_ent->load($station_ref01_match_dt0, null);
        $this->assertNull($err);
        $station_ref01_data_dt0_load_result = Helpers::to_map($station_ref01_data_dt0_loaded);
        $this->assertNotNull($station_ref01_data_dt0_load_result);
        $this->assertEquals($station_ref01_data_dt0_load_result["id"], $station_ref01_data["id"]);

    }
}

function station_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/station/StationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PublibikeStationsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["station01", "station02", "station03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PUBLIBIKESTATIONS_TEST_STATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PUBLIBIKESTATIONS_TEST_STATION_ENTID" => $idmap,
        "PUBLIBIKESTATIONS_TEST_LIVE" => "FALSE",
        "PUBLIBIKESTATIONS_TEST_EXPLAIN" => "FALSE",
        "PUBLIBIKESTATIONS_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PUBLIBIKESTATIONS_TEST_STATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PUBLIBIKESTATIONS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["PUBLIBIKESTATIONS_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new PublibikeStationsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PUBLIBIKESTATIONS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PUBLIBIKESTATIONS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
