<?php
declare(strict_types=1);

// PublibikeStations SDK utility: result_headers

class PublibikeStationsResultHeaders
{
    public static function call(PublibikeStationsContext $ctx): ?PublibikeStationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
