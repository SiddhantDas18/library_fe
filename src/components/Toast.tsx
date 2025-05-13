import { useEffect } from 'react'

interface ToastProps {
    message: string
    type: 'success' | 'error' | 'info'
    show: boolean
    onClose: () => void
}

export default function Toast({ message, type, show, onClose }: ToastProps) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    if (!show) return null

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    }[type]

    return (
        <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
            <div className="flex items-center">
                <span>{message}</span>
                <button 
                    onClick={onClose}
                    className="ml-4 text-white hover:text-gray-200"
                >
                    ×
                </button>
            </div>
        </div>
    )
}