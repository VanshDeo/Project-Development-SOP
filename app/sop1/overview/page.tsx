import React from 'react'

const overview = () => {
  return (
    <div>
      <section id="overview" className="content-section active">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-10 sm:text-5xl">A Living Guide to Our Project Lifecycle</h1>
                            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">This interactive guide outlines our standard operating procedure for tech and digital marketing projects. Its purpose is to ensure consistency, efficiency, and quality from start to finish. Use the navigation to explore each phase of our collaborative process.</p>
                        </div>
                        <div className="card p-6 md:p-8 mb-12 max-w-4xl mx-auto shadow-md bg-white rounded-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Project Flow at a Glance</h2>
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flow-step p-4 border border-gray-300 hover:bg-blue-500 hover:text-white duration-300 rounded-lg text-center w-full md:w-auto cursor-pointer">Intake</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 border border-gray-300 hover:bg-blue-500 hover:text-white duration-300 rounded-lg text-center w-full md:w-auto cursor-pointer">Design</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 border border-gray-300 hover:bg-blue-500 hover:text-white duration-300 rounded-lg text-center w-full md:w-auto cursor-pointer">Development</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 border border-gray-300 hover:bg-blue-500 hover:text-white duration-300 rounded-lg text-center w-full md:w-auto cursor-pointer">Testing</div>
                                <div className="flow-arrow text-2xl font-light transform md:-rotate-0">&rarr;</div>
                                <div className="flow-step p-4 border border-gray-300 hover:bg-blue-500 hover:text-white duration-300 rounded-lg text-center w-full md:w-auto cursor-pointer">Oversight</div>
                            </div>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Roles & Responsibilities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="card p-6 role-card shadow-lg rounded-lg bg-white hover:scale-105 duration-300">
                                    <h3 className="text-xl font-semibold mb-2">Project Manager (PM)</h3>
                                    <p className="text-gray-600">Orchestrates the project, managing timelines, budget, and client communication. Supervises all project activities.</p>
                                </div>
                                <div className="card p-6 role-card shadow-lg rounded-lg bg-white hover:scale-105 duration-300">
                                    <h3 className="text-xl font-semibold mb-2">Tech Lead (TL)</h3>
                                    <p className="text-gray-600">Drives the technical vision, making key architectural decisions and ensuring code quality.</p>
                                </div>
                                <div className="card p-6 role-card shadow-lg rounded-lg bg-white hover:scale-105 duration-300">
                                    <h3 className="text-xl font-semibold mb-2">Design Team</h3>
                                    <p className="text-gray-600">Creates the user interface, experience, and prototypes using Figma to bring the vision to life.</p>
                                </div>
                                <div className="card p-6 role-card shadow-lg rounded-lg bg-white hover:scale-105 duration-300">
                                    <h3 className="text-xl font-semibold mb-2">Development Team</h3>
                                    <p className="text-gray-600">Builds the technical solution, including both frontend and backend implementation.</p>
                                </div>
                                <div className="card p-6 role-card shadow-lg rounded-lg bg-white hover:scale-105 duration-300">
                                    <h3 className="text-xl font-semibold mb-2">Testing Team</h3>
                                    <p className="text-gray-600">Ensures software quality and reliability through comprehensive test plans and execution.</p>
                                </div>
                            </div>
                        </div>
                    </section>
    </div>
  )
}

export default overview
