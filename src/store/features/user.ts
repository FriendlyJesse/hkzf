import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface userState {
  token: string
  userInfo: {
    [key: string]: string
  }
  isLoggedIn: Boolean
}

const initialState: userState = {
  token: '',
  userInfo: {},
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken (state, action: PayloadAction<string>) {
      state.token = action.payload
      state.isLoggedIn = true
    },
    setUserInfo (state, action: PayloadAction<{ [key: string]: string }>) {
      state.userInfo = action.payload
    },
    logout (state) {
      state.token = ''
      state.userInfo = {}
      state.isLoggedIn = false
    }
  }
})

export const { setToken, setUserInfo, logout } = userSlice.actions
export default userSlice.reducer
