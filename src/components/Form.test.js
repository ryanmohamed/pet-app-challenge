import Form from './Form';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { HashRouter, Router } from 'react-router-dom';
import { fireEvent, getByPlaceholderText, render, waitFor } from '@testing-library/react';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('disables submission if form empty', () => {
    const { getByRole } = render(<Form />);
    const button = getByRole('button');
    expect(button).toBeDisabled();
});

it('disables submission if form contains only whitespace', () => {
    const { getByRole } = render(<Form />);
    const input = getByRole('textbox');
    const button = getByRole('button');
    fireEvent.change(input, { target: { value: '\n\t\t\r\n\t' } }); // test a random series of whitespace
    expect(button).toBeDisabled();
});

it('parses input before calling handleSubmit', async () => {
    const history = createHashHistory();
    const handleSubmit = jest.fn();
    const { getByRole } = render(
        <Router history={history}>
            <Form handleSubmit={handleSubmit} history={history}/>
        </Router>
    );
    const input = getByRole('textbox');
    const button = getByRole('button');
    const testInput = 'MAIne   Coon    ';
    const parsed = `${testInput.trim().toLowerCase()}`;
    fireEvent.change(input, { target: { value: testInput } }); // test bad input
    
    fireEvent.submit(button);
    
    // submit function should be called with the parsed arguments
    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(expect.anything(), history, parsed);
    });
});