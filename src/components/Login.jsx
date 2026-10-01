import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient";
import { UserContext } from "./UserContext";
import { Button } from "./ui/button";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: { username: email, password }
      });
      const users = await apiRequest("/users");
      const matchedUser = users.find((user) => user.username === email || user.email === email);
      login(matchedUser || null, data.token);
      navigate("/");
    } catch (error) {
      setSubmitError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
      <div className="rounded-lg border p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="inputEmail">Email</label>
            <input
              id="inputEmail"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-md border px-3 py-1.5 text-sm"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-md border px-3 py-1.5 text-sm"
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="text-sm underline">Forgot password?</a>
          </div>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "LOGGING IN..." : "LOGIN"}
          </Button>

          <div className="text-center text-sm">
            Or <Link to="/register" className="underline">Create an Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;