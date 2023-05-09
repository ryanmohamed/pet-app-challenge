import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PhotoContext } from '../context/PhotoContext';

const Navigation = () => {

  const { breeds } = useContext(PhotoContext);
  const initialTerms = ['bengal', 'bombay', 'persian', 'maine coon'];
  const [terms, setTerms] = useState(initialTerms); // fill the spaces so we can iterate over it initally
  
  const termPath = (i) => ( terms[i] ? `/search/${terms[i]}` : null );
  
  const generateTerm = () => {
    if (breeds) {
      const keys = Array.from(breeds.keys()); // create an array using the iterator
      const randomIndex = Math.floor(Math.random() * keys.length); // random 0-(N-1)
      const randomBreed = keys[randomIndex];
      return randomBreed;
    }
  };

  const randomizeTerms = () => {
    const set = new Set(); // can't generate duplicates
    while (set.size < 4) 
      set.add(generateTerm());
    setTerms(Array.from(set));
  };

  return (
    <nav className='main-nav'>
      <ul>
        <li><NavLink to={termPath(0)}>{terms[0]}</NavLink></li> {/* slight difference in search term and rendered term, so better use alongside Puppy Pets, rather than Puppies Pets */}
        <li><NavLink to={termPath(1)}>{terms[1]}</NavLink></li>
        <li><NavLink to={termPath(2)}>{terms[2]}</NavLink></li>
        <li><NavLink to={termPath(3)}>{terms[3]}</NavLink></li>
      </ul>
      <button onClick={randomizeTerms}>Randomize</button>
    </nav>
  );
}

export default Navigation;
