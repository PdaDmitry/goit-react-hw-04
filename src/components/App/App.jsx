import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import fetchPhotos from '../../api';

import Modal from 'react-modal';
import ImageModal from '../ImageModal/ImageModal';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';
// import css from './App.module.css';

//styles for modal window
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export default function App() {
  const [query, setQuery] = useState(''); //input element value state
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [maxPages, setMaxPages] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false); //initial state of the modal window
  const [selectedImage, setSelectedImage] = useState(null); //initial state of the selected element for the modal window

  const openModal = image => {
    setSelectedImage(image); //the element clicked on for the modal window is saved to the state
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const searchImages = async newQuery => {
    setQuery(`${nanoid()}/${newQuery}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchData() {
      try {
        setError(false);
        setLoading(true);

        const { results, maxPages } = await fetchPhotos(query.split('/')[1], page);

        setImages(prevImages => {
          return [...prevImages, ...results];
        });
        setMaxPages(maxPages);
        if (page === maxPages) {
          toast.error(`We're sorry, but you've reached the end of search results!`, {
            duration: 4000,
            position: 'bottom-center',
            style: {
              background: 'orange',
              color: 'black',
            },
          });
          return;
        } else if (results.length === 0) {
          setImages([]);
          toast.error(`We're sorry, but no results were found for your request...`, {
            duration: 4000,
            position: 'top-center',
            style: {
              background: 'orange',
              color: 'black',
            },
          });
          return;
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} handleClick={openModal} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && page < maxPages && <LoadMoreBtn onClick={handleLoadMore} />}
      <Toaster />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        // contentLabel="Example Modal"
      >
        {modalIsOpen && <ImageModal item={selectedImage} />}
      </Modal>
    </div>
  );
}
