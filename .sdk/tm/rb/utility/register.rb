# PublibikeStations SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PublibikeStationsUtility.registrar = ->(u) {
  u.clean = PublibikeStationsUtilities::Clean
  u.done = PublibikeStationsUtilities::Done
  u.make_error = PublibikeStationsUtilities::MakeError
  u.feature_add = PublibikeStationsUtilities::FeatureAdd
  u.feature_hook = PublibikeStationsUtilities::FeatureHook
  u.feature_init = PublibikeStationsUtilities::FeatureInit
  u.fetcher = PublibikeStationsUtilities::Fetcher
  u.make_fetch_def = PublibikeStationsUtilities::MakeFetchDef
  u.make_context = PublibikeStationsUtilities::MakeContext
  u.make_options = PublibikeStationsUtilities::MakeOptions
  u.make_request = PublibikeStationsUtilities::MakeRequest
  u.make_response = PublibikeStationsUtilities::MakeResponse
  u.make_result = PublibikeStationsUtilities::MakeResult
  u.make_point = PublibikeStationsUtilities::MakePoint
  u.make_spec = PublibikeStationsUtilities::MakeSpec
  u.make_url = PublibikeStationsUtilities::MakeUrl
  u.param = PublibikeStationsUtilities::Param
  u.prepare_auth = PublibikeStationsUtilities::PrepareAuth
  u.prepare_body = PublibikeStationsUtilities::PrepareBody
  u.prepare_headers = PublibikeStationsUtilities::PrepareHeaders
  u.prepare_method = PublibikeStationsUtilities::PrepareMethod
  u.prepare_params = PublibikeStationsUtilities::PrepareParams
  u.prepare_path = PublibikeStationsUtilities::PreparePath
  u.prepare_query = PublibikeStationsUtilities::PrepareQuery
  u.result_basic = PublibikeStationsUtilities::ResultBasic
  u.result_body = PublibikeStationsUtilities::ResultBody
  u.result_headers = PublibikeStationsUtilities::ResultHeaders
  u.transform_request = PublibikeStationsUtilities::TransformRequest
  u.transform_response = PublibikeStationsUtilities::TransformResponse
}
