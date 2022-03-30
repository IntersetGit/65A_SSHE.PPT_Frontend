import _localStorage from "../BrowserLocalstorage"

const isUserLoggedin = () => {
  return _localStorage.get('token')
}


export  { isUserLoggedin }