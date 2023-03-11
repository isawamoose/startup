# CS260 Startup Application - Collaborative Songwriter

Made by Stephen Amos

I learned that conflicts are best avoided by pulling down changes to your local environment before making any changes.
I was already pretty familiar with git but this reinforced the principle behind source control - that if everyone edits the same document, who knows what can happen, so making multiple copies then comparing changes is pretty useful.

## Elevator Pitch

A collaborative app for songwriting on the go - in solo mode, a user can enter lyrics onscreen and then enter chords above the lyric lines. In duo mode, two users can work on the same song. Users can save the song to work on later.

## Key features:

-   Songwriting page
-   Two modes - solo and duo
-   Ability to save songs to work on later

![IMG_0741](https://user-images.githubusercontent.com/60545878/215235314-5db65e77-a261-4922-b3ee-109862210231.PNG)

Elevator pitch in an elevator video:
https://user-images.githubusercontent.com/60545878/215235548-32062919-dd86-453c-aab9-33ce9103054e.MOV

## Class Notes

**Caddy**

Caddy can route traffic for multiple applications.

**SOP and CORS**
SOP: Same origin policy
CORS: Cross-origin resource sharing - the service you are calling needs to return an Access-Control-Allow-Origin header so the browser will know that the request is allowed.

## Simon

**HTML**
While creating the html pages, I was interested by the semantic nature of the elements. The table element stood out in that it could be used to
create a layout for the buttons for the game. Some elements seemed purely semantic - you could have placed the menu items in a div, but I imagine
placing them in a nav gives it meaning that can be recognised by search engines or other things that care about semantics.
This also reminded me why I like component based frameworks - rather than repeating the nav html on each page, you could make a menu component that is always visible.

**CSS**
I appreciated how Bootstrap allowed me to focus on how I wanted the page to look, rather than worrying about how to get it to look how I want. It simplified the styling process nicely, allowing me to focus my css writing efforts on smaller issues like how I wanted the flex-direction to go.

**JavaScript**
JavaScript was really where I felt interested in this project. CSS helped me fill in some knowledge gaps but Javascript is exciting - it's what makes the game work.
I liked the use of local storage to store the username and game scores (i.e. in login.js and scores.js). This code was simple, making it easier to understand.
The code in play.js was more difficult to follow. Here I saw the use of classes to define both buttons and games with their respective functions. The button class was useful as the game class could then declare buttons and call functionality on them.
I appreciated how the game code tied objects to html elements, as in the case of the buttons. Each game button html had a js button object associated with it. 
I also appreciated the use of Promises and await() so that the code would wait for the sound to finish playing before resuming. Nice touch.

## Startup

**HTML and CSS**
I found while creating the HTML and CSS for my startup that it was helpful to sketch out the layout I wanted to create before I created it. I also found that for creating a more complicated layout, learning to use grid properly was very helpful as it allowed me to specify exactly where/how I wanted to place various elements.
I tried using a colour palette mixer for a colour scheme but found it difficult to get the colours to look good so I made the entire colour scheme dark.
Bootstrap was helpful for styling a few elements but I may revert to regular css for more control over the appearance.

**JavaScript**
I used the document.createElement() and el.appendChild() functions for pretty much every piece of functionality - updating the DOM according to user input is needed for my app to work.
I learned that whatever you store in localStorage needs to be stringifiable - e.g. strings, objects and arrays are fine, but Maps are not.
Local and session storage became my go to way of maintaining state across the application. Very useful.
I found it helpful, when storing objects that were associated with DOM elements in another object, to give the DOM element an id that matched the key of the object being stored.
Writing functions was necessary to have any kind of click functionality - I could set the onclick property of a DOM element to be a function.
