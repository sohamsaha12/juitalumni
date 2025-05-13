import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    <div>
                        <h5 className="font-bold mb-2">Contact Us</h5>
                        <ul>
                            <li>Email: kartick.mondal@jadavpuruniversity.in</li>
                            <li>Phone: +91 9635335745</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-2">Location</h5>
                        <ul>
                            <li>Plot No.8, Salt Lake Bypass, LB Block,</li>
                            <li>Sector III, Salt Lake City,</li>
                            <li>Kolkata - 700106.</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-2">Career</h5>
                        <ul>
                            <li>
                                <Link to="/login" className="text-blue-400">
                                    Join Us
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/ju-it/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400"
                                >
                                    Internships
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <span className="text-muted">
                        &copy; 2024 JU IT. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}