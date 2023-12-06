import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false
  },
  reducers: {
    setLogin: (state, action) => {
      state.isSignedIn = action.payload;
    }
  }
});

export const { setLogin } = userSlice.actions;

export default userSlice.reducer;
