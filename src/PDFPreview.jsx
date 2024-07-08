import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const PDFPreview = ({ file }) => {
  return (
    <Document file={file}>
      <Page pageNumber={1} width={150} />
    </Document>
  );
};

export default PDFPreview;
