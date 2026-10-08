// now this is the login page users see after logging in

import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../api/client";
import Button from "../components/ui/Buttons";
import Input from "../components/ui/Input";

function Login() {
  const { login } = useAuth;
  const navigate = useNavigate();
  const location = useLocation();

  // use state for email , password, errors, and when it submits
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  redirect to where user was trying to go before logging in/registering
  const redirectNote = location.state as { from?: Location } | null;
  const redirectedFrom = redirectNote?.from?.pathname;

  // handleSubmit function for the login form
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // stop default reload
    event.preventDefault();

    // clear old errors
    setError('');

    // check no fields are emoty
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return;
    }

    try {
      // show loaading state and login
      setIsSubmitting(true);
      await login(email.trim(), password);

      // redirect to Dashboard
      navigate(redirectedFrom || '/dashboard', { replace: true});

    } catch (error) {
      // show error from backend
      setError(getErrorMessage(error));
    } finally {
      // finish loading
      setIsSubmitting(false);
    }
  }


  return (
    <div className="w-full max-w-md rounded-3xl bg-yellow-100 p-8 shadow-sm">
      <h1 className="text-3xl text-orange-600 font-extrabold">Log In</h1>
      <p className="mt-2 text-orange-400">Welcome Back. Your Goals Missed You</p>

      {/* if not logged in message */}
      {redirectedFrom && (
        <p className="mt-6 rounded-xl bg-orange-200 px-4 py-3 text-sm text-orange-600">Please log in to view this page.</p>
      )}

      {/* form + noValidate to turn off browser default */}
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Input 
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input 
          label="Password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {/* erorr for screen readers */}
        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >{error}</p>
        )}

        {/* button to submit form */}
        <Button type="submit" fullWidth isLoading={isSubmitting} className="bg-secondary">
          Log In
        </Button>
      </form>
    </div>
  )
}

export default Login;