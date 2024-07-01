import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none',
  },
};
Modal.setAppElement('#root');

export default function ImageModal({
  item: {
    urls: { regular },
  },
  alt_description,
  isOpen,
  onRequestClose,
}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <img src={regular} alt={alt_description} />
    </Modal>
  );
}
