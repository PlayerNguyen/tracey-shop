import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CATEGORIES = [
  {
    category: 'Vi xử lý',
    slug: 'vi-xu-ly',
    product: null,
    quantity: 0,
  },
  {
    category: 'Bo mạch chủ',
    slug: 'bo-mach-chu',
    product: null,
    quantity: 0,
  },
  {
    category: 'RAM',
    slug: 'ram',
    product: null,
    quantity: 0,
  },
  {
    category: 'HDD',
    slug: 'hdd',
    product: null,
    quantity: 0,
  },
  {
    category: 'SSD',
    slug: 'ssd',
    product: null,
    quantity: 0,
  },
  {
    category: 'VGA',
    slug: 'vga',
    product: null,
    quantity: 0,
  },
  {
    category: 'Nguồn',
    slug: 'nguon',
    product: null,
    quantity: 0,
  },
  {
    category: 'Vỏ case',
    slug: 'vo-case',
    product: null,
    quantity: 0,
  },
  {
    category: 'Màn hình',
    slug: 'man-hinh',
    product: null,
    quantity: 0,
  },
];

const initialState = {
  categories: DEFAULT_CATEGORIES,
  products: [],
  openSelectProduct: false,
};

const build = createSlice({
  name: 'build',
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOpenSelectProduct: (state, action) => {
      state.openSelectProduct = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setProducts, setOpenSelectProduct, setCategories } =
  build.actions;

export default build.reducer;
