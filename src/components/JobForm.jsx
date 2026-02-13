"use client";

import React, { useState } from "react";
import { createJob } from "../services/jobService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// eslint-disable-next-line no-unused-vars
import dayjs from "dayjs";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    type: "Full-time",
    lastDate: "", // ISO string or empty
  });
  const [dateObj, setDateObj] = useState(null); // Date object for DatePicker
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (d) => {
    setDateObj(d);
    if (!d) {
      setFormData({ ...formData, lastDate: "" });
      return;
    }
    // Normalize to end-of-day UTC (23:59:59)
    const endOfDayUtc = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 0)
    ).toISOString();
    setFormData({ ...formData, lastDate: endOfDayUtc });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const result = await createJob(formData);
      if (result.success) {
        setMessage("Job created successfully!");
        setFormData({
          title: "",
          description: "",
          requirements: "",
          location: "",
          salary: "",
          type: "Full-time",
          lastDate: "",
        });
        setDateObj(null);
      } else {
        setMessage(result.message || "Failed to create job");
      }
    } catch (error) {
      setMessage("An error occurred while creating the job");
      console.error("Job creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4" style={{ color: 'var(--text-dark)' }}>Create New <span className="text-neon">Job Listing</span></h3>

      {message && (
        <div
          className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"
            } border-0 shadow-sm mb-4`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 border-0 shadow-sm">
        {/* --- Job Info --- */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label fw-medium">
              Job Title *
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              required
              disabled={loading}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="type" className="form-label fw-medium">
              Employment Type *
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* --- Location, Salary, and Date --- */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="location" className="form-label fw-medium">
              Location *
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. New York, NY (Remote)"
              required
              disabled={loading}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label htmlFor="salary" className="form-label fw-medium">
              Salary *
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $50k - $70k"
              required
              disabled={loading}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label htmlFor="lastDate" className="form-label fw-medium">
              Last Application Date
            </label>
            <DatePicker
              selected={dateObj}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select date (optional)"
              disabled={loading}
            />
          </div>
        </div>

        {/* --- Description --- */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-medium">
            Job Description *
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="6"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the role and responsibilities..."
            required
            disabled={loading}
          ></textarea>
        </div>

        {/* --- Requirements --- */}
        <div className="mb-4">
          <label htmlFor="requirements" className="form-label fw-medium">
            Requirements *
          </label>
          <textarea
            className="form-control"
            id="requirements"
            name="requirements"
            rows="4"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Enter each requirement on a new line"
            required
            disabled={loading}
          ></textarea>
          <div className="form-text mt-2">
            Enter each requirement on a separate line.
          </div>
        </div>

        {/* --- Submit Button --- */}
        <div>
          <button type="submit" className="btn btn-neon px-4 py-2 fw-bold shadow-sm" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Creating Job...
              </>
            ) : (
              "Create Job Listing"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
