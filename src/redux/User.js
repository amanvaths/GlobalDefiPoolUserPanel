import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  isLoggedIn: false,
  isWalletConnected: false,
  userInfo: {},
  walletInfo: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    connection: (state, action)=>{
      state.value.isWalletConnected = action.payload.isWalletConnected 
    },
    setWalletInfo: (state, action)=>{
      state.value.walletInfo = action.payload.walletInfo 
    },
    disconnectWallet: (state, action)=>{
      state.value.walletInfo = {}
    },
    login: (state, action) => {
      console.log("Login Payload", action.payload);
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialValue;
    },
  },
});

export const { logout, login, connection, setWalletInfo, disconnectWallet } = userSlice.actions;
export default userSlice.reducer;
