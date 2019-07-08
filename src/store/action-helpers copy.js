// eslint-disable-next-line
import { red } from '../logger'
import {
  requestPending,
  requestSuccess,
  requestFailed
} from './requests/actions'
// eslint-disable-next-line
import { pink } from 'logger'

export const logError = (err, key) => {
  red(`actions.logError(key:${key})`, err)
}


export const createRequestThunk = ({
  request,
  key,
  start = [],
  success = [],
  failure = []
}) => {
  return (...args) => dispatch => {
    const requestKey = typeof key === 'function' ? key(...args) : key

    start.forEach(actionCreator => dispatch(actionCreator()))
    dispatch(requestPending(requestKey))
    return request(...args)
      .then(data => {
        success.forEach(actionCreator => dispatch(actionCreator(data)))
        dispatch(requestSuccess(requestKey))
      })
      .catch(reason => {
        failure.forEach(actionCreator => dispatch(actionCreator(reason)))
        dispatch(requestFailed(reason, requestKey))
      })
  }
}


// export const createRequestThunk = ({
//   request,
//   key,
//   start = [],
//   success = [],
//   failure = []
// }) => {
//   return (...args) => async dispatch => {
//     const requestKey = typeof key === 'function' ? key(...args) : key
//     // if (requestKey === 'TODOS_CREATE_REQUEST_KEY') {
//     //   pink('createRequestThunk: calling create')
//     // }
//     console.group()
//     pink('request', request)
//     pink('key', key)
//     pink('start', start)
//     pink('success', success)
//     pink('failure', failure)
//     console.groupEnd()
//     start.map(async actionCreator => {
//       await dispatch(actionCreator())
//     })
//     await dispatch(requestPending(requestKey))
//     try {
//       const data = await request(...args)
//       await dispatch(requestSuccess(requestKey))
//       success.map(async actionCreator => {
//         await dispatch(actionCreator(data))
//         dispatch(requestSuccess(requestKey))
//       })
//     } catch (e) {

//       await dispatch(requestFailed(e, requestKey))
//       failure.map(async actionCreator => {
//         await dispatch(actionCreator(e))
//         dispatch(requestFailed(e, requestKey))
//       })
//     }
//   }
// }
