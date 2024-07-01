import Modal from 'react-modal';

export default function ImageModal({
  item: {
    urls: { regular },
  },
  alt_description,
  isOpen,
  onRequestClose,
  style,
}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <img src={regular} alt={alt_description} />
    </Modal>
  );
}
