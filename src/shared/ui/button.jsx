import React from 'react'

export const Button = ({
  type,
  className,
  content,
  onClick
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-gray-900 text-white font-medium py-2 rounded hover:bg-gray-800 ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
