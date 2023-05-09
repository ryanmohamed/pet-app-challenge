import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../api/config';
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [breeds, setBreeds] = useState(new Map()); /* addition for fetching breed ids with constant access time */

  // * addition - fetch breeds
  useEffect(() => {
    fetchBreeds(); // only mount fetch breeds on MOUNT
    return () => {};
  }, [])

  const fetchBreeds = () => {
    axios 
      .get(`https://api.thecatapi.com/v1/breeds`)
      .then(response => {
        if(Array.isArray(response.data)) {
          const breedMap = new Map(
            // only save name and id, anymore is unnecessary to store in state on mount
            // save as Map for constant access time to id or undefined
            response.data.map(breed => [breed.name.trim().toLowerCase().replace(/\s/g, ' '), breed.id]) // we want more consistent access to the map, so make sure the key is lowercase and lacks whitespace
          );
          setBreeds(breedMap);
        }
      })
      .catch(error => { 
        console.log('Encountered error on initial fetch of data.', error);
      });
  };
  
  const runSearch = async (query) => {
    //remove all whitespace from search, for access to map
    const mapKey = query.trim().toLowerCase().replace(/\s/g, ' ');
    const breedId = breeds.get(mapKey) || query.trim().substring(0,4).toLowerCase();
    
    const imageLimit = 25;
    setLoading(true); // when switching between pets
    
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?limit=${imageLimit}&page=${0}&order=DESC&has_breeds=1&breed_ids=${breedId}&api_key=${apiKey}` // limit to 4 because of 2x2
      )
      .then(response => {
        const images = response.data
        setImages(images); // integration test showed this relies too much on map, must handle empty responses
        setLoading(false);
      })
      .catch(error => {
        console.log(
          'Encountered an error with fetching and parsing data',
          error
        );
      });
  };

  return (
    <PhotoContext.Provider value={{ breeds, images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
