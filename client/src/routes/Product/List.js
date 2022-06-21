import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductItem } from '../../components';
import productApi from '../../requests/ProductRequest';
import Select from 'react-select';
import { classNames } from '../../helpers/Common';

function ProductList(props) {
  const LOW_TO_HIGH = 2;
  const HIGH_TO_LOW = 3;
  const sortOptions = [
    { value: LOW_TO_HIGH, label: 'Giá thấp đến cao' },
    { value: HIGH_TO_LOW, label: 'Giá cao đến thấp' },
  ];

  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [manufacturers, setManufacturers] = React.useState([]);
  const [filters, setFilters] = React.useState({
    price: {
      min: null,
      max: null,
    },
    manufacturer: '',
  });
  const [sortOption, setSortOption] = React.useState(null);

  const params = useParams();

  React.useEffect(() => {
    const manufacturers = products.map((_product) => _product.manufacturer);
    const distinctManufacturers = [];
    manufacturers.forEach((manufacturer) => {
      const existManufacturer = distinctManufacturers.find(
        (_m) => _m._id === manufacturer._id,
      );
      if (!existManufacturer) {
        distinctManufacturers.push({ ...manufacturer, count: 1 });
      } else {
        existManufacturer.count++;
      }
    });
    setManufacturers(distinctManufacturers);
  }, [products]);

  React.useEffect(() => {
    if (params.category) {
      fetchProducts(params.category);
    }
  }, [params.category]);

  React.useEffect(() => {
    let _filteredProducts = [...products];
    if (filters.manufacturer) {
      _filteredProducts = products.filter(
        (_p) => _p.manufacturer?._id === filters.manufacturer,
      );
    }
    if (filters.price.min || filters.price.max) {
      const minValue = filters.price.min || 0;
      const maxValue = filters.price.max || Number.MAX_VALUE;
      _filteredProducts = _filteredProducts.filter((_p) => {
        const price = _p.sale || _p.price;
        return price >= minValue && price <= maxValue;
      });
    }
    if (sortOption) {
      _filteredProducts = _filteredProducts.sort((a, b) => {
        const priceA = a.sale || a.price;
        const priceB = b.sale || b.price;
        if (sortOption.value === LOW_TO_HIGH) {
          return priceA - priceB;
        }
        return priceB - priceA;
      });
    }
    setFilteredProducts(_filteredProducts);
  }, [filters, products, sortOption]);

  const fetchProducts = async (categorySlug) => {
    try {
      const resp = await productApi.getProductByCategory(categorySlug);
      setProducts(resp.data);
      setFilteredProducts(resp.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectManufacturer = (manufacturerId) => {
    let newManufacturer = manufacturerId;
    if (manufacturerId === filters.manufacturer) {
      newManufacturer = '';
    }
    setFilters({ ...filters, manufacturer: newManufacturer });
  };

  const handleChangeFilterPrice = (name) => (e) => {
    const value = e.target.value;
    setFilters({ ...filters, price: { ...filters.price, [name]: value } });
  };

  const handleChangeSort = (option) => {
    setSortOption(option);
  };

  return (
    <>
      <div className="w-full grid grid-cols-6 gap-8">
        {/* FILTERS */}
        <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-4">
          <div className="font-semibold text-lg border border-gray-300 rounded-lg text-center py-1">
            Lọc sản phẩm
          </div>
          <div>
            <span className="font-semibold">Khoảng giá</span>
            <div className="flex">
              <input
                defaultValue={filters.price.min}
                type="number"
                min={0}
                className="input w-full mr-2"
                placeholder="Từ"
                onBlur={handleChangeFilterPrice('min')}
              />
              {'-'}
              <input
                defaultValue={filters.price.max}
                type="number"
                min={filters.price.min}
                className="input w-full ml-2"
                placeholder="Tới"
                onBlur={handleChangeFilterPrice('max')}
              />
            </div>
          </div>
          <div>
            <span className="font-semibold">Hãng sản xuất</span>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {manufacturers.map((manufacturer) => (
                <div
                  key={manufacturer._id}
                  className={classNames(
                    'cursor-pointer select-none',
                    filters.manufacturer === manufacturer._id &&
                      'underline font-semibold',
                  )}
                  onClick={() => handleSelectManufacturer(manufacturer._id)}
                >
                  {manufacturer.name} ({manufacturer.count})
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="mb-4 font-semibold flex items-center">
            Sắp xếp theo:{' '}
            <Select
              className="ml-4 w-60"
              options={sortOptions}
              onChange={handleChangeSort}
              value={sortOption}
            />
          </div>
          <div className="col-span-5 grid grid-cols-5 gap-8">
            {filteredProducts.map((_product) => (
              <ProductItem product={_product} key={_product._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
