import { createSelector, createSlice, createStore } from "@reduxjs/toolkit";
// import pkg from "@reduxjs/toolkit";
// const { createSelector, createSlice, createStore } = pkg;

console.log("hello world");

import { ILoginPageError, ILoginPageSelection } from "./LoginPage";

export type IStoreState = {
  password: string;
  email: string;
  error: ILoginPageError;
};

const initialState: IStoreState = {
  password: "",
  email: "",
  error: "no_error",
};

export const loginApp = createSlice<
  IStoreState,
  {
    reset: (s: IStoreState) => void | IStoreState; //| WritableDraft<IStoreState>,
    setPassword: (s: IStoreState, b) => void;
    setEmail: (s: IStoreState, b) => void;
    signIn: (s: IStoreState) => void;
  }
>({
  name: "my login app!",
  initialState,
  reducers: {
    reset: (state) => {
      state.password = initialState.password;
      state.email = initialState.email;
      state.error = initialState.error;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    signIn: (state) => {
      state.error = checkForErrors(state);
    },
  },
});

const selectRoot = (storeState: IStoreState) => {
  return storeState;
};

// https://stackoverflow.com/a/46181/614612
const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const checkForErrors = (storeState: IStoreState): ILoginPageError => {
  if (!validateEmail(storeState.email)) {
    return "invalidEmail";
  }
  if (
    storeState.password !== "password" &&
    storeState.email !== "adam@email.com"
  ) {
    return "credentialFail";
  }
  return "no_error";
};

const loginPageSelection = createSelector<
  [(storeState: IStoreState) => IStoreState],
  ILoginPageSelection
>([selectRoot], (root: IStoreState) => {
  return {
    ...root,
    disableSubmit: root.email == "" || root.password == "",
  };
});

export default () => {
  const store = createStore(loginApp.reducer);

  return {
    app: loginApp,
    select: {
      loginPageSelection,
    },
    store,
  };
};
