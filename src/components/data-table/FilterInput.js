// tools
import { useState } from "react";
import { useAsyncDebounce } from 'react-table';
// styles
import './filter-input.scss';
// custom hooks
import { useTheme } from '../../hooks/useTheme';

export default function FilterInput({ filter, setFilter }) {
  const [value, setValue] = useState(filter);
  const { theme } = useTheme();

  const onChange = useAsyncDebounce(value => {
    setFilter(value);
  }, 300);

  return (
    <>
      <form
        className={ theme === 'light' ? "filter-container" : "filter-container dark" }
      >
        <input type="text"
          placeholder="Search the table ..."
          value={ value || '' }
          onChange={ (e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          } } />

      </form>
    </>
  );
}