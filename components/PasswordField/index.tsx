import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup size="md" mb={4}>
      <Input
        {...props}
        pr="4.5rem"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={(_) => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default PasswordField;
