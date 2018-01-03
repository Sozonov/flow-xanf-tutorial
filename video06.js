// @flow

type SuccessResponse = {
  success: true,
  data: {
    meta: {},
    content: {}
  }
}
type ErrorResponse = {
  error: string,
  data: string
}
type Response = SuccessResponse | ErrorResponse

// не происходит уточнение, т.к. не строгий тип и в SuccessResponse может быть поле error: string
function handleResponse(response: Response) {
  if (response.error) {
    // не произошло уточнение, response по прежнему или Success или Error
    // response.data.includes('SererError') -> error
  }
}

// Используем строгие типы, чтобы происходил type refinement
type Response2 = $Exact<SuccessResponse> | $Exact<ErrorResponse>
function handleResponse(response: Response2) {
  if (response.error) {
    // уточнение произошло, response: ErrorResponse
    response.data.includes('SererError')
  }
}
