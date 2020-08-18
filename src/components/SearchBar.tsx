import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCharacters, clearCharacters } from '../redux/charsDuck';

const SearchBar = ({ getCharacters, clearCharacters, chars }: any) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedInput.length < 3) {
      return;
    }

    getCharacters(debouncedInput);
  }, [debouncedInput, getCharacters]);

  const resetInput = () => {
    setInput('');

    clearCharacters();
  };

  return (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className={`h-10 self-center w-full px-2 min-w-0 rounded-l-full bg-gray-900 text-white ${
          input === '' && chars.results && chars.results.length === 0
            ? 'rounded-r-full'
            : ''
        }`}
      />
      {input === '' && chars.results && chars.results.length === 0 ? null : (
        <button
          onClick={resetInput}
          className="self-center h-10 rounded-r-full bg-gray-900 flex">
          <svg
            className="mr-2 self-center text-gray-400"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    chars: state.characters,
  };
};

export default connect(mapStateToProps, { getCharacters, clearCharacters })(
  SearchBar
);
