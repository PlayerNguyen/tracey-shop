import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

/**
 * A dialog to suggest keyword or something ...
 */
const SearchBoxSuggestion = ({ visible, query }) => {
  const [history, setHistory] = useState([
    { name: "Thiết bị" },
    { name: "Điện thoại" },
  ]);

  const [suggestion, setSuggestion] = useState([
    { name: "Máy tính", url: "/may-tinh" },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`${
        visible ? "flex flex-col" : "hidden"
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
          {history && query === "" && history.length > 0 ? (
            <div className="p-2">
              <span className="text-gray-400 text-sm">Lịch sử tìm kiếm</span>
              <div className="flex flex-col">
                {history.map((item, index) => {
                  // Just fetch three items
                  if (index < 3) {
                    return (
                      <Link
                        key={index}
                        to={`/timkiem/${item.name}`}
                        className="px-2 py-1 mt-2 hover:text-blue-500"
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  return <></>;
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
                  return <></>;
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
  const [query, setQuery] = useState("");
  const [isValidQuery, setIsValidQuery] = useState(false);

  const searchBoxRef = useRef(null);

  const handleFocus = () => {
    console.log(`Set input focused to true`);
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
        />
        <button
          className={`p-2 m-1  rounded ${
            isValidQuery ? `text-white` : `text-gray-500`
          } ${
            isValidQuery ? `bg-blue-500` : `bg-blue-300`
          } ease-in-out duration-300`}
          disabled={isValidQuery}
        >
          <Search className="text-white" size={16} />
        </button>
      </div>
      <SearchBoxSuggestion visible={inputFocused} query={query} />
    </div>
  );
};

export default Searchbox;
