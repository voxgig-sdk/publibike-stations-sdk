-- PublibikeStations SDK error

local PublibikeStationsError = {}
PublibikeStationsError.__index = PublibikeStationsError


function PublibikeStationsError.new(code, msg, ctx)
  local self = setmetatable({}, PublibikeStationsError)
  self.is_sdk_error = true
  self.sdk = "PublibikeStations"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PublibikeStationsError:error()
  return self.msg
end


function PublibikeStationsError:__tostring()
  return self.msg
end


return PublibikeStationsError
