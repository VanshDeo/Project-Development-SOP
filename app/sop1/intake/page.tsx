"use client";

import React from 'react'
import { useState } from 'react';

const Page = () => {

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

    interface AccordionState {
        intakeA: boolean;
        intakeB: boolean;
        intakeC: boolean;
        designA: boolean;
        designB: boolean;
        designC: boolean;
        developmentA: boolean;
        developmentB: boolean;
        developmentC: boolean;
        testingA: boolean;
        testingB: boolean;
        testingC: boolean;
        oversightA: boolean;
        oversightB: boolean;
    }

    const handleAccordionClick = (panel: keyof AccordionState): void => {
        setAccordionState((prevState: AccordionState) => {
            const newState: AccordionState = { ...prevState };
            // Close all other accordions and open the clicked one
            (Object.keys(newState) as Array<keyof AccordionState>).forEach((key) => {
                newState[key] = (key === panel) ? !prevState[key] : false;
            });
            return newState;
        });
    };



  return (
    <div>
      <section id="intake" className="content-section active p-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phase 1: Intake & Initial Planning</h1>
                        <p className="text-lg text-gray-600 mb-8">This initial phase is foundational to project success. Here, the Project Manager and Tech Lead collaborate to thoroughly understand the client&apos;s needs, define the project&apos;s scope, break down the work, and create a realistic timeline and resource plan. The goal is to establish a clear and agreed-upon roadmap before any design or development begins.</p>
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
    </div>
  )
}

export default Page
