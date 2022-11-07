import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface userState {
  token: string
  userInfo: Object | null
}

const initialState: userState = {
  token: '',
  userInfo: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // login (state, { payload: { token, userInfo } }: PayloadAction<{ token: string, userInfo: Object }>) {
    //   state.token = token
    //   state.userInfo = userInfo
    // }
    setToken (state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setUserInfo (state, action: PayloadAction<string>) {
      state.userInfo = action.payload
    }
  }
})

export const { setToken, setUserInfo } = userSlice.actions
export default userSlice.reducer
