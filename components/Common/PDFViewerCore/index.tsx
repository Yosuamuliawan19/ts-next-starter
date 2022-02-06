import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button, Spinner } from '@chakra-ui/react';
import styles from './styles.module.css';

function PDFViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onNext = () => {
    console.log(pageNumber, numPages);
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };
  const onPrev = () => {
    if (pageNumber !== 1) setPageNumber(pageNumber - 1);
  };
  useEffect(() => {
    // if (typeof window !== 'undefined') {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    // }
  }, []);
  useHotkeys('left', onPrev, [pageNumber, numPages]);
  useHotkeys('right', onNext, [pageNumber, numPages]);
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <div>
      <Document
        loading={<Spinner />}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
        <div className={'flex items-center absolute ' + styles.pdfController}>
          <div className="flex items-center">
            <Button
              variant="link"
              bgColor={'rbga(0,0,0,0)'}
              disabled={pageNumber === 1}
              onClick={onPrev}
              className="glassmorphism text-md"
            >
              <BiLeftArrowAlt />
            </Button>
            <p className="py-2 px-4 text-md mx-2 glassmorphism rounded-xl w-max">
              Page {pageNumber} of {numPages}
            </p>

            <Button
              variant="link"
              bgColor={'rbga(0,0,0,0)'}
              disabled={pageNumber === numPages}
              onClick={onNext}
              className="glassmorphism text-md"
            >
              <BiRightArrowAlt />
            </Button>
          </div>
        </div>
      </Document>
    </div>
  );
}

export default PDFViewer;
