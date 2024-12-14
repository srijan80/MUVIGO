import React, { useState } from 'react';

const InputBox = ({ onSearch }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value); 
  };

  const handleSearchClick = () => {
    if (inputText.trim()) {
      onSearch(inputText); 
      setInputText(''); 
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        className="rounded-lg p-2 w-64 text-black border border-gray-300 focus:outline-none focus:ring-0"
        type="text"
        placeholder="Enter a movie name"
        value={inputText}
        onChange={handleInputChange} // Update input text as user types
      />
      <button
        onClick={handleSearchClick} // Trigger search on button click
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default InputBox;
