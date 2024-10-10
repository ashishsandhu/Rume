import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Alert } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
            <p>
              {this.state.error && this.state.error.toString()}
            </p>
            <hr />
            <p className="mb-0">
              Please check your environment variables and try again. If the problem persists, contact support.
            </p>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;