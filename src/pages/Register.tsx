// placeholder check if routes work

import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../api/client";
import Button from "../components/ui/Buttons";
import Input from "../components/ui/Input";


// create type/shape for form values for register username, email, password, confirm password
type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<FormValues>; // samefield

// check fields and return probelsm
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  // username error
  if (values.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  } else if (values.username.trim().length > 30) {
    errors.username = 'Username must be 30 characters or less.';
  }

  // email error
  if (!/^\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email.';
  }

  // password error
  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  // confirm passwords match
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

function Register() {
  const { register } = useAuth();
  const navigate  = useNavigate();

  // useState for all fields as object
  const [values, setValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');  // errors from backend
  const [isSubmitting, setIsSubmitting] = useState(false);

  // updatefield - changeahndel
  function updateField(field: keyof FormValues, value: string) {
    setValues({ ...values, [field]: value });   
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // stop page from reloading
    event.preventDefault();
    setServerError('');

    // check fields for errors
    const errors = validate(values);
    setFieldErrors(errors);

    // stop if errors
    if (Object.keys(errors).length > 0) return;

    try {
      // create account + save token
      setIsSubmitting(true);
      await register(values.username.trim(), values.email.trim(), values.password);

      // navigate to welcome/dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      // show backend error
      setServerError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
  
    <div className="w-full max-w-md m-25 rounded-3xl bg-white text-orange-400 p-8 shadow-sm border border-1">
      <h1 className="p-8 text-3xl font-extrabold text-orange-600">Create your account</h1>
      <p className="mt-2 text-center">Start your first challenge in under a minute</p>

      {/* form */}
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Input 
          label="Username"
          autoComplete="username"
          value={values.username}
          onChange={(event) => updateField('username', event.target.value)}
          error={fieldErrors.username}
        />
        <Input 
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          error={fieldErrors.email}
        />

        <Input 
          label="Password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => updateField('password', event.target.value)}
          error={fieldErrors.password}
          helperText="At least 8 characters."
        />

        <Input 
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(event) => updateField('confirmPassword', event.target.value)}
          error={fieldErrors.confirmPassword}
        />

        {/* errors */}
          {serverError && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >{serverError}</p>
        )}

        {/* button to create account  */}
        <Button type="submit" fullWidth isLoading={isSubmitting} className="bg-accent">
          Create account
        </Button>
      </form>

       {/* if they already have an accouunt link to login page */}
      <p> Already have an account? {''}
        <Link to='/login' className='font-semibold text-brand-dark hover:underline'>
         Log in
        </Link>
      </p>
      
    </div>
  
  );
}

export default Register;