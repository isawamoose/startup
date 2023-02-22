# startup

CS260 Startup Application - Collaborative Songwriter

Made by Stephen Amos

I learned that conflicts are best avoided by pulling down changes to your local environment before making any changes.
I was already pretty familiar with git but this reinforced the principle behind source control - that if everyone edits the same document, who knows what can happen, so making multiple copies then comparing changes is pretty useful.

Elevator Pitch:

A collaborative app for songwriting on the go - in solo mode, a user can enter lyrics onscreen and then enter chords above the lyric lines. In duo mode, two users can work on the same song. Users can save the song to work on later.

Key features:

-   Songwriting page
-   Two modes - solo and duo
-   Ability to save songs to work on later

![IMG_0741](https://user-images.githubusercontent.com/60545878/215235314-5db65e77-a261-4922-b3ee-109862210231.PNG)

Elevator pitch in an elevator video:
https://user-images.githubusercontent.com/60545878/215235548-32062919-dd86-453c-aab9-33ce9103054e.MOV

Caddy can route traffic for multiple applications.

**Simon HTML**
While creating the html pages, I was interested by the semantic nature of the elements. The table element stood out in that it could be used to
create a layout for the buttons for the game. Some elements seemed purely semantic - you could have placed the menu items in a div, but I imagine
placing them in a nav gives it meaning that can be recognised by search engines or other things that care about semantics.
This also reminded me why I like component based frameworks - rather than repeating the nav html on each page, you could make a menu component that is always visible.

**Simon CSS**
I appreciated how Bootstrap allowed me to focus on how I wanted the page to look, rather than worrying about how to get it to look how I want. It simplified the styling process nicely, allowing me to focus my css writing efforts on smaller issues like how I wanted the flex-direction to go.
