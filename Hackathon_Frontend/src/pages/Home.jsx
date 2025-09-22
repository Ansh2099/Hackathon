import { useState } from "react";

export default function Home() {
    const [testResult, setTestResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const testBackendConnection = async () => {
        setIsLoading(true);
        setTestResult("");
        
        try {
            // Test the public demo endpoint
            const response = await fetch('http://localhost:8080/api/v1/demo/public');
            const data = await response.json();
            setTestResult(`✅ Backend connected! Response: ${JSON.stringify(data)}`);
        } catch (error) {
            setTestResult(`❌ Backend connection failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl font-bold">Hello!</h1>
            <p className="mb-6">Welcome to the Hackathon App!</p>
            
            <div className="space-y-4">
                <button 
                    onClick={testBackendConnection}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {isLoading ? "Testing..." : "Test Backend Connection"}
                </button>
                
                {testResult && (
                    <div className={`p-4 rounded ${
                        testResult.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        {testResult}
                    </div>
                )}
            </div>
        </div>
    );
}
