import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Card, FloatingLabel, HelperText, Spinner } from "flowbite-react";

import { startLoginWithEmailPassword, deleteErrorMessageAlert, startGoogleSignIn, loadButtonSpinner } from "../../store/auth";

import { AuthLayout } from "../layout/AuthLayout"

import { useForm } from "../../hooks";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const formData = {
  email: '',
  password: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'Your email address is invalid.'],
  password: [(value) => value.length >= 6, 'Your password must be more than 6 characters long.'],
};

export const LoginPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);

  const {buttonSpinnerFlag, errorMessage, errorMessageFlag} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const {formState, email, password, onInputChange, emailValid, passwordValid, isFormValid} = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    dispatch(loadButtonSpinner());
    dispatch(startLoginWithEmailPassword(formState));
  };

  const onGoogleSignIn = () => {
    setFormSubmited(false);
    dispatch(loadButtonSpinner());
    dispatch(startGoogleSignIn());

  }

  return (
    <AuthLayout>
      <Card className="max-w-sm w-sm rounded-2xl p-1 animate__animated animate__fadeIn animate__faster">
        <h5 className="text-center font-bold text-lg uppercase text-neutral-700">Login</h5>
        <p className="text-center text-sm text-neutral-500 mb-2">Please, enter your credentials</p>
        {
          errorMessageFlag && errorMessage
          ?
          <Alert color="failure" icon={ExclamationCircleIcon} onDismiss={() => dispatch(deleteErrorMessageAlert())}>
           {errorMessage}
          </Alert>
          :
          null
        }
        <form 
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
          >
          <div>
            <FloatingLabel 
              variant="outlined" 
              label="Your email" 
              type="email" 
              name="email"
              value={email}
              onChange={onInputChange}
              color={!!emailValid && formSubmited ? "error" : "default"}
              />
              <HelperText hidden={!formSubmited} color="failure" className="text-xs flex gap-1">
                <ExclamationCircleIcon className="size-4" hidden={!formSubmited || !!!emailValid}/>
                {emailValid}
              </HelperText>
          </div>
          <div>
            <FloatingLabel 
              variant="outlined" 
              label="Your password" 
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              color={!!passwordValid && formSubmited ? "error" : "default"}
              />
              <HelperText hidden={!formSubmited} color="failure" className="text-xs flex gap-1">
                <ExclamationCircleIcon className="size-4" hidden={!formSubmited || !!!passwordValid}/>
                {passwordValid}
              </HelperText>
          </div>
          <Button 
            disabled={buttonSpinnerFlag}
            type="submit" 
            color='purple' 
            className="transition-colors duration-200"
          >
            {
              buttonSpinnerFlag
              ?
              <div className="flex items-center gap-2"><Spinner size="md" className=""/>Loading...</div>
              :
              "Login now"
            }
          </Button>
        </form>
        <div>
          <p className="text-sm text-neutral-500 my-1">Don't have an account? <Link to='/auth/register' className="text-neutral-700 font-semibold hover:text-neutral-900 transition-colors duration-200">Register here</Link></p>
        </div>

        <div className="text-center my-4">
          <p className="text-neutral-600 border-b-1 border-neutral-300 leading-0.5"><span className="font-bold bg-white px-2">Login <span className="font-normal"> with others </span></span></p>
        </div>

        <Button 
          disabled={buttonSpinnerFlag}
          color='light' 
          className="flex gap-2 text-sm text-neutral-800 transition-colors duration-200"
          onClick={onGoogleSignIn}
          >
            {
              buttonSpinnerFlag
              ?
              <div className="flex items-center gap-2"><Spinner size="md" className=""/>Loading...</div>
              :
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="size-5"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                <p>Login with <span className="font-bold">google</span></p>
              </>
            }
        </Button>
      </Card>
    </AuthLayout>
  )
}
