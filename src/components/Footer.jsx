import React from 'react'

/**
 * Footer component with company information and links
 * Styled with neon green accents on dark background
 */
const Footer = () => {
  return (
    <footer className="footer mt-auto py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-neon fw-bold mb-3">Satmanyu job care Recruiter</h5>
            <p className="text-pirBlue" style={{ maxWidth: '400px' }}>
              The premier platform for connecting top-tier candidates with forward-thinking companies worldwide.
            </p>

          </div>
          <div className="col-md-3">
            <h6 className="fw-bold mb-3 text-pirBlue">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/jobs">Current Openings</a></li>
              <li className="mb-2"><a href="/about">About Us</a></li>
              <li className="mb-2"><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold mb-3 text-pirBlue">Contact Info</h6>
            <p className="mb-2 text-muted">📧 careers@Satmanyu job care.io</p>
            <p className="mb-2 text-muted">📞 (800) 555-9000</p>
            <p className="text-muted">📍 456 Tech Avenue, Innovation Hub</p>
          </div>
        </div>
        <hr
          className="my-4" style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />
        <div className="text-center text-muted">
          <small>©
            {new Date().getFullYear()} Satmanyu job care Recruiter. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer