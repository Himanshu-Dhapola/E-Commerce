export const color = [
  "white",
  "red",
  "black",
  "blue",
  "green",
  "yellow",
  "pink",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "red", label: "Red" },
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "pink", label: "Pink" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "149-399", label: "$149 to $399" },
      { value: "399-999", label: "$399 to $999" },
      { value: "999-1599", label: "$999 to $1599" },
      { value: "1599-1999", label: "$1599 to $1999" },
      { value: "1999-2999", label: "$1999 to $2999" },
    ],
  },
  {
    id: "discount",
    name: "Discount",
    options: [
      { value: "10", label: "10% & Above" },
      { value: "20", label: "20% & Above" },
      { value: "30", label: "30% & Above" },
      { value: "40", label: "40% & Above" },
      { value: "50", label: "50% & Above" },
      { value: "60", label: "60% & Above" },
      { value: "70", label: "70% & Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in stock", label: "In Stock" },
      { value: "out of stock", label: "Out of Stock" },
    ],
  },
];
