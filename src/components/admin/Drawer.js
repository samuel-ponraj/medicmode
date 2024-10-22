import React from 'react';
import { PdfViewer } from 'react-office-viewer';

const Drawer = () => {
  return (
    <div>
      <PdfViewer  fileType="pptx" fileUrl="https://drive.google.com/file/d/1TjeMAqx4LFBKzaNlGaJOK2QBnEB_hIFK/view?usp=drive_link" />
    </div>
  );
};

export default Drawer;
