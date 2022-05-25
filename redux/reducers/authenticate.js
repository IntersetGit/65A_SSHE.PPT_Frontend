import { createSlice } from "@reduxjs/toolkit";
import _localStorage from "../../utils/BrowserLocalstorage";
import jwtDecode from "jwt-decode";

export const AuthSlice = createSlice(({
  name : 'auth',
  initialState: {
    token : _localStorage.get('token') ? _localStorage.get('token') : '',
    userData : _localStorage.get('token') ? jwtDecode(_localStorage.get('token')).token : {},
    refresh_token : _localStorage.get('refresh_token') ? _localStorage.get('refresh_token') : ''
  },
  reducers : {
    handleLogin : (state,action) => {
      state.token = action.payload.token
      state.userData = jwtDecode(action.payload.token).token
      state.refresh_token = action.payload.refresh_token
    },

    handleLogout : (state,action) => {
      state.token = ''
      state.userData = {}
      state.refresh_token = ''
    }
  }
}))


export const { handleLogin , handleLogout } = AuthSlice.actions

export default AuthSlice.reducer