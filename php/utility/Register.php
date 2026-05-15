<?php
declare(strict_types=1);

// PublibikeStations SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PublibikeStationsUtility::setRegistrar(function (PublibikeStationsUtility $u): void {
    $u->clean = [PublibikeStationsClean::class, 'call'];
    $u->done = [PublibikeStationsDone::class, 'call'];
    $u->make_error = [PublibikeStationsMakeError::class, 'call'];
    $u->feature_add = [PublibikeStationsFeatureAdd::class, 'call'];
    $u->feature_hook = [PublibikeStationsFeatureHook::class, 'call'];
    $u->feature_init = [PublibikeStationsFeatureInit::class, 'call'];
    $u->fetcher = [PublibikeStationsFetcher::class, 'call'];
    $u->make_fetch_def = [PublibikeStationsMakeFetchDef::class, 'call'];
    $u->make_context = [PublibikeStationsMakeContext::class, 'call'];
    $u->make_options = [PublibikeStationsMakeOptions::class, 'call'];
    $u->make_request = [PublibikeStationsMakeRequest::class, 'call'];
    $u->make_response = [PublibikeStationsMakeResponse::class, 'call'];
    $u->make_result = [PublibikeStationsMakeResult::class, 'call'];
    $u->make_point = [PublibikeStationsMakePoint::class, 'call'];
    $u->make_spec = [PublibikeStationsMakeSpec::class, 'call'];
    $u->make_url = [PublibikeStationsMakeUrl::class, 'call'];
    $u->param = [PublibikeStationsParam::class, 'call'];
    $u->prepare_auth = [PublibikeStationsPrepareAuth::class, 'call'];
    $u->prepare_body = [PublibikeStationsPrepareBody::class, 'call'];
    $u->prepare_headers = [PublibikeStationsPrepareHeaders::class, 'call'];
    $u->prepare_method = [PublibikeStationsPrepareMethod::class, 'call'];
    $u->prepare_params = [PublibikeStationsPrepareParams::class, 'call'];
    $u->prepare_path = [PublibikeStationsPreparePath::class, 'call'];
    $u->prepare_query = [PublibikeStationsPrepareQuery::class, 'call'];
    $u->result_basic = [PublibikeStationsResultBasic::class, 'call'];
    $u->result_body = [PublibikeStationsResultBody::class, 'call'];
    $u->result_headers = [PublibikeStationsResultHeaders::class, 'call'];
    $u->transform_request = [PublibikeStationsTransformRequest::class, 'call'];
    $u->transform_response = [PublibikeStationsTransformResponse::class, 'call'];
});
