import React from 'react'

const HeaderTwo = ({ title, className }) => {
  return (
    <h2 className={`text-2xl font-medium text-gray-900 ${className}`}>{title}</h2>
  )
}

export default HeaderTwo