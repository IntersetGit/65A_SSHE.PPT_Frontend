import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice = createSlice(({
  name : 'auth',
  initialState: {
    token : ''
  },
  reducers : {
    login : (state,action) => {

    }
  }
}))


export const { login } = AuthSlice.actions

export default AuthSlice.reducer