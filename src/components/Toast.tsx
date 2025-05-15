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
            const timer = setTimeout(onClose, 3000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    if (!show) return null

    const colors = {
        success: 'bg-green-400',
        error: 'bg-red-400',
        info: 'bg-blue-400'
    }

    return (
        <div 
            className={`
                fixed top-4 right-4 
                ${colors[type]} 
                px-4 py-2 
                rounded 
                text-white text-sm 
                shadow-sm
                transform transition-all duration-200 ease-in-out
                ${show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
        >
            {message}
        </div>
    )
}