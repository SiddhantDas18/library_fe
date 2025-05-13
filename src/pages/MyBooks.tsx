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
            if (data.books) {
                setBorrowedBooks(data.books)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">My Borrowed Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {borrowedBooks.map(book => (
                    <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">{book.books.title}</h3>
                        <p className="text-gray-600">Author: {book.books.author}</p>
                        <p className="text-gray-600">Borrowed Date: {new Date(book.borrowed_date).toLocaleDateString()}</p>
                        <p className="text-gray-600">Return Date: {new Date(book.return_date).toLocaleDateString()}</p>
                        <p className={`mt-2 font-semibold ${book.Status ? 'text-green-600' : 'text-red-600'}`}>
                            {book.Status ? 'Returned' : 'Not Returned'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}