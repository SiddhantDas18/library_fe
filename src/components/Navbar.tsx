


import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">Library System</Link>
                <div className="space-x-4">
                    {!token ? (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/books" className="text-white hover:text-gray-300">Books</Link>
                            <Link to="/my-books" className="text-white hover:text-gray-300">My Books</Link>
                            <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}