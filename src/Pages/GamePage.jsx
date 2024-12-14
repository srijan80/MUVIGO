import React, { useState } from 'react'
import InputBox from '../Components/InputBox'
import EnteredText from '../Components/EnteredText'

export const Game = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <>
        <div className="h-[calc(90vh-20px)] ">
          <div className="p-4 bg-black items-center  flex-col flex justify-center">
            <InputBox onSearch={handleSearch} />
          </div>
          <div className=''>

          <EnteredText text={searchText} />
          </div>
        </div>
    </>
  )
}