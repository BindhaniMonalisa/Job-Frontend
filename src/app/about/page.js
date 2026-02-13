import React from 'react'

export default function About() {
    const teamMembers = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            bio: '15+ years in tech recruitment and talent acquisition.',
            emoji: '👩‍💼'
        },
        {
            id: 2,
            name: 'Mike Chen',
            role: 'Head of Recruitment',
            bio: 'Specialized in engineering and product roles.',
            emoji: '👨‍💻'
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'HR Consultant',
            bio: 'Expert in career development and coaching.',
            emoji: '🌟'
        }
    ]

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <h1 className="text-center mb-5 text-pirBlue">About Satmanyu job care</h1>

                    <div className="card p-4 mb-5">
                        <div className="card-body">
                            <h3 className="text-neon mb-3">Our Mission</h3>
                            <p className="lead">
                                At Satmanyu job care, we bridge the gap between exceptional talent and forward-thinking companies.
                                We believe that the right career opportunity can transform lives and drive innovation.
                            </p>
                            <p>
                                Founded in 2023, we've successfully placed hundreds of professionals in roles where they can
                                thrive and make meaningful contributions. Our personalized approach ensures that both
                                candidates and companies find perfect matches.
                            </p>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="text-neon">🎯 Our Values</h5>
                                    <ul className="mt-3">
                                        <li>Integrity in every interaction</li>
                                        <li>Excellence in service delivery</li>
                                        <li>Innovation in recruitment strategies</li>
                                        <li>Partnership with candidates and clients</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="text-neon">📈 Our Impact</h5>
                                    <ul className="mt-3">
                                        <li>500+ successful placements</li>
                                        <li>95% candidate satisfaction rate</li>
                                        <li>87% retention after 1 year</li>
                                        <li>50+ partner companies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-center mb-4 text-pirBlue">Meet Our Team</h2>
                    <div className="row">
                        {teamMembers.map(member => (
                            <div key={member.id} className="col-md-4 mb-4">
                                <div className="h-100 text-center">
                                    <div className="card-body">
                                        <div className="text-neon mb-3" style={{ fontSize: '4rem' }}>
                                            {member.emoji}
                                        </div>
                                        <h5 className="card-title fw-bold text-neon">{member.name}</h5>
                                        <h6 className="text-pirBlue mt-3">{member.role}</h6>
                                        <p className="card-text mt-4">{member.bio}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
