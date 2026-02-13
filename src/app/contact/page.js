"use client";
import React, { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    /**
     * Handles form input changes
     * @param {Object} e - Event object
     */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Handles form submission
     * @param {Object} e - Event object
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        // In a real application, this would send data to a backend API
        console.log('Form submitted:', formData)
        setSubmitted(true)
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' })

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5 text-neon">Contact Us</h1>

            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card p-4">
                        <div className="row">
                            {/* Contact Information */}
                            <div className="col-md-6">
                                <h3 className="text-neon mb-4">Get In Touch</h3>
                                <div
                                    className="mb-4">
                                    <h5>📍 Address</h5>
                                    <p>456 Tech Avenue<br />Innovation Hub, IH 90001</p>
                                </div>
                                <div className="mb-4">
                                    <h5>📞 Phone</h5>
                                    <p>(800) 555-9000</p>
                                </div>
                                <div className="mb-4">
                                    <h5>📧 Email</h5>
                                    <p>careers@Satmanyu job care.io</p>
                                </div>
                                <div className="mb-4">
                                    <h5>🕒 Business Hours</h5>
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 2:00 PM</p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="col-md-6">
                                <h3 className="text-neon mb-4">Send Message</h3>

                                {submitted && (
                                    <div className="alert alert-success">
                                        Thank you for your message! We'll get back to you within 24 hours.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-neon w-100">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="mt-5">
                            <h4 className="text-neon mb-3">Find Us</h4>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-74.00594148458934!3d40.71278367933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e12cac5%3A0x5f0e4b3b0e3b0e3b!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1629990000000!5m2!1sen!2sus"
                                    style={{ border: 0, borderRadius: '8px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Satmanyu job care Office Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
