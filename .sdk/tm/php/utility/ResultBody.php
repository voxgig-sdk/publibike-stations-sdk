<?php
declare(strict_types=1);

// PublibikeStations SDK utility: result_body

class PublibikeStationsResultBody
{
    public static function call(PublibikeStationsContext $ctx): ?PublibikeStationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
