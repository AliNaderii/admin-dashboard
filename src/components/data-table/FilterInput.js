// tools
import { useState } from "react";
import { useAsyncDebounce } from 'react-table';
// styles
import './filter-input.scss';

export default function FilterInput({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value => {
    setFilter(value);
  }, 300);

  return (
    <form className="filter-container">
      <input type="text"
        placeholder="Search the table ..."
        value={ value || '' }
        onChange={ (e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        } } />
    </form>
  );
}