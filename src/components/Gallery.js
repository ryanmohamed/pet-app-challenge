import React from 'react';
import NoPets from './NoPets';
import Image from './Image';
import Caret from './Caret';

const Gallery = props => {
  const results = props.data;
  let images;
  let noImages;
  let controls;

  // map variables to each item in fetched image array and return image component
  if (results && results.length > 0) {
    images = results.map(image => {
      let info = image.breeds[0] || undefined;
      let id = image.id;
      let url = image.url;
      let imageProps = { url, id, info };
      return <Image key={id} {...imageProps} />;
    });
  } else {
    noImages = <NoPets />; // return 'not found' component if no images fetched
  }

  if(props.controls) {
    controls = (
      <div className='controls'>
        <Caret onClick={props.controls.prevPage} className='prev' />
        <p>See others</p>
        <Caret onClick={props.controls.nextPage} className='next'  />
      </div>
    );
  }

  return (
    <>
    
    <div data-testid='gallery' className='gallery'>
      <ul>{images}</ul>
      {noImages}
    </div>
    {controls}

    </>
  );
};

export default Gallery;
