import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Nav from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminSignup from './pages/AdminSignup'
import Books from './pages/Books'
import MyBooks from './pages/MyBooks'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/login" />
}

function AdminRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    
    if (!token || role !== 'admin') {
        console.log('Access denied:', { token: !!token, role }) // Debug log
        return <Navigate to="/login" />
    }
    return children
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/books" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="admin-signup" element={<AdminSignup />} />
                    <Route
                        path="books"
                        element={
                            <PrivateRoute>
                                <Books />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="my-books"
                        element={
                            <PrivateRoute>
                                <MyBooks />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

function Layout() {
    return (
        <div>
            <Nav />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default App
