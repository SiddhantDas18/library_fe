import { useState } from 'react'

interface AddBookPopupProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (bookData: {
        title: string
        author: string
        isbn: string
        published_year: string
        copies: number
    }) => void
}

export default function AddBookPopup({ isOpen, onClose, onAdd }: AddBookPopupProps) {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        published_year: '',
        copies: 1
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedIsbn = bookData.isbn.trim()
        if (!trimmedIsbn) {
            return // Don't submit if ISBN is empty or only whitespace
        }
        const formattedData = {
            ...bookData,
            isbn: trimmedIsbn, // Use the trimmed ISBN
            published_year: bookData.published_year.toString(),
            copies: Number(bookData.copies)
        }
        onAdd(formattedData)
        setBookData({
            title: '',
            author: '',
            isbn: '',
            published_year: '',
            copies: 1
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div 
            className={`fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
        >
            <div 
                className={`bg-white rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add New Book</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            required
                            value={bookData.title}
                            onChange={(e) => setBookData(prev => ({ ...prev, title: e.target.value }))}
                            className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 text-base"
                            placeholder="Enter book title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                        <input
                            type="text"
                            required
                            value={bookData.author}
                            onChange={(e) => setBookData(prev => ({ ...prev, author: e.target.value }))}
                            className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 text-base"
                            placeholder="Enter author name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                        <input
                            type="text"
                            required
                            value={bookData.isbn}
                            onChange={(e) => setBookData(prev => ({ ...prev, isbn: e.target.value }))}
                            className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 text-base"
                            placeholder="Enter ISBN"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Published Year</label>
                        <input
                            type="text"
                            required
                            value={bookData.published_year}
                            onChange={(e) => setBookData(prev => ({ ...prev, published_year: e.target.value }))}
                            className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 text-base"
                            placeholder="Enter published year"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Copies Available</label>
                        <input
                            type="number"
                            required
                            value={bookData.copies}
                            onChange={(e) => setBookData(prev => ({ ...prev, copies: Number(e.target.value) }))}
                            className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 text-base"
                            placeholder="Enter number of copies"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}