import React, { useState } from 'react';

const InputBox = ({ onSearch }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value); 
  };

  const handleSearchClick = () => {
    if (inputText.trim()) {
      onSearch(inputText); //send search text to moviepage,musicpage,gamepage
      setInputText(''); 
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        className="rounded-lg p-2 w-64 text-black border border-gray-300 focus:outline-none focus:ring-0"
        type="text"
        placeholder="Type to Search"
        value={inputText}
        onChange={handleInputChange} 
      />
      <button
        onClick={handleSearchClick} 
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default InputBox;
