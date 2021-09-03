import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // You can also log the error to an error reporting service
  toast = createStandaloneToast();
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('boundary', error);

    const toast = createStandaloneToast();
    toast({
      title: 'An error occurred.',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }

  render() {
    return this.props.children;
  }
}
export default ErrorBoundary;
