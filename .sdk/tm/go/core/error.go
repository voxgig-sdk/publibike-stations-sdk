package core

type PublibikeStationsError struct {
	IsPublibikeStationsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPublibikeStationsError(code string, msg string, ctx *Context) *PublibikeStationsError {
	return &PublibikeStationsError{
		IsPublibikeStationsError: true,
		Sdk:              "PublibikeStations",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PublibikeStationsError) Error() string {
	return e.Msg
}
