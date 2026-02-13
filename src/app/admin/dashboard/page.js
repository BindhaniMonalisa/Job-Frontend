"use client";

import React, { useState } from 'react'
import JobForm from '@/components/JobForm'
import JobList from '@/components/JobList'
import ProtectedRoute from '@/components/ProtectedRoute'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('add')

    return (
        <ProtectedRoute>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="text-neon mb-4">Admin Dashboard</h1>

                                {/* Tab Navigation */}
                                <ul className="nav nav-tabs mb-4">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('add')}
                                        >
                                            ➕ Add New Job
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('view')}
                                        >
                                            👁️ View/Edit Jobs
                                        </button>
                                    </li>
                                </ul>

                                {/* Tab Content */}
                                <div className="tab-content">
                                    {activeTab === 'add' && <JobForm />}
                                    {activeTab === 'view' && <JobList />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default AdminDashboard
