export const userInputs = [
  {
    id: 1,
    label: "Name and Surname",
    type: "text",
    placeholder: "John Doe",
    name: 'fullName'
  },
  {
    id: 2,
    label: "Email",
    type: "email",
    placeholder: "john_doe@gmail.com",
    name: 'email'
  },
  {
    id: 3,
    label: "Phone",
    type: "number",
    placeholder: "+1 234 567 89",
    name: 'phone'
  },
  {
    id: 4,
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
    name: 'address'
  },
  {
    id: 5,
    label: "Location",
    type: "text",
    placeholder: "USA",
    name: 'location'
  },
];

export const customerInitialState = {
  fullName: '',
  address: '',
  email: '',
  location: '',
  phone: ''
};

export const productInputs = [
  {
    id: 'title',
    label: "Title",
    type: "text",
    placeholder: "Apple Macbook Pro",
    name: 'title'
  },
  {
    id: 'description',
    label: "Description",
    type: "text",
    placeholder: "Description",
    name: 'description'
  },
  {
    id: 'category',
    label: "Category",
    type: "select",
    placeholder: "Computers",
    name: 'category'
  },
  {
    id: 'price',
    label: "Price",
    type: "number",
    placeholder: "100",
    name: 'price'
  },
  {
    id: 'inStock',
    label: "In-Stock number",
    type: "number",
    placeholder: "in stock",
    name: 'inStock'
  },
];

export const productInitialState = {
  title: '',
  description: '',
  category: '',
  price: '',
  inStock: ''
};