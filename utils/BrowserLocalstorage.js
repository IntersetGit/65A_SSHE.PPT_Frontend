
class BrowserLocalstorage {

  isBrowser = typeof window !== 'undefined' ? true : false

  get(key) {
    if ( this.isBrowser ) {
      return localStorage.getItem(key)
    }
  }

  set(key,value) {
    if (  this.isBrowser ){
      localStorage.setItem(key,value)
    }
  }

  remove(key) {
    if ( this.isBrowser ){
      localStorage.removeItem(key)
    }
  }

  clear() {
    if ( this.isBrowser ){
      localStorage.clear()
    }
  }

}

let _localStorage = new BrowserLocalstorage()

export { BrowserLocalstorage }
export default _localStorage