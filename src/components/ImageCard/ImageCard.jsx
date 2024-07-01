import css from './ImageCard.module.css';

export default function ImageCard({
  data: {
    urls: { small },
    alt_description,
  },
  onClick,
}) {
  return (
    <div>
      <img className={css.galleryImage} src={small} alt={alt_description} onClick={onClick} />
    </div>
  );
}
