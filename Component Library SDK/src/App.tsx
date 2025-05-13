import { useState } from 'react';
import Header from './Lib/Header';
import Form from './pages/Form';
import Ticket from './pages/Ticket';
import './App.css';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <Header />
      {!isSubmitted ? (
        <Form
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Ticket data={formData} />
      )}
    </>
  );
}

export default App;
