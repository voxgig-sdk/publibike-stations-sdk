package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/publibike-stations-sdk"
	"github.com/voxgig-sdk/publibike-stations-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestStationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Station(nil)
		if ent == nil {
			t.Fatal("expected non-nil StationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := stationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "station." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PUBLIBIKESTATIONS_TEST_STATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		stationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.station", setup.data)))
		var stationRef01Data map[string]any
		if len(stationRef01DataRaw) > 0 {
			stationRef01Data = core.ToMapAny(stationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = stationRef01Data

		// LIST
		stationRef01Ent := client.Station(nil)
		stationRef01Match := map[string]any{}

		stationRef01ListResult, err := stationRef01Ent.List(stationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, stationRef01ListOk := stationRef01ListResult.([]any)
		if !stationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", stationRef01ListResult)
		}

		// LOAD
		stationRef01MatchDt0 := map[string]any{
			"id": stationRef01Data["id"],
		}
		stationRef01DataDt0Loaded, err := stationRef01Ent.Load(stationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		stationRef01DataDt0LoadResult := core.ToMapAny(stationRef01DataDt0Loaded)
		if stationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if stationRef01DataDt0LoadResult["id"] != stationRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func stationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "station", "StationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read station test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse station test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"station01", "station02", "station03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PUBLIBIKESTATIONS_TEST_STATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PUBLIBIKESTATIONS_TEST_STATION_ENTID": idmap,
		"PUBLIBIKESTATIONS_TEST_LIVE":      "FALSE",
		"PUBLIBIKESTATIONS_TEST_EXPLAIN":   "FALSE",
		"PUBLIBIKESTATIONS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PUBLIBIKESTATIONS_TEST_STATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PUBLIBIKESTATIONS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PUBLIBIKESTATIONS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPublibikeStationsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["PUBLIBIKESTATIONS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PUBLIBIKESTATIONS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
