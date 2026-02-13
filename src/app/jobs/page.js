"use client";

import React, { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { jobs as staticJobs } from "@/data/jobs.js";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");

  const locations = [...new Set(staticJobs.map((j) => j.location))];
  const types = [...new Set(staticJobs.map((j) => j.type))];

  const filteredJobs = staticJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      !filterLocation ||
      job.location.toLowerCase().includes(filterLocation.toLowerCase());

    const matchesType = !filterType || job.type === filterType;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="container my-5">
      <h1 className="text-center text-neon mb-3">Current Openings</h1>

      {/* 🔍 Search + Filters */}
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🧱 Jobs Grid */}
      <div className="row">
        {filteredJobs.length === 0 ? (
          <div className="col-12 text-center">
            <div className="card p-5 border-0 shadow-sm bg-white">
              <h3 className="text-neon fw-bold">No Jobs Found</h3>
              <p className="text-muted mb-0">
                Try adjusting filters or check back later.
              </p>
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="col-lg-6 mb-4">
              <div className="card job-card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="fw-bold mb-0">{job.title}</h5>
                    <span className="badge badge-neon px-3 py-2">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-muted mb-4">
                    {job.description.substring(0, 120)}...
                  </p>

                  <div className="small text-muted d-flex gap-3 flex-wrap">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>

                  <div className="mt-2 small text-muted">
                    📅 Last Date:{" "}
                    {job.lastDate
                      ? dayjs(job.lastDate).format("DD MMM YYYY")
                      : "No expiry"}
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 px-4 pb-4">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="d-block text-center text-white fw-bold bg-pirBlue py-2 rounded"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
