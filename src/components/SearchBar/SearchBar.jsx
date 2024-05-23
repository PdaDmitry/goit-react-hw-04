export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(e.target.elements.query.value);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search images..." />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
