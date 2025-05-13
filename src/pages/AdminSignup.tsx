import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminSignup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/addAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            })
            const data = await response.json()
            if (data.user) {
                navigate('/login')
            } else {
                alert(data.msg)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold">Admin Sign Up</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Create Admin Account
                    </button>
                </form>
            </div>
        </div>
    )
}