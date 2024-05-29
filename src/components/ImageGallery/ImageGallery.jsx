import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function itemGallery({ items, handleClick }) {
  return (
    <ul className={css.contGallery}>
      {items.map(item => (
        <li onClick={() => handleClick(item)} className={css.galleryItem} key={item.id}>
          <ImageCard data={item} />
        </li>
      ))}
    </ul>
  );
}

// str 8/  call the function () => handleClick(item) with the element. "item" by clicking on the element to open the mod. window
