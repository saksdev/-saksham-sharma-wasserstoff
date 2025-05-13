import React, { useState } from 'react';
import UploadImg from '../assets/upload.png';
import './Input.css';

interface FileUploadProps {
  label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div>
      <label htmlFor="fileUpload">{label}</label>
      <div
        id="fileUpload"
        className="file-upload-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {file ? (
          <p>{file.name}</p>
        ) : (
          <>
            <img src={UploadImg} alt="Upload Image" />
            <p>Drag and drop a file here or click to select one</p>
          </>
        )}
        <input
          type="file"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
