"use client";

import React, { useState, useEffect, useRef } from 'react';
// FIX: Import 'registerables' to ensure all Chart.js components are included.
import { Chart, registerables } from 'chart.js';


// FIX: Register all built-in components (lines, bars, legends, tooltips, etc.).
// This is a one-time setup that must be done before creating any chart instances.
Chart.register(...registerables);


// Main App component that encapsulates the entire application
const App = () => {
    // State to manage which section of the page is currently active
    const [activeSection, setActiveSection] = useState('overview');


    // State to manage the open/closed state of each accordion panel
    const [accordionState, setAccordionState] = useState({
        intakeA: false,
        intakeB: false,
        intakeC: false,
        designA: false,
        designB: false,
        designC: false,
        developmentA: false,
        developmentB: false,
        developmentC: false,
        testingA: false,
        testingB: false,
        testingC: false,
        oversightA: false,
        oversightB: false,
    });


    // Refs for the chart canvas element and the chart instance
    const chartRef = useRef(null);
    const kpiChartInstance = useRef(null);


    // useEffect hook to handle routing based on URL hash
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            setActiveSection(hash || 'overview');
        };


        // Set initial section from URL hash or default to 'overview'
        handleHashChange();


        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);


        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);


    // Function to handle navigation clicks
    const handleNavClick = (sectionId) => {
        window.location.hash = sectionId;
        setActiveSection(sectionId);
    };


    // Function to handle accordion clicks, toggling the state for a specific panel
    const handleAccordionClick = (panel) => {
        setAccordionState(prevState => {
            const newState = { ...prevState
            };
            // Close all other accordions and open the clicked one
            Object.keys(newState).forEach(key => {
                newState[key] = (key === panel) ? !prevState[key] : false;
            });
            return newState;
        });
    };


    // useEffect hook for the KPI chart, triggered when the 'oversight' section is active
    useEffect(() => {
        if (activeSection === 'oversight' && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            kpiChartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Schedule Performance (SPI)', 'Cost Performance (CPI)', 'Test Pass Rate', 'Resource Utilization'],
                    datasets: [{
                        label: 'Project KPIs',
                        data: [1.1, 1.05, 98, 85],
                        backgroundColor: [
                            'rgba(74, 144, 226, 0.6)',
                            'rgba(80, 227, 194, 0.6)',
                            'rgba(245, 166, 35, 0.6)',
                            'rgba(189, 16, 224, 0.6)'
                        ],
                        borderColor: [
                            'rgba(74, 144, 226, 1)',
                            'rgba(80, 227, 194, 1)',
                            'rgba(245, 166, 35, 1)',
                            'rgba(189, 16, 224, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 100
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        if (context.label.includes('Rate') || context.label.includes('Utilization')) {
                                            label += context.parsed.y + '%';
                                        } else {
                                            label += context.parsed.y;
                                        }
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // FIX: The `useEffect` cleanup function now destroys the chart instance.
        // This prevents memory leaks and ensures a new chart is created properly
        // each time the `activeSection` changes to 'oversight'.
        return () => {
            if (kpiChartInstance.current) {
                kpiChartInstance.current.destroy();
            }
        };
    }, [activeSection]); // This effect runs only when the activeSection state changes


    // JSX for the main application structure
    return (
        <div className="antialiased">
            {/* Tailwind CSS and custom styles are applied here */}
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #F8F7F4;
                    color: #2c3e50;
                }
                .nav-link {
                    transition: all 0.3s ease;
                    border-bottom: 2px solid transparent;
                }
                .nav-link.active, .nav-link:hover {
                    border-bottom-color: #4A90E2;
                    color: #4A90E2;
                }
                .content-section {
                    display: none;
                }
                .content-section.active {
                    display: block;
                }
                .card {
                    background-color: #FFFFFF;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
                }
                .flow-step {
                    transition: all 0.3s ease;
                    border: 1px solid #e2e8f0;
                }
                .flow-step:hover {
                    background-color: #4A90E2;
                    color: white;
                    border-color: #4A90E2;
                }
                .flow-arrow {
                    color: #cbd5e1;
                }
                .accordion-header {
                    cursor: pointer;
                }
                .accordion-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease-out;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 350px;
                    max-height: 400px;
                }
                @media (min-width: 768px) {
                    .chart-container {
                        height: 400px;
                    }
                }
                `}
            </style>


            <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-800">Project Development SOP</span>
                        </div>
                        <nav className="hidden md:flex space-x-4 lg:space-x-6">
                            <a href="#overview" onClick={() => handleNavClick('overview')} className={`nav-link px-3 py-2 text-sm font-medium text-gray-600 ${activeSection === 'overview' ? 'active' : ''}`}>Overview</a>
                            <a href="#intake" onClick={() => handleNavClick('intake')} className={`nav-link px-3 py-2 text-sm font-medium text-gray-600 ${activeSection === 'intake' ? 'active' : ''}`}>Intake & Planning</a>
                            <a href="#design" onClick={() => handleNavClick('design')} className={`nav-link px-3 py-2 text-sm font-medium text-gray-600 ${activeSection === 'design' ? 'active' : ''}`}>Design</a>
                            <a href="#development" onClick={() => handleNavClick('development')} className={`nav-link px-3 py-2 text-sm font-medium text-gray-600 ${activeSection === 'development' ? 'active' : ''}`}>Development</a>
                            <a href="#testing" onClick={() => handleNavClick('testing')} className={`nav-link px-3 py-2 text-sm font-medium text-gray-600 ${activeSection === 'testing' ? 'active' : ''}`}>Testing</a>
                            <a href="#oversight" onClick={() => handleNavClick('oversight')} className={`nav-link px-3 py-2 text-sm font-medium text-gray-600 ${activeSection === 'oversight' ? 'active' : ''}`}>Oversight</a>
                        </nav>
                        <div className="md:hidden">
                            <select
                                id="mobile-nav"
                                value={activeSection}
                                onChange={(e) => handleNavClick(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="overview">Overview</option>
                                <option value="intake">Intake & Planning</option>
                                <option value="design">Design</option>
                                <option value="development">Development</option>
                                <option value="testing">Testing</option>
                                <option value="oversight">Oversight</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>


            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {activeSection === 'overview' && (
                    <section id="overview" className="content-section active">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">A Living Guide to Our Project Lifecycle</h1>
                            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">This interactive guide outlines our standard operating procedure for tech and digital marketing projects. Its purpose is to ensure consistency, efficiency, and quality from start to finish. Use the navigation to explore each phase of our collaborative process.</p>
                        </div>
                        <div className="card p-6 md:p-8 mb-12">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Project Flow at a Glance</h2>
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flow-step p-4 rounded-lg text-center w-full md:w-auto">Intake</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 rounded-lg text-center w-full md:w-auto">Design</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 rounded-lg text-center w-full md:w-auto">Development</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 rounded-lg text-center w-full md:w-auto">Testing</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 rounded-lg text-center w-full md:w-auto">Oversight</div>
                            </div>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Roles & Responsibilities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="card p-6 role-card">
                                    <h3 className="text-xl font-semibold mb-2">Project Manager (PM)</h3>
                                    <p className="text-gray-600">Orchestrates the project, managing timelines, budget, and client communication. Supervises all project activities.</p>
                                </div>
                                <div className="card p-6 role-card">
                                    <h3 className="text-xl font-semibold mb-2">Tech Lead (TL)</h3>
                                    <p className="text-gray-600">Drives the technical vision, making key architectural decisions and ensuring code quality.</p>
                                </div>
                                <div className="card p-6 role-card">
                                    <h3 className="text-xl font-semibold mb-2">Design Team</h3>
                                    <p className="text-gray-600">Creates the user interface, experience, and prototypes using Figma to bring the vision to life.</p>
                                </div>
                                <div className="card p-6 role-card">
                                    <h3 className="text-xl font-semibold mb-2">Development Team</h3>
                                    <p className="text-gray-600">Builds the technical solution, including both frontend and backend implementation.</p>
                                </div>
                                <div className="card p-6 role-card">
                                    <h3 className="text-xl font-semibold mb-2">Testing Team</h3>
                                    <p className="text-gray-600">Ensures software quality and reliability through comprehensive test plans and execution.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {activeSection === 'intake' && (
                    <section id="intake" className="content-section active">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phase 1: Intake & Initial Planning</h1>
                        <p className="text-lg text-gray-600 mb-8">This initial phase is foundational to project success. Here, the Project Manager and Tech Lead collaborate to thoroughly understand the client's needs, define the project's scope, break down the work, and create a realistic timeline and resource plan. The goal is to establish a clear and agreed-upon roadmap before any design or development begins.</p>
                        <div className="space-y-4">
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('intakeA')}>
                                    <h2 className="text-xl font-semibold">A. Project Document Reception and Analysis</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.intakeA ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.intakeA ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">The PM receives the project document (SOW, brief) and conducts a thorough analysis to understand goals, requirements, and context. This proactive review identifies ambiguities early, mitigating risks like scope creep and costly rework later in the project.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('intakeB')}>
                                    <h2 className="text-xl font-semibold">B. Defining Project Scope and Requirements</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.intakeB ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.intakeB ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">The PM and TL work with stakeholders to define clear goals and document detailed functional and non-functional requirements. A formal Project Scope Statement is created, delineating what is in and out of scope, along with a change control process to manage future modifications.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('intakeC')}>
                                    <h2 className="text-xl font-semibold">C. Timeline Creation and Resource Planning</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.intakeC ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.intakeC ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">The TL, with the PM, develops a detailed project timeline, identifying milestones and estimating task durations. They collaboratively plan resources, allocating personnel from design, development, and testing teams to ensure a balanced and realistic schedule with built-in flexibility.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {activeSection === 'design' && (
                    <section id="design" className="content-section active">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phase 2: Design</h1>
                        <p className="text-lg text-gray-600 mb-8">In the Design phase, creative vision meets practical application. The Design Team uses Figma to craft wireframes, mockups, and interactive prototypes. This phase is highly collaborative, involving internal reviews for technical feasibility and client reviews for approval, ensuring the final design is beautiful, usable, and buildable before it's handed off to the development team.</p>
                        <div className="space-y-4">
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('designA')}>
                                    <h2 className="text-xl font-semibold">A. Design and Prototype Creation in Figma</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.designA ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.designA ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">Based on approved requirements, the Design Team uses Figma to create wireframes, mockups, and interactive prototypes. A comprehensive design system is built to ensure visual consistency. This rapid prototyping allows for early user feedback and validation, significantly reducing the risk of costly rework during development.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('designB')}>
                                    <h2 className="text-xl font-semibold">B. Internal Review and Client Approval</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.designB ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.designB ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">Designs undergo an internal review with the PM and TL to ensure technical feasibility. Following this, prototypes are presented to the client for feedback and formal approval. This structured process ensures the design is aligned with both technical constraints and client expectations before moving forward.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('designC')}>
                                    <h2 className="text-xl font-semibold">C. Design Handoff to Development</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.designC ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.designC ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">Upon client approval, a comprehensive handoff package is prepared. This includes organized Figma files, interactive prototypes, a clear style guide, and detailed documentation. A formal handoff meeting ensures developers have all necessary information, minimizing ambiguity and bridging the gap between design and code.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {activeSection === 'development' && (
                    <section id="development" className="content-section active">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phase 3: Development</h1>
                        <p className="text-lg text-gray-600 mb-8">This is where the approved designs are transformed into a functional product. Guided by the Tech Lead, the backend and frontend developers write, test, and integrate code. The process emphasizes quality through continuous guidance, rigorous code reviews, and automated testing, ensuring the final build is robust, scalable, and true to the original vision.</p>
                        <div className="space-y-4">
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('developmentA')}>
                                    <h2 className="text-xl font-semibold">A. Technical Planning and Architecture</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.developmentA ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.developmentA ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">The Tech Lead defines the project's technical architecture, selects the development stack, and establishes coding standards. This foundational planning prevents technical debt and ensures the product is scalable and maintainable long-term.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('developmentB')}>
                                    <h2 className="text-xl font-semibold">B. Development Execution and Task Management</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.developmentB ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.developmentB ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">Developers begin coding, following the technical plan. Tasks are managed in a project tool, and daily stand-ups ensure progress is tracked and blockers are resolved quickly, maintaining development velocity.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('developmentC')}>
                                    <h2 className="text-xl font-semibold">C. Code Review and Quality Assurance</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.developmentC ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.developmentC ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">The Tech Lead oversees a rigorous code review process to ensure quality and consistency. Automated unit and integration tests are integrated into the CI/CD pipeline, catching bugs early and ensuring software reliability from the start.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {activeSection === 'testing' && (
                    <section id="testing" className="content-section active">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phase 4: Testing</h1>
                        <p className="text-lg text-gray-600 mb-8">The Testing phase is dedicated to ensuring the product is reliable, functional, and meets all requirements. The Testing Team develops and executes a comprehensive test plan, meticulously reports bugs, and works with developers on resolutions. The phase culminates in User Acceptance Testing (UAT), where the client gives the final sign-off, confirming the solution meets their business needs.</p>
                        <div className="space-y-4">
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('testingA')}>
                                    <h2 className="text-xl font-semibold">A. Test Planning and Strategy</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.testingA ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.testingA ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">The Testing Team, with the PM and TL, develops a comprehensive test plan outlining the scope, objectives, and types of testing (functional, integration, UAT). This ensures test coverage is thorough and aligned with business goals.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('testingB')}>
                                    <h2 className="text-xl font-semibold">B. Test Execution and Bug Tracking</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.testingB ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.testingB ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">Tests are executed in an environment mimicking production. Bugs are documented in a tracking system with clear, detailed reports to accelerate resolution. The team re-tests fixes and performs regression testing to prevent new issues.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('testingC')}>
                                    <h2 className="text-xl font-semibold">C. User Acceptance Testing (UAT) and Sign-off</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.testingC ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.testingC ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">In the final testing stage, the client or end-users validate that the system meets their business needs. The PM facilitates this process. Successful UAT leads to formal client sign-off, providing a clear "definition of done" and confirming the product is ready for deployment.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {activeSection === 'oversight' && (
                    <section id="oversight" className="content-section active">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phase 5: Project Oversight & Management</h1>
                        <p className="text-lg text-gray-600 mb-8">Oversight is not a final phase, but a continuous process that runs throughout the project lifecycle. It involves ongoing monitoring of progress, budget, and timelines, as well as proactive risk and scope change management. This ensures the project stays on track, stakeholders remain informed, and the final delivery aligns with the initial agreement.</p>
                        <div className="space-y-4">
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('oversightA')}>
                                    <h2 className="text-xl font-semibold">A. Ongoing Monitoring and Reporting</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.oversightA ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.oversightA ? '700px' : '0' }}>
                                    <div className="pb-6 text-gray-700 space-y-6">
                                        <p>The PM continuously tracks progress against objectives using KPIs. Regular, concise progress reports are distributed to stakeholders, providing transparency and enabling informed decision-making. This feedback loop allows for timely corrective actions to keep the project on course.</p>
                                        <div className="chart-container">
                                            <canvas ref={chartRef} id="kpiChart"></canvas>
                                        </div>
                                        <p className="text-sm text-center text-gray-500">Example: Visualizing key performance indicators like the Schedule Performance Index (SPI) and Cost Performance Index (CPI) helps stakeholders quickly assess project health. A value greater than 1.0 indicates favorable performance.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="accordion-header p-6 flex justify-between items-center" onClick={() => handleAccordionClick('oversightB')}>
                                    <h2 className="text-xl font-semibold">B. Risk and Scope Change Management</h2>
                                    <span className={`text-2xl font-light transform transition-transform duration-300 ${accordionState.oversightB ? 'rotate-180' : 'rotate-0'}`}>&darr;</span>
                                </div>
                                <div className="accordion-content px-6" style={{ maxHeight: accordionState.oversightB ? '500px' : '0' }}>
                                    <p className="pb-6 text-gray-700">Potential risks are identified early and documented in a risk register with mitigation strategies. A formal change management process is used to control any modifications to scope, time, or cost, ensuring that all changes are evaluated for their full impact before being approved. This prevents scope creep and protects the project's integrity.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};


export default App;