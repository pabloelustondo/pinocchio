export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'
export const PROCESS_LIST_RESPONSE = 'counter/PROCESS_LIST_RESPONSE'
export const PROCESS_LIST_ERROR = 'counter/PROCESS_LIST_ERROR'

const initialState = {
  count: 0,
    list:[],
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

      case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
          list: [...state.list, {id:state.count}],
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
          list: state.list.filter( (x) => x.id != state.count),
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
    return dispatch => {
        dispatch({
            type: INCREMENT_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: INCREMENT
            })
        }, 3000)
    }
}


export const incrementAsyncAPI = () => {
    return dispatch => {
        dispatch({
            type: INCREMENT_REQUESTED
        });
        fecth('http://localhost:3000/images').then((response) => {
            dispatch({
                type: PROCESS_LIST_RESPONSE,
                response
            })
        },
            (error) => {
                dispatch({
                    type: PROCESS_LIST_ERROR,
                    response
                })
            })
    }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}