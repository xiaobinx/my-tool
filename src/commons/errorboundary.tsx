import * as React from "react"
import { ReactNode } from "react"


interface ErrorBoundaryProps {
    fallback?: (err: any) => ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: any
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        hasError: false,
        error: {}
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error }
    }

    // componentDidCatch(error: any, errorInfo: any) {
    //     console.error(error, errorInfo)
    // }

    render() {
        const { hasError, error } = this.state
        const { children, fallback } = this.props
        if (hasError) {
            if (fallback === undefined) {
                return <div>
                    <p>Something went wrong.</p>
                    <p>{error.toString()}</p>
                </div>
            } else {
                return fallback(error)
            }
        }
        return children
    }
}