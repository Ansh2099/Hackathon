import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();
    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Dashboard</h1>
            <div className="mb-4">Welcome, {user?.name || "User"}!</div>
            <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
    );
}
