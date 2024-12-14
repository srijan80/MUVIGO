import React from 'react'

const EnteredText = ({ text }) => {
  return (
    <div className="text-black text-2xl text-center mt-10">
      {text ? `Searching for: ${text}` : 'No search performed'}
    </div>
  )
}

export default EnteredText