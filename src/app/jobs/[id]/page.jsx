"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/services/jobService";
import dayjs from "dayjs";
import ApplyModal from "@/components/ApplyModal";

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showApplyModal, setShowApplyModal] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await getJobById(id);
                setJob(jobData);
            } catch (err) {
                console.error("Error fetching job:", err);
                setError("Job not found or failed to load details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchJob();
    }, [id]);

    if (loading)
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3 text-muted fw-medium">Loading job details...</p>
            </div>
        );

    if (error || !job)
        return (
            <div className="container my-5">
                <div className="alert alert-danger text-center">
                    {error || "Job not found."}
                </div>
                <div className="text-center">
                    <Link href="/jobs" className="btn btn-neon">
                        Back to All Jobs
                    </Link>
                </div>
            </div>
        );

    // 🧠 Expiry Check — either by status or date
    const expired =
        job.status === "expired" ||
        (job.lastDate && new Date(job.lastDate) < new Date());

    if (expired) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center">
                    ⚠️ This job’s application period has expired.
                    <br />
                    <strong>
                        Last application date:{" "}
                        {job.lastDate ? dayjs(job.lastDate).format("DD MMM YYYY") : "N/A"}
                    </strong>
                    <br />
                    It is no longer accepting applications.
                </div>
                <div className="text-center">
                    <Link href="/jobs" className="btn btn-neon">
                        Back to All Jobs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <Link href="/jobs" className="btn btn-outline-primary  text-pirBlue  mb-4 shadow-sm fw-medium">
                        ← Back to All Jobs
                    </Link>

                    {/* Job Summary Card */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="flex-grow-1">
                                    <h1 className="fw-bold mb-3" style={{ color: 'var(--text-dark)' }}>{job.title}</h1>
                                    <div className="d-flex flex-wrap gap-3 align-items-center">
                                        <span className="badge badge-neon px-3 py-2">
                                            {job.type}
                                        </span>
                                        <span className="text-muted fw-medium small">📍 {job.location}</span>
                                        <span className="text-muted fw-medium small">💰 {job.salary}</span>
                                    </div>
                                </div>
                                <button
                                    className="bg-pirBlue pt-2 pb-2 rounded text-center text-white btn-lg px-5 shadow-sm fw-bold"
                                    onClick={() => setShowApplyModal(true)}
                                >
                                    Apply for This Job
                                </button>
                            </div>
                            <hr className="my-4" style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />
                            <p className="text-muted mb-0 small">
                                Published on {dayjs(job.createdDate).format("DD MMM YYYY")}
                            </p>
                        </div>
                    </div>

                    {/* Job Details Section */}
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-4" style={{ color: 'var(--text-dark)' }}>Job Description</h4>
                                    <p className="text-muted lh-lg" style={{ whiteSpace: "pre-wrap" }}>{job.description}</p>
                                </div>
                            </div>

                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-4" style={{ color: 'var(--text-dark)' }}>Key Requirements</h4>
                                    <ul className="list-unstyled">
                                        {job.requirements.split("\n").map((req, i) => (
                                            <li key={i} className="mb-3 d-flex align-items-start">
                                                <span className="me-2 text-primary">✓</span>
                                                <span className="text-muted">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4" style={{ color: 'var(--text-dark)' }}>Quick Overview</h5>
                                    <div className="mb-3">
                                        <div className="small text-muted mb-1">Application Deadline</div>
                                        <div className="fw-medium">{job.lastDate ? dayjs(job.lastDate).format("DD MMM YYYY") : "Open until filled"}</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="small text-muted mb-1">Company Location</div>
                                        <div className="fw-medium">{job.location}</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="small text-muted mb-1">Annual Salary Range</div>
                                        <div className="fw-medium">{job.salary}</div>
                                    </div>
                                    <div className="mb-0">
                                        <div className="small text-muted mb-1">Job Type</div>
                                        <div className="fw-medium">{job.type}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)' }}>
                                <div className="card-body p-4 text-center">
                                    <h5 className="fw-bold mb-3" style={{ color: 'var(--text-dark)' }}>Interested?</h5>
                                    <p className="small text-muted mb-4">Join our team of innovative professionals</p>
                                    <button
                                        className="bg-pirBlue pt-2 pb-2 rounded text-center text-white w-100 mb-2 py-2 fw-bold shadow-sm"
                                        onClick={() => setShowApplyModal(true)}
                                    >
                                        Apply for This Position
                                    </button>
                                    <div className="small text-muted mt-3">
                                        Secure application process
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <ApplyModal
                show={showApplyModal}
                handleClose={() => setShowApplyModal(false)}
                job={job}
            />
        </div>
    );
};

export default JobDetail;
