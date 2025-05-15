


import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const navAnimation = {
        hidden: { opacity: 0, y: -20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemAnimation = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.nav 
            initial="hidden"
            animate="show"
            variants={navAnimation}
            className="bg-white shadow-md"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <motion.div 
                            variants={itemAnimation}
                            className="flex-shrink-0 flex items-center"
                        >
                            <Link to="/" className="text-2xl font-bold text-slate-800">
                                Library
                            </Link>
                        </motion.div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {token ? (
                            <>
                                <motion.div variants={itemAnimation}>
                                    <Link 
                                        to="/" 
                                        className="px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                    >
                                        Home
                                    </Link>
                                </motion.div>
                                <motion.div variants={itemAnimation}>
                                    <Link 
                                        to="/my-books" 
                                        className="px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                    >
                                        My Books
                                    </Link>
                                </motion.div>
                                {role === 'admin' && (
                                    <motion.div variants={itemAnimation}>
                                        <Link 
                                            to="/admin" 
                                            className="px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                        >
                                            Admin
                                        </Link>
                                    </motion.div>
                                )}
                                <motion.button
                                    variants={itemAnimation}
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                >
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.div variants={itemAnimation}>
                                    <Link 
                                        to="/login" 
                                        className="px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div variants={itemAnimation}>
                                    <Link 
                                        to="/signup" 
                                        className="px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                    >
                                        Sign Up
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            variants={itemAnimation}
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {token ? (
                        <>
                            <Link 
                                to="/" 
                                className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/my-books" 
                                className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                                My Books
                            </Link>
                            {role === 'admin' && (
                                <Link 
                                    to="/admin" 
                                    className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                >
                                    Admin
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.nav>
    );
}