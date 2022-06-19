import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * A dialog to suggest keyword or something ...
 */
const SearchBoxSuggestion = ({ visible, close, query }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([
    { name: 'Thiết bị' },
    { name: 'Điện thoại' },
  ]);

  const [suggestion, setSuggestion] = useState([
    { name: 'Máy tính', url: '/may-tinh' },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Load from localStorage
    const history = JSON.parse(localStorage.getItem('history'));

    setHistory(history || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history'));
    if (history) {
      const filtered = history.filter((item) => item.name.includes(query));
      setHistory(filtered);
    }
  }, [query]);

  const handleRemoveHistory = () => {
    // Remove all histories
    localStorage.removeItem('history');
    setHistory([]);
  };

  return (
    <div
      className={`${
        visible ? 'flex flex-col' : 'hidden'
      } p-2 absolute bg-white w-full shadow-sm rounded-b-lg`}
    >
      {loading ? (
        <div className="p-2 ">
          <div className="flex flex-col gap-3">
            <div className="h-5 bg-gray-200 animate-pulse"></div>
            <div className="h-5 bg-gray-200 animate-pulse"></div>
            <div className="h-5 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          {/* History */}
          {history && history.length > 0 ? (
            <div className="p-2">
              <div className="flex flex-row">
                <span className="text-gray-400 text-sm flex-1">
                  Lịch sử tìm kiếm
                </span>
                <span
                  className="text-blue-400 text-sm hover:underline cursor-pointer"
                  onClick={() => {
                    handleRemoveHistory();
                  }}
                >
                  Xoá lịch sử tìm kiếm
                </span>
              </div>
              <div className="flex flex-col">
                {history
                  .filter((_item, _index) => _index <= 3)
                  .map((item, index) => {
                    return (
                      <div className="flex flex-row my-1" key={index}>
                        <div
                          className="flex-1 hover:bg-gray-100 
                      rounded cursor-pointer align-middle justify-start px-2 py-1"
                          onClick={() => {
                            navigate(`/tim-kiem/${item.name}`);
                            close();
                          }}
                        >
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* Suggestion */}
          {suggestion && suggestion.length > 0 ? (
            <div className="p-2">
              <span className="text-gray-400 text-sm">Đề xuất từ khóa</span>
              <div className="flex flex-col">
                {suggestion.map((item, index) => {
                  // Just fetch three items
                  if (index < 3) {
                    return (
                      <Link
                        key={index}
                        to={item.url}
                        className="px-2 py-1 mt-2 hover:text-blue-500"
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

const Searchbox = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [isValidQuery, setIsValidQuery] = useState(false);

  const searchBoxRef = useRef(null);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleClickOutside = (e) => {
    // console.log(searchBoxRef.current);
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
      setInputFocused(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    document.addEventListener(`click`, handleClickOutside, true);
    return () => {
      document.removeEventListener(`click`, handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setIsValidQuery(query.length > 0);
  }, [query]);

  /**
   * Navigate user to the search result page
   * @param {*} keywords  the keyword to search
   */
  const handleSearch = (keywords) => {
    console.log(`Search for ${keywords}`);

    // Add this to history
    const history = JSON.parse(localStorage.getItem('history'));
    if (history) {
      // Make sure the history is not duplicated
      let newHistory = history.filter((item) => item.name !== keywords);
      newHistory = [{ name: keywords }, ...newHistory];
      localStorage.setItem('history', JSON.stringify(newHistory));
    } else {
      localStorage.setItem('history', JSON.stringify([{ name: keywords }]));
    }

    // Navigate to the search result page
    window.location.href = `/tim-kiem/${keywords}`;
  };

  return (
    <div className="searchbox relative" ref={searchBoxRef}>
      <div
        className={`bg-white md:bg-gray-100 rounded flex flex-row w-full ${
          inputFocused ? `rounded-b-none` : ``
        }`}
      >
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-2 bg-transparent rounded outline-none w-full"
          onFocus={handleFocus}
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => {
            // Not empty and press enter key
            if (e.key === 'Enter' && isValidQuery) {
              handleSearch(query);
            }
          }}
        />
        <button
          className={`p-2 m-1 rounded ${
            isValidQuery ? `text-white` : `text-gray-500`
          } ${
            isValidQuery ? `bg-blue-500` : `bg-blue-300`
          } ease-in-out duration-300`}
          disabled={!isValidQuery}
          onClick={(e) => {
            // console.log(e.target.disabled);
            handleSearch(query);
          }}
        >
          <FontAwesomeIcon icon="search" className="text-white" />
        </button>
      </div>
      <SearchBoxSuggestion
        visible={inputFocused}
        query={query}
        close={() => {
          setInputFocused(false);
        }}
      />
    </div>
  );
};

export default Searchbox;
