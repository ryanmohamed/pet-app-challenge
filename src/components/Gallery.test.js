import Gallery from "./Gallery";
import React from "react";
import ReactDOM from "react-dom";
import PhotoContextProvider, { PhotoContext } from "../context/PhotoContext";
import { fireEvent, getByAltText, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Gallery />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders the images passed to it", () => {
    const mockImageState = [{
        breeds: [{
            id: "beng",
            name: "Bengal",
            description: "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it.",
            origin: "United States",
            vcahospitals_url: "https://vcahospitals.com/know-your-pet/cat-breeds/bengal"
        }],
        heights: 1100,
        id: "4-5SzDNIL",
        url: "https://cdn2.thecatapi.com/images/4-5SzDNIL.jpg",
        width: 880
    }];
    const { getByAltText } = render(
        <Gallery data={mockImageState} />
    );
    const img = getByAltText("4-5SzDNIL");
    expect(img).toBeInTheDocument();
})

it("reads state from context", async () => {
    const mockImages = [
        {
            breeds: [{
                id: "beng",
                name: "Bengal",
                description: "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it.",
                origin: "United States",
                vcahospitals_url: "https://vcahospitals.com/know-your-pet/cat-breeds/bengal"
            }],
            heights: 1100,
            id: "4-5SzDNIL",
            url: "https://cdn2.thecatapi.com/images/4-5SzDNIL.jpg",
            width: 880
        },
    ];

    const mockContextValue = { images: mockImages };
    const MockProvider = ({ children }) => {
        return (
            <PhotoContext.Provider value={mockContextValue}>
                {children}
            </PhotoContext.Provider>
        );
    };

    await act(async () => {
        const { getByAltText } = render(
            <Gallery data={mockContextValue.images} />,
            { wrapper: MockProvider }
        )
        const image = getByAltText("4-5SzDNIL");
        expect(image).toBeInTheDocument();
    })
})