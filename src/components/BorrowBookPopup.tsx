import { useState } from 'react'

interface BorrowBookPopupProps {
    isOpen: boolean
    onClose: () => void
    onBorrow: (userId: string) => void
    bookTitle: string
}

export default function BorrowBookPopup({ isOpen, onClose, onBorrow, bookTitle }: BorrowBookPopupProps) {
    const [userId, setUserId] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onBorrow(userId)
        setUserId('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Borrow Book</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                <p className="mb-4">Book: {bookTitle}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User ID
                        </label>
                        <input
                            type="text"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter user ID"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Confirm Borrow
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}