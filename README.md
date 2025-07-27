# Select component

Select component with bookmark and navigation

deployed at [https://sselect-component.vercel.app/](https://sselect-component.vercel.app/)

------------------------------------------------------------


## How to run

1. Take a pull
2. run `npm run dev`

--------------

## Approach

The data displayed has been divided into three types Groups, Sections, Options. A Group can be divided into sections and sections into options.

Using a sample data for now.

On each navigation a Group is displayed, with Sections and Options. On clicking an Option, the user is redirected to the next page with a Group, Sections and Options. 

the Data to be stored will be an array of Groups. Each groups interconnected with each other as parent or children with array of groupIds. This makes sense for a larger data samples, as on each redirection we can send an api call to get the next screen.

## Functionalities
1. Navigation on clicking
2. Input updation, user can manually modify the input to match the query
3. User can add a section and / or option
