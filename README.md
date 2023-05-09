# Pet App - Code Eval

## Intro

Hi! Thank you for your interest in working at GoGov Apps. We appreciate you taking the time to provide a code sample.

## Motivation

The purpose of this project is to see how you do with the modification of an existing React App. This project is a fork of [SnapShot](https://github.com/Yog9/SnapShot).
Our goal will be to modestly transform this project from a generic photo gallery app to a pet-centric photo gallery app.
Our hope is that the main part of the evaluation will take less than an hour for folks with prior react experience but there will be bonus parts for those who feel so inclined.

## How we plan to evaluate your submittal 

We plan to present you with 4 main objectives and provide a score on each individual objective. Your final score will be the sum of all your objective scores.

We ask that you create a discussion file where you can help us understand how and why you decided to make the code changes that you made.

### Submitting your project

Your submittal should be one zip file that contains this entire project along with the discussion file. The discussion file should be named Discussion.md and be placed in the root of the zip file.

## Your objectives

### Objective 1: Rebrand/ Restyle

Let's change the look and feel of this app.

* Update the name of the app from "SnapShot" to "PetShot"
* Replace the text on the 4 buttons below the search with terms more appropriate for a pet image search.
* Replace the words "Pictures" and "Images" below the search form with the word "Pets"
* Change the image grid dimensions from 4 across and 6 down to 2 across and 2 down.
* Change the behavior on image hover from "zooming in" to anything else.




### Objective 2: Change the underlying api

Let's support other tech minded pet enthusiasts.

* Change the underlying api for retrieving images from [flickr](https://www.flickr.com/) to one of the following free pet apis:
    1. [Dog API](https://dog.ceo/dog-api/documentation)
    2. [Cataas](https://cataas.com/#/)
    3. [The Cat API](https://thecatapi.com/)
    


### Objective 3: Image clicks

Let's add some behavior on image clicks.

* Update the app so that when one clicks on an image in the grid, it opens a modal that shows:
    * A larger version of the image
    * The id for the image (may differ depending on api chosen in Objective 2)
    * Any available meta data for the image presented in a human readable way



### Objective 4: Tests

Write tests for this app

* Either write: 
    1) a couple of manual test scenarios in your Discussion.md file 
    2) or a couple of automated tests using your favorite testing library (be sure to include commands that can be used to run them).



### Bonus Objective 5: Randomly generated term suggestions

* Add a mechanism to replace the values of the 4 buttons under the search text box with random terms.

* Initial thougts about this one would be to simply generate a random index
* based on our Breed Map's key, and use the randomly sourced key as our term *suggestion



### Bonus Objective 6: Photo effects

* Add a mechanism to apply photo effects to the displayed image in the modal. This could either be through the api chosen in Objective 2 or something else of your choosing.

### Bonus Objective 7: Whatever you want

* See something that should be refactored? Refactor it and explain your reasoning. Want to add something else cool to our pet app? Implement it and explain your reasoning.

## Getting started

### Install dependencies

`yarn install`

### Run app from the root directory.

`yarn start`

### More Getting Started Info

https://github.com/Yog9/SnapShot
# pet-app-challenge
