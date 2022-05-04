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
      <div className="bg-white grid grid-cols-6 gap-x-4">
        <table className="table-fixed w-full">
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  {index + 1}. {item.category}
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
