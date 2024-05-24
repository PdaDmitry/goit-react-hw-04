import { toast } from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    if (entryField === '') {
      toast.error('The form field must be filled in!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'orange',
          color: 'black',
        },
      });
      return;
    }

    onSubmit(entryField);
    e.target.reset();
  };

  return (
    <header className={css.contHeader}>
      <form onSubmit={handleSubmit}>
        <div className={css.contInput}>
          <button className={css.searchBtn} type="submit">
            <IoSearch className={css.searchIcon} size={25} />
          </button>
          <input
            className={css.inputText}
            type="text"
            name="query"
            placeholder="Search images..."
          />
        </div>
      </form>
    </header>
  );
}
