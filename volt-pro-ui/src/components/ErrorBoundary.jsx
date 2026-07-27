import { Component } from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        // Keep the full developer detail in the console while showing users a clean error page.
        console.error('UI error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorPage
                    statusCode="500"
                    title="The UI hit an error"
                    message="React stopped rendering this page because a component failed. The error detail is shown below for debugging."
                    error={this.state.error}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
