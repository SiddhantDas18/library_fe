import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            const data = await response.json()
            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('role', data.role) // Store the role
                // Redirect based on role
                if (data.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            } else {
                alert(data.msg)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold">Login</h2>
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
                        className="w-full py-2 px-4 bg-slate-600 text-white rounded-md hover:bg-slate-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}