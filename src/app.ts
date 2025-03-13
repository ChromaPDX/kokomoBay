import { createSelector, createSlice, createStore } from "@reduxjs/toolkit";
// import pkg from "@reduxjs/toolkit";
// const { createSelector, createSlice, createStore } = pkg;

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

// More permissive email validation that allows simpler test emails
const validateEmail = (email) => {
  return (
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
    email.match(/^[^\s@]+@[^\s@]+$/)
  );
};

const checkForErrors = (storeState: IStoreState): ILoginPageError => {
  console.log("mark1", storeState, !validateEmail(storeState.email));
  // Only validate email format if there's an email entered
  if (storeState.email && !validateEmail(storeState.email)) {
    return "invalidEmail";
  }
  // Check credentials only if both fields are filled
  if (storeState.email && storeState.password) {
    if (
      storeState.password !== "secret" ||
      storeState.email !== "adam@email.com"
    ) {
      return "credentialFail";
    }
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
