import React from "react";
import { Provider, useSelector } from "react-redux";

import app, { validateEmail } from "../app.js";

const core = app();

const selector = core.select.loginPageSelection;
export const actions = {
  ...core.app.actions,
  setError: (error: ILoginPageError) => core.app.actions.setError(error),
  setDisableSubmit: (disabled: boolean) => core.app.actions.setDisableSubmit(disabled)
};
export const store = core.store;

export const noError = 'no_error';

export type ILoginPageError = 'invalidEmail' | 'credentialFail' | typeof noError;

export type ILoginPageSelection = {
  password: string;
  email: string;
  error: ILoginPageError;
  disableSubmit: boolean;
};

export const emailwarning = "Something isn’t right. Please double check your email";
export const credentialFailWarning = "You entered an incorrect email, password, or both.";

export const loginInputId = "login"
export const emailInputId = "email"
export const passwordInputId = "password"
export const credErrorId = "cred-error"

export function LoginPage(): React.JSX.Element {
  const selection = useSelector(selector);

  return (<div>
    <h2>Welcome back!</h2>


    <form>
      <input
        type="email"
        id={emailInputId}
        value={selection.email}
        onChange={(e) => {
          store.dispatch(actions.setEmail(e.target.value as string));
        }}
      />

      <p id="invalid-email-warning" className="warning" style={{ color: 'red' }}>
        {selection.error === 'invalidEmail' ? emailwarning : ''}
      </p>

      <br />

      <input
        id={passwordInputId}
        type="password"
        value={selection.password} onChange={(e) => store.dispatch(actions.setPassword(e.target.value as any))} />

      <p id={credErrorId} style={{ color: 'red' }}>
        {selection.error === 'credentialFail' ? credentialFailWarning : ''}
      </p>

      <br />

      <button id={loginInputId} disabled={selection.disableSubmit} onClick={(event?) => {
        event && event.preventDefault();
        store.dispatch(actions.signIn());

        // const isValid = validateEmail(selection.email);

        // store.dispatch(actions.setError(isValid ? noError : 'invalidEmail'));

        // if (isValid) {

        //   // Simulate credential check
        //   const isCredentialValid = selection.email === 'adam@email.com' && selection.password === 'secret';
        //   store.dispatch(actions.setError(isCredentialValid ? noError : 'credentialFail'));
        //   store.dispatch(actions.setDisableSubmit(!isCredentialValid));

        //   if (isCredentialValid) {
        //     store.dispatch(actions.signIn());
        //   }
        // }
      }} >Sign In</button>

    </form>

    <pre>
      {
        JSON.stringify(selection, null, 2)
      }
    </pre>

  </div>);
}

// export const LoginPage;

// eslint-disable-next-line react/display-name
export default function () {
  return <Provider store={store}>
    <LoginPage />
  </Provider>
}
