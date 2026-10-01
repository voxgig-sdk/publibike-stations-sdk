

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"sh":"Station address without the city","t":"`$STRING`","key$":"address","index$":0},"capacity":{"a":true,"fo":"int32","h":"Capacity","n":"capacity","r":false,"sh":"The maximum number of bikes a station is able to accommodate.","t":"`$INTEGER`","key$":"capacity","index$":1},"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City of the station","t":"`$STRING`","key$":"city","index$":2},"id":{"a":true,"fo":"int32","h":"Id","n":"id","r":true,"sh":"Technical station id","t":"`$INTEGER`","key$":"id","index$":3},"is_virtual_station":{"a":true,"h":"Is Virtual Station","n":"is_virtual_station","r":false,"sh":"Marks the station as virtual according to the requirements of the General Bikeshare Feed Specification (GBFS) https://github.com/NABSA/gbfs/blob/v2.2/gbfs.md#station_informationjson , a virtual station does not consist of physical infrastr…","t":"`$BOOLEAN`","key$":"is_virtual_station","index$":4},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":true,"sh":"Latitude of the station","t":"`$NUMBER`","key$":"latitude","index$":5},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":true,"sh":"Longitude of the station","t":"`$NUMBER`","key$":"longitude","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Public name of the station","t":"`$STRING`","key$":"name","index$":7},"network":{"a":true,"h":"Network","n":"network","r":true,"sh":"Representation of a network","t":"`$OBJECT`","key$":"network","index$":8},"sponsors":{"a":true,"h":"Sponsors","n":"sponsors","r":false,"sh":"An array of sponsors of this station","t":"`$ARRAY`","key$":"sponsors","index$":9},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"Representation of a state.","t":"`$OBJECT`","key$":"state","index$":10},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":false,"sh":"All vehicles that are currently available at this station","t":"`$ARRAY`","key$":"vehicles","index$":11},"zip":{"a":true,"h":"Zip","n":"zip","r":false,"sh":"Zip code of the station","t":"`$STRING`","key$":"zip","index$":12}},"id":{"field":"id","name":"id"},"name":"station","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /public/partner/stations","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/public/partner/stations","q":{},"r":{},"s":[{"lit":"public"},{"lit":"partner"},{"lit":"stations"}],"t":{"req":"`reqdata`","res":"`body.stations`"},"index$":0},{"a":true,"co":{"id":"GET /public/stations","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/public/stations","q":{},"r":{},"s":[{"lit":"public"},{"lit":"stations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /public/stations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/public/stations/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"public"},{"lit":"stations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"station","name__orig":"station","Name":"Station","name_":"station","name-":"station","NAME":"STATION","index$":0}, {"active":true,"entity":"station","key$":"BasicStationFlow","kind":"basic","name":"BasicStationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"station_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"station_ref01","srcdatavar":"station_ref01_data","suffix":"_dt0"},"m":{"id":"station01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-station_ref01"}}],"index$":1}]}, 'Station', {"GET /public/partner/stations":{"protocol":"http","parameters":[]},"GET /public/stations":{"protocol":"http","parameters":[]},"GET /public/stations/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The station id","schema":{"type":"integer","format":"int32"},"index$":0}]}})
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
  
