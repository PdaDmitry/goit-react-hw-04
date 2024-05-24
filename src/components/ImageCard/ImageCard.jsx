export default function ImageCard({
  data: {
    urls: { small },
    alt_description,
  },
}) {
  return (
    <div>
      <img src={small} alt={alt_description} />
    </div>
  );
}
