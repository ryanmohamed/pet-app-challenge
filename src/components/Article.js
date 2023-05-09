import React from 'react';

const Article = ({ info, id }) => { // destructure to require these props
    const { name, description, temperament, origin, vcahospitals_url } = info
    let text;

    if ( info ) {
        text = <>
            { name && <h2>{name}</h2> }
            { description && <p>{description}</p> }
            { temperament && <p>Temperament: {temperament}</p> }
            { origin && <p>Origin: {origin}</p> }
            { vcahospitals_url && 
                <a href={vcahospitals_url} // open in new tab safely
                    target='_blank' 
                    rel='noopener noreferrer'>
                        More information
                </a> 
            }
        </>;
    }
    
    return (
        <article>
            {text}
            <h3>Image ID: {id}</h3>
        </article>
    );
}

export default Article;
