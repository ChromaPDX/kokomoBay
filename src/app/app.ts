import { createSelector, createSlice, createStore } from "@reduxjs/toolkit";

export const noError = "no_error";

export type ILoginPageError =
  | "invalidEmail"
  | "credentialFail"
  | typeof noError;

export type ILoginPageSelection = {
  password: string;
  email: string;
  error: ILoginPageError;
  disableSubmit: boolean;
};

export type IStoreState = {
  password: string;
  email: string;
  error: ILoginPageError;
  disableSubmit: boolean;
};

const initialState: IStoreState = {
  password: "",
  email: "",
  error: noError,
  disableSubmit: true,
};

export const loginApp = createSlice<
  IStoreState,
  {
    reset: (s: IStoreState) => void | IStoreState;
    setPassword: (s: IStoreState, b: { payload: string; type: string }) => void;
    setEmail: (s: IStoreState, b: { payload: string; type: string }) => void;
    signIn: (s: IStoreState) => void;
    setError: (
      s: IStoreState,
      b: { payload: ILoginPageError; type: string }
    ) => void;
  }
>({
  name: "my login app",
  initialState,
  reducers: {
    reset: (state) => {
      state.password = initialState.password;
      state.email = initialState.email;
      state.error = initialState.error;
      state.disableSubmit = initialState.disableSubmit;
    },
    setPassword: (state, action: { payload: string }) => {
      state.password = action.payload;

      state.disableSubmit = state.password === "";
    },
    setEmail: (state, action: { payload: string }) => {
      const isValid = validateEmail(action.payload);
      if (!isValid) {
        state.error = "invalidEmail";
      } else {
        state.error = noError;
      }

      state.email = action.payload;

      state.disableSubmit =
        state.password == "" || state.email == "" || !isValid;
    },
    setError: (state, action: { payload: ILoginPageError }) => {
      state.error = action.payload;
    },
    // setDisableSubmit: (state, action: { payload: boolean }) => {
    //   // This will be handled by the selector
    // },
    signIn: (state) => {
      const e = checkForErrors(state);
      state.error = e;

      if (e !== "no_error") {
        state.disableSubmit = true;
      }
    },
  },
});

const selectRoot = (storeState: IStoreState) => {
  return storeState;
};

// More permissive email validation that allows simpler test emails
export const validateEmail = (email): boolean => {
  const r =
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null ||
    email.match(/^[^\s@]+@[^\s@]+$/) !== null;

  return r;
};

const checkForErrors = (storeState: IStoreState): ILoginPageError => {
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
    // disableSubmit:
    //   root.email == "" || root.password == "" || !validateEmail(root.email),
    // root.email == "" || root.password == "" || !validateEmail(root.email),
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
