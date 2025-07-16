import { Alert, Button, Card, FloatingLabel, HelperText, Spinner } from "flowbite-react"
import { AuthLayout } from "../layout/AuthLayout"
import { Link } from "react-router-dom"
import { useForm } from "../../hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteErrorMessageAlert, loadButtonSpinner, startRegisteringUserWithEmailPassword } from "../../store/auth";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

const formData = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
  displayName: [(value) => value.length >= 1, 'Your full name is required.'],
  email: [(value) => value.includes('@'), 'Your email address is invalid.'],
  password: [(value) => value.length >= 6, 'Your password must be more than 6 characters long.']
};

export const RegisterPage = () => {

  const {buttonSpinnerFlag, errorMessage, errorMessageFlag} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const {displayName, email, password, onInputChange, displayNameValid, emailValid, passwordValid, isFormValid, formState} = useForm(formData, formValidations);

  const [formSubmited, setFormSubmited] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if(!isFormValid) return;
    dispatch(loadButtonSpinner());
    dispatch(startRegisteringUserWithEmailPassword(formState));

  }

  return (
    <AuthLayout>
          <Card className="max-w-sm w-sm rounded-2xl p-1 animate__animated animate__fadeIn animate__faster">
            <h5 className="text-center font-bold text-lg uppercase text-neutral-700">CREATE AN ACCOUNT</h5>
            <p className="text-center text-sm text-neutral-500 mb-2">Please, enter your personal data</p>
            {
              errorMessageFlag
              ?
              <Alert color="failure" icon={ExclamationCircleIcon} onDismiss={() => dispatch(deleteErrorMessageAlert())}>
              {errorMessage}
              </Alert>
              :
              null
            }
            <form 
              className="flex flex-col gap-4"
              onSubmit={onSubmit}
            >
              <div>
                <FloatingLabel 
                  variant="outlined" 
                  label="Your full name" 
                  type="text"
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  color={!!displayNameValid && formSubmited ? "error" : "default"}
                />
                <HelperText hidden={!formSubmited} color="failure" className="text-xs flex gap-1">
                  <ExclamationCircleIcon className="size-4" hidden={!formSubmited || !!!displayNameValid}/>
                  {displayNameValid}
                </HelperText>
              </div>
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
                  "Register now"
                }
              </Button>
            </form>
            <div>
              <p className="text-sm text-neutral-500 my-1">Do you have an account? <Link to='/auth/login' className="text-neutral-700 font-semibold hover:text-neutral-900 transition-colors duration-200">Login here</Link></p>
            </div>
    
          </Card>
        </AuthLayout>
  )
}
