
const checkErrors = (res) => {
  if (!res.ok) {
    return Promise.reject({
      status: res.status,
      message: res.statusText
    }) 
  }
  return res
}

const fetchJson = async (url, options={}) => {
  let headers = {
    ...options.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const r1 = await fetch(url, {
    ...options,
    headers,
  })
  const r2 = checkErrors(r1)
  return r2
}

export default fetchJson


const markRequestPending = () => {
  console.log('markRequestPending')
}

const markRequestSuccess = () => {
  console.log("markRequestSuccess")
}

const markRequestFailed = () => {
  console.log("markRequestFailed")
}

const createRequestThunkSimple = ({ request, key, success, failure }) => {
  
  return (...args) => (dispatch) => {
    dispatch(markRequestPending(key))
    return request(...args)
      .then(data => {
        dispatchEvent(success(data))
        dispatch(markRequestSuccess(key))
      })
      .catch(reason => {
        dispatchEvent(failure(reason))
        dispatch(markRequestFailed(reason))
      })
  }
}