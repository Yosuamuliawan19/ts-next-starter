import AuthContext from '@context/Auth';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import LoginComponent from '@components/LoginComponent';
export default function AuthBoundary(props) {
  const { isClosable } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { accessToken } = useContext(AuthContext);

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const isLoggedIn = accessToken?.token !== undefined;
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={!isLoggedIn}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {isClosable && <ModalCloseButton />}
          <ModalBody pb={6}>
            <LoginComponent noCard />
          </ModalBody>
        </ModalContent>
      </Modal>
      {props.children}
    </>
  );
}
