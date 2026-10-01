-- PublibikeStations SDK error

local json = require("dkjson")

local PublibikeStationsError = {}
PublibikeStationsError.__index = PublibikeStationsError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function PublibikeStationsError.new(code, msg, ctx)
  local self = setmetatable({}, PublibikeStationsError)
  self.is_sdk_error = true
  self.sdk = "PublibikeStations"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function PublibikeStationsError:context()
  return CONTEXT[self]
end


function PublibikeStationsError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function PublibikeStationsError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function PublibikeStationsError:to_json()
  return json.encode(self:to_table())
end


function PublibikeStationsError:__tostring()
  return self.msg
end


function PublibikeStationsError.__tojson(self)
  return self:to_json()
end


return PublibikeStationsError
