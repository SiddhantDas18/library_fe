import { useState, useEffect } from 'react'

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

export default function MyBooks() {
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchMyBooks()
    }, [])

    const fetchMyBooks = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/my-books`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.msg || 'Failed to fetch books')
            }
            
            if (Array.isArray(data.books)) {
                setBorrowedBooks(data.books)
                setError(null)
            } else {
                setBorrowedBooks([])
                setError('No books found')
            }
        } catch (error) {
            console.error('Error:', error)
            setError((error as Error).message)
            setBorrowedBooks([])
        }
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-lg text-center text-red-600">
                {error}
            </div>
        )
    }

    const currentlyBorrowed = borrowedBooks.filter(book => !book.Status)
    const borrowingHistory = borrowedBooks.filter(book => book.Status)

    return (
        <div className="space-y-12">
            {/* Currently Borrowed Books Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Currently Borrowed Books</h2>
                {currentlyBorrowed.length === 0 ? (
                    <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600">
                        No books borrowed right now
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentlyBorrowed.map(book => (
                            <div key={book.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                                <h3 className="text-xl font-bold mb-2">{book.books.title}</h3>
                                <p className="text-gray-600">Author: {book.books.author}</p>
                                <p className="text-gray-600">Borrowed Date: {new Date(book.borrowed_date).toLocaleDateString()}</p>
                                <p className="text-gray-600">Return Date: {new Date(book.return_date).toLocaleDateString()}</p>
                                <p className="mt-2 text-blue-600 font-semibold">Currently Borrowed</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Borrowing History Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Borrowing History</h2>
                {borrowingHistory.length === 0 ? (
                    <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600">
                        No borrowing history available
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {borrowingHistory.map(book => (
                            <div key={book.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                                <h3 className="text-xl font-bold mb-2">{book.books.title}</h3>
                                <p className="text-gray-600">Author: {book.books.author}</p>
                                <p className="text-gray-600">Borrowed Date: {new Date(book.borrowed_date).toLocaleDateString()}</p>
                                <p className="text-gray-600">Return Date: {new Date(book.return_date).toLocaleDateString()}</p>
                                <p className="mt-2 text-green-600 font-semibold">Returned</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}