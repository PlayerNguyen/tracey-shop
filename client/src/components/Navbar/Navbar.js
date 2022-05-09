import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Controller from './Controller';
import Searchbox from './Searchbox';
import categoryApi from '../../requests/CategoryRequest';

export default function Navbar() {
  const [categories, setCategories] = React.useState([]);
  const [categoryMenuOpen, setCategoryMenuOpen] = React.useState(false);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await categoryApi.getAllCategory();
      setCategories(resp.data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className="bg-transparent 
                        md:bg-white md:p-4 drop-shadow-xl flex flex-col
                        md:flex-row gap-4 md:align-baseline md:items-center mt-3 md:mt-0 p-5"
    >
      <div>
        <Link to="/">
          <h1 className="text-blue-500 text-2xl uppercase font-bold">
            BRAND.com
          </h1>
        </Link>
      </div>
      <div
        className="bg-blue-300 flex flex-row p-2 rounded-lg font-semibold cursor-pointer relative"
        onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
      >
        <span className="flex-1">Danh mục sản phẩm</span>
        <FontAwesomeIcon className="p-1" icon="chevron-down" />
        {categoryMenuOpen && (
          <div className="absolute mt-8 z-40 top bg-white rounded-lg shadow-lg w-full md:w-48 p-2">
            {categories.map((item) => (
              <Link key={item._id} to={item.slug}>
                <div className="hover:bg-blue-500 px-2 py-1 rounded-lg hover:text-white">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <Searchbox />
      </div>
      <div>
        <Controller />
      </div>
    </div>
  );
}
