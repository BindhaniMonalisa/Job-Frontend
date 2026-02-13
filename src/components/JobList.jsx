"use client";

import React, { useState, useEffect } from "react";
import { getJobs, deleteJob, updateJob } from "../services/jobService";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editDateObj, setEditDateObj] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobsData = await getJobs({ showExpired: true });
      setJobs(jobsData);
    } catch (error) {
      setMessage("Failed to load jobs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (job) => {
    setEditingJob(job.id);
    setEditFormData({ ...job });
    setEditDateObj(job.lastDate ? new Date(job.lastDate) : null);
  };

  const handleEditChange = (e) =>
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleEditDateChange = (d) => {
    setEditDateObj(d);
    if (!d) {
      setEditFormData({ ...editFormData, lastDate: "" });
      return;
    }
    const endOfDayUtc = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 0)
    ).toISOString();
    setEditFormData({ ...editFormData, lastDate: endOfDayUtc });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await updateJob(editingJob, editFormData);
      if (result.success) {
        setMessage("Job updated successfully!");
        setEditingJob(null);
        fetchJobs();
      } else setMessage(result.message || "Failed to update job");
    } catch (err) {
      setMessage("Error updating job");
      console.error(err);
    }
  };

  // ✅ Updated: Removed window.confirm(), SweetAlert2 handles confirmation inside jobService.deleteJob()
  const handleDelete = async (id) => {
    try {
      const r = await deleteJob(id); // SweetAlert2 confirmation and response handled inside jobService.js
      if (r.success) {
        fetchJobs(); // refresh jobs list after deletion
      }
    } catch (err) {
      setMessage("Delete failed");
      console.error(err);
    }
  };

  const extendByDays = async (job, days = 7) => {
    try {
      const current = job.lastDate ? new Date(job.lastDate) : new Date();
      const newDate = new Date(current.getTime() + days * 24 * 60 * 60 * 1000);
      const iso = new Date(
        Date.UTC(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          23,
          59,
          59,
          0
        )
      ).toISOString();
      await updateJob(job.id, { ...job, lastDate: iso });
      fetchJobs();
    } catch (err) {
      console.error(err);
      setMessage("Failed to extend");
    }
  };

  const daysUntil = (lastDate) => {
    if (!lastDate) return Infinity;
    const d = dayjs(lastDate);
    return d.diff(dayjs(), "day");
  };

  if (loading)
    return (
      <div className="text-center">
        <div className="spinner-border text-neon" />
      </div>
    );

  return (
    <div>
      <h3 className="text-neon mb-4">Manage Job Listings</h3>
      {message && (
        <div
          className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"
            }`}
        >
          {message}
        </div>
      )}

      {jobs.map((job) => {
        const expired =
          job.status === "expired" ||
          (job.lastDate && new Date(job.lastDate) < new Date());
        const daysLeft = daysUntil(job.lastDate);
        const expiringSoon = !expired && daysLeft <= 3;

        return (
          <div key={job.id} className="card mb-2 p-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{job.title}</strong>{" "}
                {expired ? (
                  <span className="badge bg-danger">EXPIRED</span>
                ) : expiringSoon ? (
                  <span className="badge bg-warning text-dark">
                    Expiring Soon
                  </span>
                ) : (
                  <span className="badge bg-success">Active</span>
                )}
                <div>
                  <small>
                    {job.location} • {job.type} • {job.salary}
                  </small>
                </div>
                <div>
                  <small>
                    Last Date:{" "}
                    {job.lastDate
                      ? dayjs(job.lastDate).format("DD MMM YYYY")
                      : "No expiry"}
                  </small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => startEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={() => extendByDays(job, 7)}
                >
                  Extend +7d
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {editingJob === job.id && (
              <form onSubmit={handleUpdate} className="mt-2">
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <input
                      className="form-control"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-md-3 mb-2">
                    <input
                      className="form-control"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-md-3 mb-2">
                    <input
                      className="form-control"
                      name="salary"
                      value={editFormData.salary}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <DatePicker
                      selected={editDateObj}
                      onChange={(d) => handleEditDateChange(d)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <button className="btn btn-success btn-sm me-2" type="submit">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setEditingJob(null);
                      setEditFormData({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JobList;
