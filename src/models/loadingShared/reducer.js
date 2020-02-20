const reducer = (state = {}, action) => {
  const {type} = action
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type)
  // not a *_REQUEST / *_SUCCESS /  *_ERROR actions, so we ignore them
  if (!matches) {
    return state
  }
  const [, requestName, requestState] = matches

  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}

export default reducer
