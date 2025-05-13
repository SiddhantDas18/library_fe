import { useState, useEffect } from 'react'
import Toast from '../components/Toast'
import AddBookPopup from '../components/AddBookPopup'

interface User {
    id: number
    username: string
    email: string
    role: string
}

interface BorrowedBook {
    id: number
    book_id: number
    borrowed_date: string
    return_date: string
    Status: boolean
    books: {
        title: string
        author: string
    }
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [transactions, setTransactions] = useState([])
    const [userId, setUserId] = useState('')
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
    const [error, setError] = useState<string | null>(null)
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'info' as 'success' | 'error' | 'info'
    })
    const [isAddBookOpen, setIsAddBookOpen] = useState(false)

    useEffect(() => {
        fetchUsers()
        const interval = setInterval(fetchTransactions, 10000)
        return () => clearInterval(interval)
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            if (data.users) {
                setUsers(data.users)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            if (data.transactions) {
                setTransactions(data.transactions)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const checkBorrowedBooks = async () => {
        if (!userId) {
            setError('Please enter a user ID')
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/checkBorrow/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            
            if (data.msg === "User not found") {
                setError('User not found')
                setBorrowedBooks([])
                return
            }

            if (Array.isArray(data.borrow)) {
                setBorrowedBooks(data.borrow)
                setError(null)
            } else {
                setBorrowedBooks([])
                setError('No borrowed books found')
            }
        } catch (error) {
            console.error('Error:', error)
            setError((error as Error).message)
            setBorrowedBooks([])
        }
    }

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({
            show: true,
            message,
            type
        })
    }

    const handleReturn = async (bookId: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/return/${bookId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: parseInt(userId) })
            })
            const data = await response.json()
            
            showToast(data.msg, response.ok ? 'success' : 'error')
            
            if (response.ok) {
                checkBorrowedBooks()
                fetchTransactions()
            }
        } catch (error) {
            showToast('Failed to return the book. Please try again.', 'error')
            console.error('Error:', error)
        }
    }

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Only allow numbers
        if (/^\d*$/.test(value)) {
            setUserId(value)
        }
    }

    const handleAddBook = async (bookData: {
        title: string
        author: string
        Copies_available: number
        description: string
    }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            })
            const data = await response.json()
            showToast(data.msg, response.ok ? 'success' : 'error')
        } catch (error) {
            showToast('Failed to add book. Please try again.', 'error')
            console.error('Error:', error)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <Toast 
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />
            
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <button
                    onClick={() => setIsAddBookOpen(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Add New Book
                </button>
            </div>

            <AddBookPopup
                isOpen={isAddBookOpen}
                onClose={() => setIsAddBookOpen(false)}
                onAdd={handleAddBook}
            />
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map(user => (
                        <div key={user.id} className="p-4 bg-white rounded-lg shadow">
                            <p className="font-bold">{user.username}</p>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600">Role: {user.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Recent Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">User ID</th>
                                <th className="p-4">Book ID</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction: any) => (
                                <tr key={transaction.id} className="border-t">
                                    <td className="p-4">{transaction.id}</td>
                                    <td className="p-4">{transaction.user_id}</td>
                                    <td className="p-4">{transaction.book_id}</td>
                                    <td className="p-4">${transaction.amount}</td>
                                    <td className="p-4">{new Date(transaction.Transaction_Date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Check Borrowed Books</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        value={userId}
                        onChange={handleUserIdChange}
                        placeholder="Enter User ID (numbers only)"
                        className="px-4 py-2 border rounded-md"
                    />
                    <button
                        onClick={checkBorrowedBooks}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Check Books
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                {borrowedBooks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {borrowedBooks.map(book => (
                            <div key={book.id} className="p-4 bg-white rounded-lg shadow">
                                <h3 className="font-bold">{book.books.title}</h3>
                                <p className="text-gray-600">Author: {book.books.author}</p>
                                <p className="text-gray-600">Borrowed: {new Date(book.borrowed_date).toLocaleDateString()}</p>
                                <p className="text-gray-600">Return by: {new Date(book.return_date).toLocaleDateString()}</p>
                                <button
                                    onClick={() => handleReturn(book.book_id)}
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Return Book
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}