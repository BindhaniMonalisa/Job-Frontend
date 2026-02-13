import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 text-pirBlue">
                Find Your <span className="text-neon">Dream Job</span> Today
              </h1>
              <p className="mb-4 text-pirBlue fw-semibold text-justify">
                Satmanyu job care connects exceptional talent with top
                companies. Explore exciting career opportunities and take the
                next step in your professional journey.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="btn sear bg-pirGreen text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Search
                </Link>
                <Link
                  href="/contact"
                  className="btn bg-pirBlue text-white shadow-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <Image
                src="/hero-image.png"
                alt="Find your dream job"
                width={520}
                height={520}
                className="img-fluid shadow"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold fs-1 mb-3 text-pirBlue">
                Easy steps to 
                <br/>
                <span className="text-neon">land your next job</span>?
              </h2>
              <p className="lead  text-pirBlue fw-semibold">
               Creating a beautiful job website is not easy always. 
               <br/>
               To make your life easier, we are introducing Justcamp template.
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="h-100 text-center p-4 border-0">
                <div className="card-body">
                  <div className="mb-3" style={{ fontSize: "3rem" }}>
                    ⚡
                  </div>
                  <h5 className="fw-bold text-pirBlue">Fast Placement</h5>
                  <p className="card-text text-muted mt-4 p-3">
                    Quick connection with top employers and streamlined
                    application process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 text-center p-4 border-0">
                <div className="card-body">
                  <div className="mb-3" style={{ fontSize: "3rem" }}>
                    🎯
                  </div>
                  <h5 className="card-title fw-bold text-pirBlue">Targeted Opportunities</h5>
                  <p className="card-text text-muted mt-4 p-3">
                    Carefully curated job matches based on your skills and
                    career goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 text-center p-4 border-0">
                <div className="card-body">
                  <div className="mb-3" style={{ fontSize: "3rem" }}>
                    🤝
                  </div>
                  <h5 className="card-title fw-bold text-pirBlue">Expert Support</h5>
                  <p className="card-text text-muted mt-4 p-3">
                    Dedicated recruiters providing personalized guidance
                    throughout your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5"
        style={{ backgroundColor: "#f0f9ff", borderTop: "1px solid #e0f2fe" }}
      >
        <div className="container text-center py-4">
          <h2 className="mb-3 fw-bold text-pirBlue">Ready to Advance Your Career?</h2>
          <p className="lead mb-4 text-muted ">
            Join thousands of professionals who found their dream jobs through
            Satmanyu job care
          </p>
          <Link href="/jobs" className="p-2 text-white fw-bold fs-5 bg-pirBlue rounded-3">
            Explore Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
