import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await loginUser(email, password);
            login(res.token, res.user);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4">Login</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</Button>
            </form>
        </div>
    );
}
