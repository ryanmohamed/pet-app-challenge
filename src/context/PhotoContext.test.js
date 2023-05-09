import React from 'react';
import {render, act, waitFor } from '@testing-library/react';

import Container from '../components/Container';
import PhotoContextProvider, { PhotoContext } from './PhotoContext';
import { apiKey } from '../api/config';

// mock axios
import axios from 'axios';
jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks(); 
});

it('fetches breeds propogates context to children', async () => { // must wait for context to be provided
    // mock the data being retrieved, key: name, value: id
    const mockData = [ // data will be an array of objects
        { name: 'Abyssinian', id: 'abys' },
        { name: 'Bombay', id: 'bomb' },
        { name: 'Bengal', id: 'beng' },
        { name: 'Persian', id: 'pers' },
    ];
    
    // once we've retrieved the data
    await axios.get.mockResolvedValueOnce({ data: mockData });

    // mount provider and child and test context value
    let context;
    await act(async () => { 
        // state initialized to empty object, veryify PhotoContextProvider sets the state
        render(<PhotoContext.Provider value={{}}> 
            <PhotoContextProvider>
                <PhotoContext.Consumer>
                { ctx => {
                    context = ctx;
                    return null;
                }}
                </PhotoContext.Consumer>
            </PhotoContextProvider>
        </PhotoContext.Provider>)

        await waitFor(() => {
            // the context we're interested in is breeds
            // provider should be turning array into map to ids
            expect(context.breeds).toBeInstanceOf(Map);
            expect(context.breeds.get('bengal')).toBe('beng');
            expect(context.breeds.get('bombay')).toBe('bomb');
            expect(context.breeds.get('persian')).toBe('pers');
            expect(context.breeds.get('abyssinian')).toBe('abys');
        })
    });

});
