import React, { ReactNode } from 'react'
import SOPNav from '../components/SOPNav'

const layout = ({ children }:{ children : ReactNode }) => {
  return (
    <div className='p-6 bg-[#F8F6F1]'>
      <SOPNav />
      <div>{children}</div>
    </div>
  )
}

export default layout
