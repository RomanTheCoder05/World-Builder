// src/components/FileUploader.js

import React from 'react';

function FileUploader({ onFilesUploaded }) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onFilesUploaded(files);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
}

export default FileUploader;
