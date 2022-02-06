import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import { AiOutlineDownload } from 'react-icons/ai';
function PDFViewer({ modalTitle, url, isOpen, setOpen }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {
    if (typeof window == 'undefined') {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }
  }, []);
  return (
    <div>
      <Modal onClose={(_) => setOpen(false)} isOpen={isOpen} size="3xl">
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>{modalTitle ? modalTitle : 'PDF'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Document
              loading={<Spinner />}
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>

            <div className="flex items-center">
              <Tooltip
                label="Download resume"
                placement={'top'}
                aria-label="A tooltip"
              >
                <Button
                  variant="link"
                  colorScheme={'blue'}
                  onClick={(_) => {
                    window.open(url, '_blank');
                  }}
                >
                  <AiOutlineDownload className={'text-2xl'} />
                </Button>
              </Tooltip>

              {pageNumber !== 1 && (
                <Button mr={2} onClick={(_) => setPageNumber(pageNumber - 1)}>
                  Previous
                </Button>
              )}
              {pageNumber !== numPages && (
                <Button onClick={(_) => setPageNumber(pageNumber + 1)}>
                  Next
                </Button>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PDFViewer;
