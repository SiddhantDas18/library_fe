import { useState, useEffect } from 'react'

interface Book {
    id: number
    title: string
    author: string
    ISBN: string
    Published_year: number
    Copies_available: number
}

export default function Books() {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            if (data.books) {
                setBooks(data.books)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleBorrow = async (bookId: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/borrow/${bookId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            alert(data.msg)
            fetchBooks()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
                <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                    <p className="text-gray-600">Author: {book.author}</p>
                    <p className="text-gray-600">ISBN: {book.ISBN}</p>
                    <p className="text-gray-600">Year: {book.Published_year}</p>
                    <p className="text-gray-600">Available Copies: {book.Copies_available}</p>
                    {book.Copies_available > 0 && (
                        <button
                            onClick={() => handleBorrow(book.id)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Borrow
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}