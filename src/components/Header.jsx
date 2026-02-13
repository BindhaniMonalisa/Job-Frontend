"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";
const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define links for easier management and conditional rendering
  const publicNavLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/jobs", label: "Current Openings" },
    { path: "/contact", label: "Contact" },
  ];

  // Function to check if a link is active
  const isActive = (path) => pathname === path;

  /**
   * Handles user logout and redirects to home page
   */
  const handleLogout = () => {
    logout();
    router.push("/");
    // Close the mobile menu on logout
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Toggle mobile menu state
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {/* header-neon-border class added for the bottom glowy line */}
      <nav className="navbar navbar-expand-lg navbar-light header-neon-border py-3">
        <div className="container">
          {/* Logo with Briefcase icon and "Satmanyu job care" in accent green */}
          <Link className="navbar-brand fw-bold" href="/">
            <div className="d-flex align-items-center">
              <Image
                src="/joblogo.png"
                alt="Satmanyu Jobcare Logo"
                width={160}
                height={50}
                style={{ objectFit: "contain", height: "auto" }}
                priority
              />
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={handleMenuToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Linked 'show' class to state for mobile menu */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            {/* Close button for mobile sidebar */}
            <button
              className="sidebar-close d-lg-none"
              onClick={handleMenuToggle}
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Nav Links - Pushed to the right (ms-auto) */}
            <ul className="navbar-nav ms-auto align-items-center">
              {publicNavLinks.map((link) => {
                const active = isActive(link.path);

                return (
                  <li className="nav-item" key={link.path}>
                    <Link
                      href={link.path}
                      onClick={() => isMenuOpen && handleMenuToggle()}
                      className="nav-link fw-semibold px-3"
                      style={{
                        color: active ? "#14b306" : "#09336d",
                        transition: "color 0.2s ease-in-out",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Admin/Auth Links */}
            {/* <ul className="navbar-nav align-items-center">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link text-neon px-3 ${isActive('/admin/dashboard') ? 'active-neon-glow' : ''}`}
                      href="/admin/dashboard"
                      onClick={() => isMenuOpen && handleMenuToggle()}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-neon ms-lg-3 mt-3 mt-lg-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="btn btn-neon ms-lg-3 mt-3 mt-lg-0"
                    href="/admin/login"
                    onClick={() => isMenuOpen && handleMenuToggle()}
                  >
                    Admin Login
                  </Link>
                </li>
              )}
            </ul> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
