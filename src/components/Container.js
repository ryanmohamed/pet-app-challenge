import React, { useContext, useEffect, useState } from 'react';
import { PhotoContext } from '../context/PhotoContext';
import Gallery from './Gallery';
import Loader from './Loader';

const Container = ({ searchTerm }) => {
  const { breeds, images, loading, runSearch } = useContext(PhotoContext);

  const [page, setPage] = useState(0);
  const [chunk, setChunk] = useState();

  const nextPage = () => {
    const next = page+4 > images.length-1 ? 0 : page+4;
    setPage(next);
  }; 
  
  const prevPage = () => {
    const lastPageStart = images.length - (images.length%4); 
    if(page-4 < 0) setPage(lastPageStart);
    else setPage((page-4)%images.length); 
  };

  useEffect(() => {
    setChunk(images.slice(page, page+4));
  }, [images, page]);


  useEffect(() => {
    setPage(0) // start on first series
    if(breeds.size !== 0) // ensure the breed map is populated before searching a term
      runSearch(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm, breeds]);

  return (
    <div className='photo-container'>
      {loading ? <Loader /> : <Gallery data={chunk} controls={images.length > 4 && { nextPage, prevPage }} />} 
    </div>
  );
};

export default Container;
