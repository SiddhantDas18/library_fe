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
    const [searchTerm, setSearchTerm] = useState('')

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

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchBooks()
            return
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/searchBook/${searchTerm}`, {
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

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search books by title..."
                    className="flex-1 px-4 py-2 border rounded-md"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                        <p className="text-gray-600">Author: {book.author}</p>
                        <p className="text-gray-600">ISBN: {book.ISBN}</p>
                        <p className="text-gray-600">Year: {book.Published_year}</p>
                        <p className="text-gray-600">Available Copies: {book.Copies_available}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}