export default function ImageModal({
  item: {
    urls: { regular },
  },
  alt_description,
}) {
  return (
    <div>
      <img src={regular} alt={alt_description} />
    </div>
  );
}
