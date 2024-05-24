import { toast } from 'react-hot-toast';
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
        <input className={css.inputText} type="text" name="query" placeholder="Search images..." />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
