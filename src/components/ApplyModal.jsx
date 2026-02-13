"use client";

import React, { useState } from 'react'
import { applyForJob } from '../services/jobService'

/**
 * ApplyModal component - handles job applications with resume upload
 * Provides both mailto link and file upload options
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls modal visibility
 * @param {function} props.handleClose - Function to close modal
 * @param {Object} props.job - Job object being applied for
 */
const ApplyModal = ({ show, handleClose, job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null
  })
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  /**
   * Handles form input changes
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  /**
   * Handles form submission for resume upload
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.resume) {
      setMessage('Please upload your resume.')
      return
    }

    setUploading(true)
    try {
      const result = await applyForJob(job.id, formData)
      setMessage(result.message)
      // Reset form on success
      if (result.success) {
        setFormData({ name: '', email: '', resume: null })
        setTimeout(() => {
          handleClose()
          setMessage('')
        }, 2000)
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Failed to submit application. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  // Generate mailto link for email application
  const mailtoLink = `mailto:careers@Satmanyujobcare.com?subject=Application for ${job?.title}&body=Hello, I am interested in applying for the ${job?.title} position. Please find my resume attached.`

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
          <div className="modal-header border-bottom-0 pt-4 px-4">
            <h5 className="modal-title fw-bold" style={{ color: 'var(--text-dark)' }}>Apply for <span className="text-neon">{job?.title}</span></h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="d-grid gap-2 mb-4">
              <a
                href={mailtoLink}
                className="blue-btn pt-2 pb-2 rounded text-center py-2 fw-medium text-pirBlue"
                onClick={handleClose}
              >
              Apply via Email
              </a>
              <div className="text-center text-muted col-auto small fw-bold mt-2">OR UPLOAD RESUME</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-medium">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="resume" className="form-label fw-medium">Resume (PDF, DOC, DOCX)</label>
                <input
                  type="file"
                  className="form-control"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                />
                <div className="form-text">Maximum file size: 5MB</div>
              </div>

              {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mb-4 shadow-sm border-0`}>
                  {message}
                </div>
              )}

              <div className="d-grid">
                <button
                  type="submit"
                  className="bg-pirBlue pt-2 pb-2 rounded text-center text-white py-2 fw-bold"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                  ) : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyModal