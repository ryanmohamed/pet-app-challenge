import React from 'react';
import Modal from './Modal';

const Image = props => { /* additions */

  const [ modal, setModal ] = React.useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <li>
      <img src={props.url} alt={props.id} onClick={openModal} />
      { modal && <Modal {...props} close={closeModal} /> }
    </li>
  );

};

export default Image;
