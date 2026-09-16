

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PublibikeStationsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PUBLIBIKE_STATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('PUBLIBIKE_STATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PublibikeStationsSDK.test()
    const ent = testsdk.Station()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIBIKE_STATIONS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'station.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"address","req":false,"short":"Station address without the city","type":"`$STRING`","index$":0},{"active":true,"format":"int32","name":"capacity","req":false,"short":"The maximum number of bikes a station is able to accommodate.","type":"`$INTEGER`","index$":1},{"active":true,"name":"city","req":false,"short":"City of the station","type":"`$STRING`","index$":2},{"active":true,"format":"int32","name":"id","req":true,"short":"Technical station id","type":"`$INTEGER`","index$":3},{"active":true,"name":"is_virtual_station","req":false,"short":"Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…","type":"`$BOOLEAN`","index$":4},{"active":true,"format":"double","name":"latitude","req":true,"short":"Latitude of the station","type":"`$NUMBER`","index$":5},{"active":true,"format":"double","name":"longitude","req":true,"short":"Longitude of the station","type":"`$NUMBER`","index$":6},{"active":true,"name":"name","req":true,"short":"Public name of the station","type":"`$STRING`","index$":7},{"active":true,"name":"network","req":true,"short":"Representation of a network","type":"`$OBJECT`","index$":8},{"active":true,"name":"sponsors","req":false,"short":"An array of sponsors of this station","type":"`$ARRAY`","index$":9},{"active":true,"name":"state","req":true,"short":"Representation of a state.","type":"`$OBJECT`","index$":10},{"active":true,"name":"vehicles","req":false,"short":"All vehicles that are currently available at this station","type":"`$ARRAY`","index$":11},{"active":true,"name":"zip","req":false,"short":"Zip code of the station","type":"`$STRING`","index$":12}],"id":{"field":"id","name":"id"},"name":"station","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /public/partner/stations","json":"{\"operationId\":\"getAllStationsForPartners\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Container for stations and their vehicles.\",\"properties\":{\"stations\":{\"items\":{\"description\":\"Overview of a single station and it's vehicles\",\"properties\":{\"address\":{\"description\":\"Station address without the city\",\"type\":\"string\"},\"capacity\":{\"description\":\"The maximum number of bikes a station is able to accommodate. This is not a hard limit but can be used for displaying purposes.\",\"format\":\"int32\",\"type\":\"integer\"},\"city\":{\"description\":\"City of the station\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"is_virtual_station\":{\"description\":\"Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastructure (docks) but is defined e.g. via geolocation\",\"type\":\"boolean\"},\"latitude\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Public name of the station\",\"type\":\"string\"},\"network\":{\"description\":\"Representation of a network\",\"properties\":{\"background_img\":{\"description\":\"Background image for app (language specific)\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"logo_img\":{\"description\":\"Logo of the network (language specific)\",\"type\":\"string\"},\"name\":{\"description\":\"Translated network name\",\"type\":\"string\"},\"sponsors\":{\"description\":\"An array of sponsors for this network\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"sponsors\":{\"description\":\"An array of sponsors of this station\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"state\":{\"description\":\"Representation of a state.\",\"properties\":{\"id\":{\"description\":\"Technical state id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable state name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"vehicles\":{\"description\":\"All vehicles that are currently available at this station\",\"items\":{\"description\":\"Representation of a vehicle\",\"properties\":{\"ebike_battery_level\":{\"description\":\"E-Bike battery level in percent. The e-bike battery level is between 0 and 100. If the value is missing it is either not an e-bike or the battery level is unknown.\",\"format\":\"double\",\"maximum\":100,\"minimum\":0,\"type\":\"number\"},\"id\":{\"description\":\"Technical vehicle id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Vehicle number visible to the user\",\"type\":\"string\"},\"type\":{\"description\":\"Representation of a type.\",\"properties\":{\"id\":{\"description\":\"Technical type id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable type name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"}},\"required\":[\"id\",\"name\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"zip\":{\"description\":\"Zip code of the station\",\"type\":\"string\"}},\"required\":[\"id\",\"latitude\",\"longitude\",\"state\",\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"stations\"],\"type\":\"object\"}}},\"description\":\"Information of all the stations\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/partner/stations","segments":[{"lit":"public"},{"lit":"partner"},{"lit":"stations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.stations`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /public/stations","json":"{\"operationId\":\"getAllStations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Overview of a station to be displayed on map\",\"properties\":{\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"state\":{\"description\":\"Representation of a state.\",\"properties\":{\"id\":{\"description\":\"Technical state id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable state name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"}},\"required\":[\"id\",\"latitude\",\"longitude\",\"state\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"An array of stations\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/stations","segments":[{"lit":"public"},{"lit":"stations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /public/stations/{id}","json":"{\"operationId\":\"getStationById\",\"parameters\":[{\"description\":\"The station id\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Station with current available vehicles. The id of the state is an enumeration, e.g. {1: active, 2: inactive, ...}\",\"properties\":{\"address\":{\"description\":\"Station address without the city\",\"type\":\"string\"},\"city\":{\"description\":\"City of the station\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Public name of the station\",\"type\":\"string\"},\"network\":{\"description\":\"Representation of a network\",\"properties\":{\"background_img\":{\"description\":\"Background image for app (language specific)\",\"type\":\"string\"},\"id\":{\"description\":\"Technical station id\",\"format\":\"int32\",\"type\":\"integer\"},\"logo_img\":{\"description\":\"Logo of the network (language specific)\",\"type\":\"string\"},\"name\":{\"description\":\"Translated network name\",\"type\":\"string\"},\"sponsors\":{\"description\":\"An array of sponsors for this network\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"sponsors\":{\"description\":\"An array of sponsors of this station\",\"items\":{\"description\":\"Represents a sponsor item containing an image and link (translated).\",\"properties\":{\"id\":{\"description\":\"Technical sponsor id.\",\"format\":\"int32\",\"type\":\"integer\"},\"image\":{\"description\":\"Logo of the sponsor.\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the sponsor.\",\"type\":\"string\"},\"url\":{\"description\":\"URL to sponsor website.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"state\":{\"description\":\"Representation of a state.\",\"properties\":{\"id\":{\"description\":\"Technical state id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable state name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"vehicles\":{\"description\":\"All vehicles that are currently available at this station\",\"items\":{\"description\":\"Representation of a vehicle\",\"properties\":{\"ebike_battery_level\":{\"description\":\"E-Bike battery level in percent. The e-bike battery level is between 0 and 100. If the value is missing it is either not an e-bike or the battery level is unknown.\",\"format\":\"double\",\"maximum\":100,\"minimum\":0,\"type\":\"number\"},\"id\":{\"description\":\"Technical vehicle id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Vehicle number visible to the user\",\"type\":\"string\"},\"type\":{\"description\":\"Representation of a type.\",\"properties\":{\"id\":{\"description\":\"Technical type id\",\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"description\":\"Translated human-readable type name\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"}},\"required\":[\"id\",\"name\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"zip\":{\"description\":\"Zip code of the station\",\"type\":\"string\"}},\"required\":[\"id\",\"latitude\",\"longitude\",\"state\",\"name\"],\"type\":\"object\"}}},\"description\":\"Station details\"},\"404\":{\"description\":\"Station not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/stations/{id}","segments":[{"lit":"public"},{"lit":"stations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"station","name__orig":"station","Name":"Station","name_":"station","name-":"station","NAME":"STATION","index$":0}, {"active":true,"entity":"station","key$":"BasicStationFlow","kind":"basic","name":"BasicStationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"station_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"station_ref01","srcdatavar":"station_ref01_data","suffix":"_dt0"},"match":{"id":"station01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-station_ref01"}}],"index$":1}]}, 'Station')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let station_ref01_data = Object.values(setup.data.existing.station)[0] as any

    // LIST
    const station_ref01_ent = client.Station()
    const station_ref01_match: any = {}

    const station_ref01_list = (await station_ref01_ent.list(station_ref01_match)).map((e: any) => e.data())


    // LOAD
    const station_ref01_match_dt0: any = {}
    station_ref01_match_dt0.id = station_ref01_data.id
    const station_ref01_data_dt0 = (await station_ref01_ent.load(station_ref01_match_dt0)).data()
    assert(station_ref01_data_dt0.id === station_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/station/StationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PublibikeStationsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['station01','station02','station03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PUBLIBIKE_STATIONS_TEST_STATION_ENTID': idmap,
    'PUBLIBIKE_STATIONS_TEST_LIVE': 'FALSE',
    'PUBLIBIKE_STATIONS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PUBLIBIKE_STATIONS_TEST_STATION_ENTID']

  const live = 'TRUE' === env.PUBLIBIKE_STATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PUBLIBIKE_STATIONS_TEST_STATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PublibikeStationsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PUBLIBIKE_STATIONS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
