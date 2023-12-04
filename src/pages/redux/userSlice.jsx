import { createSlice } from "@reduxjs/toolkit";

const US = {
  idUsuario: null,
  rol: null,
  token: null,
  firstName: null,
  lastName: null,
  email: null,
  loginMode: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: US,
  reducers: {
    addUser: (state, action) => {
      state.idUsuario = action.payload.idUsuario;
      state.rol = action.payload.rol;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.loginMode = action.payload.loginMode;
    },
    deleteUser: (state, action) => {
      state.idUsuario = null;
      state.rol = null;
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.loginMode = null;
    },
    updateUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    }
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
