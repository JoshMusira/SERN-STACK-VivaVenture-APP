import React, { useState } from 'react'
import './styles.css'
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submission logic here
        // You can send the form data to the server or perform any other actions
        // For this example, we'll simply log the form data to the console
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        setSubmitted(true);
    };

    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            {submitted ? (
                <div className="confirmation-container">
                    <p className="confirmation-message">
                        Thank you for your message! We'll get back to you soon.
                    </p>
                    <button className="submit-button" onClick={() => setSubmitted(false)}>
                        Submit Another Message
                    </button>
                </div>
            ) : (
                <form className="contact-us-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );


}

export default Contact