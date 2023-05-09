# Ryan Mohamed - PetApp - Code Eval
*I apologize for the length in advance!*

---
### Commands
1. `npm install` to install dependencies
2. `yarn start` to launch live server
3. `npm test` to run integrations/e2e/unit tests

---
### Two Dev Dependencies Added
* @testing-library/react@12 for `waitFor` 
 `yarn add --dev @testing-library/react@12`

* "mutationobserver-shim": "^0.3.7" (mutation observer fix)
 `npm install --save-dev mutationobserver-shim`

---
### Initial Analysis
1. See client-side structure via profiler or inspector

2. Analyze hierarchy 

3. Post client-side analysis thoughts
    i. Main content broken into 2 sections header and container
    ii. Form located in first div for HTTPS requests
    iii. Initially in Suspense during GET request to flickr (query string mostly changes based on tags)

4. Post source code analysis thoughts
    i. Context - passes image URLs & loading state down to our functional comps. + runSearch async func for updating that state
    ii. Container calls runSearch as a side effect (useEffect) whenever the searchTerm is updated
    iii. Gallery returns an unordered list of src-defined image elements, or a NoImages component. 
    iv. Normal hierarchy, should minimally make changes, most likely the main things changing are the API we request and our query string, we wanna make use of the work already done for searchTerm and runSearch
    

---
### Objective 1: Rebrand/ Restyle ✅
* Update the name of the app from "SnapShot" to "PetShot"
    - [x] Public -> index.html
    - [x] Header -> h1
    - [x] Routes -> App.js -> HashRouter -> basename
    - [x] Homepage -> package.json -> remove
    

* Replace the text on the 4 buttons below the search with terms more appropriate for a pet image search.
    
    - Bengal, Bombay, Persian, Maine Coon (based on API chosen)
        - [x] Change pathnames and searchTerms first -> App.js
        - [x] Change rendered links -> Navigation.js

* Replace the words "Pictures" and "Images" below the search form with the word "Pets"
    - [x] Predefined -> Item.js
    - [x] User searched -> Search.js
    - [x] Faulty searches -> NoImages.js -> NoPet.js


* Change the image grid dimensions from 4 across and 6 down to 2 across and 2 down.

    - Changes total request amount? -> we'll eventually be changing the API request so I'll leave it at 24 for now and let the grid expand if need be.

    - Should I implement CSS grid or simply alter the flex box that already existed? -> I will for now but keep in mind li have a default list-item display type, I only avoid altering the flex box because 1. I don't want to change the width of the container, or add margin to the children, 2. I don't want to give percentage width to the children such as 50% for 2 columns. So I'll simply use grid.

    - Give grid to ul, we only need two columns that contain the images, we can use min-content safely due to the sizing established.
        - [x] Establish media query

* Change the behavior on image hover from "zooming in" to anything else.
    * Something simple
    * Avoiding filter property due to weird behaviour in certain cases
    * Achieve the same feel as filter using slight opacity shift
    * Apply shadows to parent li to avoid overflow, bring focus to the image


---
 ### Objective 2: Change the underlying api ✅

* Change the underlying api for retrieving images from [flickr](https://www.flickr.com/) to one of the following free pet apis:
    1. [Dog API](https://dog.ceo/dog-api/documentation)
    2. [Cataas](https://cataas.com/#/)
    3. [The Cat API](https://thecatapi.com/)

    * Something interesting to point out here is while this may be a PetShot site, each API only returns either dogs or cats. This requires me to change my original 4 choices for our routes, I wonder if there's a way to get around this.

* Are we limited to one? Are we able to choose what API to request depending on the contents of searchTerm?

* Based on the statement I'd say no for the time being. In an effort to make use of the work already done with the PhotoContext, I want an API that responds similarly to Flickr, but provides enough metadata to work with later on. 

*  ==Chosen API: [The Cat API](https://thecatapi.com/)==

* [Image Endpoint](https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME)
    - [x] Need API KEY
    - [x] Need Breed ID 
        1. Fetch breed ids ONCE, on app mount, we only need it once -> useEffect, fetch
        2. Use this in context so when can index a breeds id before making a request -> breeds state
        3. In App.js, before running our search when search term is updated - we need to check if the breeds map is defined 
            i. Context needs the search query to be used as an index in a consistent way (ex: american short hair or american SHortHAIR should yield the same results),
                all text can be set to lowercase and have it's whitespace removed. -> PhotoContext.js
        4. Return in page based order so we can paginate later on    
    
     - See `PhotoContextProvider.js` for main changes



---
### Objective 3: Image clicks ✅

Let's add some behavior on image clicks.

* Update the app so that when one clicks on an image in the grid, it opens a modal that shows:
    * A larger version of the image
    * The id for the image (may differ depending on api chosen in Objective 2)
    * Any available meta data for the image presented in a human readable way

* Keep in mind Image.js has a li root element, the click event is stated to be triggered on image clicks, so we should not alter anything beyond Image.js, this may change <ul><li> hierarchy. 

* Rather the inner image will toggle some state, and conditionally render our Modal as a child of the list item. While I do try to avoid changing previous code, this will simply be additions to the preexisting Image component. 

* One thought I have is whether to keep the original image in the grid, or have it changes it's position into the modal.

* To avoid jarring users again, I'll create a copy since our dom isn't heavy in images + I can seperate the styles easier rather than removing properties like overflow through state. 

* ==**New components**:== `Modal.js`, `Article.js`

    * Another note is a modal is typically shown after clicking some parent element, so the parent must provide the way for the modal to close itself, since it's state is managed above

    * Gallery has to pass extra data from fetch result down to it's descendant
    * Gallery -> Image -> Modal (id, title, metadata, etc)
    * Added small change to Gallery, grouped props as object and passed directly so we can pass extras to who need them

    * Aiming to keep all the images a consistent size as is with our grid of images, a little tough to optimize for any kind of image
     * Ideally our modal is to see the image a bit larger, but if we keep everything a consistent size and tackle it with overflow some images have their subject more high and some more low -> for a consistent feel I'll make the image container a consistent size and align its elements in the middle




---
### Objective 4: Tests ✅

Write tests for this app

* Either write: 
    1) a couple of manual test scenarios in your Discussion.md file 
    2) or a couple of automated tests using your favorite testing library (be sure to include commands that can be used to run them).


### Did both
* Added tests
    1. `PhotoContext.test.js` (1)
    2. `Form.test.js` (4)
    3. `Gallery.test.js` (3) 
    
* Command
    `npm test`

### INTEGRATION/E2E:

- [x] Context Provider fetches breeds and provides to children components ✅📝
    1. Context requests API
    2. API returns data
    3. Context set using array->map
    4. Context passed to child components

- [ ] Form submission interaction with runSearch
    1. Form submitted
    2. searchTerm updated
    3. runSearch called with searchTerm as query
    4. runSearch requests API
    5. Data returned and set in state
        
### UNIT TESTS: 

- [ ] runSearch fetches images by id and sets state
    1. runSearch requests API
    2. API returns data
    3. Context set (array of objects)

- [x] Form (big part of user experience) ✅📝
    1. Renders without crashing
    2. Form doesn't allow whitespace or empty input
    3. Form parses input before submitting
    4. Form calls handleSubmit

- [x] Gallery renders images from state (maybe closer to a unit test) ✅📝
    1. Renders without crashing
    2. Renders from state
    3. Renders on screen with expected alt tags or loader

* Integrations mostly likely will provide the same + more ==coverage== than unit testing fetchBreeds and runSearch functions




---
### Bonus Objective 5: Randomly generated term suggestions ✅

* Add a mechanism to replace the values of the 4 buttons under the search text box with random terms.

    * Initial thougts about this one would be to **simply generate a random index based on our Breed Map's key**, and use the randomly sourced key as our term * suggestion

    * Key point -> we can do this by syncing the links and initial routes in App.js and Navigation.js, however thats unnecessary, no requirement to yield /PetShot/bengal on term suggestion, we can utilize the catch all search routes and append "/search/" to our randomly gened path

    * Random functionality implemented purely in `Navigation.js`, keeps things more manageable for future cases
    * 1 addition to CSS to capitalize names
    * Reformatted map to include original spaces since that data isn't easy to do automatically, trim, lowercase, replace groups of spaces with one space




---
### Bonus Objective 6: Photo effects ✅

* Add a mechanism to apply photo effects to the displayed image in the modal. This could either be through the api chosen in Objective 2 or something else of your choosing.

    * I rather not bloat dependencies with frameworks like spring or react motion
    * Simply modal + photo effect
    * Modal expands outwards
    * Photo colors intensified with filters
    * Blur to reveal image during expansion

---
### Bonus Objective 7: Whatever you want ✅

* See something that should be refactored? Refactor it and explain your reasoning. Want to add something else cool to our pet app? Implement it and explain your reasoning.

* On the cool side
    - [x]  Pagination since API provides ordered images we can create an infinite feel, page is quite minimized so we'd like to feel like we can fetch more images if needed
        i. Should not be part of context, needs to reset on each new searchTerm
        ii. Fetch images all at once, render 4 at a time, this way we know how many images we have and whether or not to show a prev/next button
        iii. Employ a window method that moves over the images array in state, use simple edge case handling for next and previous functions
        iv. Update chunk whenever images or page index is updated
