"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { adminLogin } from '@/services/authService'

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await adminLogin(credentials)
            if (result.success) {
                login({ username: credentials.username }, result.token)
                router.push('/admin/dashboard')
            } else {
                setError(result.message || 'Login failed')
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.')
            console.error('Login error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body p-4">
                            <h2 className="text-center text-neon mb-4">Admin Login</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-neon w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>

                            {/* Demo Credentials */}
                            <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#f1f5f9', border: '1px solid var(--border-color)' }}>
                                <h6 className="fw-bold mb-2" style={{ color: 'var(--text-dark)' }}>Demo Credentials:</h6>
                                <div className="text-muted small">
                                    <div className="mb-1"><strong>Username:</strong> admin</div>
                                    <div><strong>Password:</strong> password</div>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="mt-3">
                                <small className="text-muted">
                                    <strong>Note:</strong> This is a demo application. For production,
                                    implement proper authentication with Firebase, Auth0, or similar service.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
