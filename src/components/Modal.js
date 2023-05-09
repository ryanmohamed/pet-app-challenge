import React from 'react';
import { useEffect } from 'react';
import Article from './Article';

const Modal = ({ close, ...props }) => { // destructure to require these props
    const { url, id, info } = props

    useEffect(() => {
        // save previous overflow style, disable scrolling when modal active
        const overflowStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

         // handle esc for accessibility
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = overflowStyle; // return original state
            window.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line
    }, []);

   
    const handleKeyDown = (e) => {
        if(e.key === 'Escape') {
            close();
        }
    }

    return (
    <div className='modal-container'>
        <div className='modal-overlay' onClick={close}></div> 
        <div className='modal'>
            <div><img src={url} alt={id} /></div>
            <Article info={info} id={id} />
            <button className='centered' onClick={close}>Esc</button>
        </div>
    </div>
  );
}

export default Modal;
