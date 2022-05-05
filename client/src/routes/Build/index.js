import React from 'react';

function Build() {
  const DEFAULT_ITEMS = [
    {
      category: 'Vi xử lý',
      product: null,
      quantity: 0,
    },
    {
      category: 'Bo mạch chủ',
      product: null,
      quantity: 0,
    },
    {
      category: 'RAM',
      product: null,
      quantity: 0,
    },
    {
      category: 'HDD',
      product: null,
      quantity: 0,
    },
    {
      category: 'SSD',
      product: null,
      quantity: 0,
    },
    {
      category: 'VGA',
      product: null,
      quantity: 0,
    },
    {
      category: 'Nguồn',
      product: null,
      quantity: 0,
    },
    {
      category: 'Vỏ case',
      product: null,
      quantity: 0,
    },
    {
      category: 'Màn hình',
      product: null,
      quantity: 0,
    },
  ];
  const [items, setItems] = React.useState(DEFAULT_ITEMS);

  return (
    <>
      <div className="bg-white p-4">
        <table className="w-full">
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-8 border border-gray-200 w-48">
                  {index + 1}. {item.category}
                </td>
                <td className="border border-gray-200 p-4">
                  {item.product ? (
                    <></>
                  ) : (
                    <>
                      <button className="bg-blue-500 text-white font-semibold p-2 rounded">
                        Chọn {item.category}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Build;
