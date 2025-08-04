import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import Modal from "../components/Modal";

/**
 * PUBLIC_INTERFACE
 * Auth Modal: Login/Signup interface dialog.
 * @param {boolean} open - open status
 * @param {Function} onClose - close callback
 */
export default function AuthModal({ open, onClose }) {
  const { login, signup } = useAuth();
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleAuth(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    setError(null);
    (step === "login" ? login(email, password) : signup(email, password))
      .then(() => onClose())
      .catch(err => setError("Failed. Try again."))
      .finally(() => setLoading(false));
  }

  return (
    <Modal open={open} onClose={onClose} title={step === "login" ? "Login" : "Sign Up"}>
      <form onSubmit={handleAuth} className="auth-form">
        <label>
          Email or Username
          <input name="email" type="text" required autoFocus />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        {error && <div className="auth-form-error">{error}</div>}
        <button className="accent-btn" disabled={loading}>
          {loading ? "Please wait…" : (step === "login" ? "Login" : "Sign up")}
        </button>
        <div className="auth-form-switch">
          {step === "login" ? (
            <>
              &mdash; or &mdash;<br />
              <button type="button" onClick={() => setStep("signup")} className="text-btn">
                New here? Create account
              </button>
            </>
          ) : (
            <>
              &mdash; or &mdash;<br />
              <button type="button" onClick={() => setStep("login")} className="text-btn">
                Already have an account?
              </button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}
