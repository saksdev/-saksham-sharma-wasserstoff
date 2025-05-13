import React from 'react';
import Input from '../Lib/Input.tsx';
import Button from '../Lib/Button.tsx';
import './Form.css';
import FileUpload from '../Lib/FileUpload.tsx';

interface Props {
  formData: {
    name: string;
    email: string;
    username: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormPage({ formData, handleChange, handleSubmit }: Props) {
  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Button is disabled if any field is empty or email is invalid
  const isDisabled = !formData.name || !formData.email || !formData.username || !isValidEmail(formData.email);

  return (
    <>
      <h1>Your Journey to Coding Conf <br /> 2025 Starts Here!</h1>
      <p>Secure your spot at next year's biggest coding conference</p>
      <form id='form' onSubmit={handleSubmit}>
        <div className='form-container'>
          <FileUpload />
          <Input label='Full Name' placeholder='Enter Your Full Name' name="name" value={formData.name} onChange={handleChange} />
          <Input label='Email Address' placeholder='Enter Your Email' name="email" value={formData.email} onChange={handleChange}/>
          <Input label='Github Username' placeholder='Enter Your Github Username' name="username" value={formData.username} onChange={handleChange} />
          <Button disabled={isDisabled} />
        </div>
      </form>
    </>
  );
}