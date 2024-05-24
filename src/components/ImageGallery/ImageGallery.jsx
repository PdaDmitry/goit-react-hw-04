import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function itemGallery({ items }) {
  return (
    <ul className={css.contGallery}>
      {items.map(item => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard data={item} />
        </li>
      ))}
    </ul>
  );
}
