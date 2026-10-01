import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient";
import { Button } from "./ui/button";

function RegisterForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [promotions, setPromotions] = useState(false);
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isFormValid = email && password && dateOfBirth && terms;

    function validate() {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailPattern.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required.";
        }
        if (!terms) {
            newErrors.terms = "You must accept the Terms and Conditions.";
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
            await apiRequest("/users", {
                method: "POST",
                body: {
                    username: email,
                    email: email,
                    password: password,
                    dateOfBirth: dateOfBirth,
                    promotions: promotions
                }
            });
            navigate("/login");
        } catch (error) {
            setSubmitError("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-4">
            <h1 className="text-2xl font-semibold">Register</h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-md border px-3 py-1.5 text-sm"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="rounded-md border px-3 py-1.5 text-sm"
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                    className="rounded-md border px-3 py-1.5 text-sm"
                />
                {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="promotions"
                    name="promotions"
                    checked={promotions}
                    onChange={(event) => setPromotions(event.target.checked)}
                />
                <label htmlFor="promotions">I would like to receive personalized promotions.</label>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={terms}
                        onChange={(event) => setTerms(event.target.checked)}
                    />
                    <label htmlFor="terms">I agree and accept the Terms and Conditions.</label>
                </div>
                {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}
            </div>

            {submitError && <p className="text-sm text-destructive">{submitError}</p>}

            <Button type="submit" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/login")}>
                BACK TO LOGIN
            </Button>
        </form>
    );
}

export default RegisterForm;

