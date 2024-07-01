import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function itemGallery({ items, handleClick }) {
  return (
    <ul className={css.contGallery}>
      {items.map(item => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard data={item} onClick={() => handleClick(item)} />
        </li>
      ))}
    </ul>
  );
}

// call the function () => handleClick(item) with the element. "item" by clicking on the element to open the mod. window
