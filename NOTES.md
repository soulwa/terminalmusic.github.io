## terminalmusic.live

general structure of site:

- [ ] "enter" page with glitchy effect
    - glitchy effect is a stretch goal
- [x] home page with info about what terminal music is
- [x] navbar on main pages with home/who/shows
- [ ] who/about page with dj bios and pictures
    - for celine, use the pic of them at the radio station yelling at the mic
    - for zoey, use the pic of them on ro's spotify playlist?
- [ ] shows page with names/dates/spotify embeds
    - stretch goal: have links to images, render images on gl cube rotating around at each embed
- [ ] LIVE page with a timer until 3am on fridays, then gets stream from "https://stream.wrbbradio.org/", playing doovendeer intro as well
    - can just use javascript for this so it will work :D
    - this whole thing is a stretch goal to get to work by friday D:
    - this is actually really easy: the whole thing is basically
    ```js
    let audio = new Audio("https://stream.wrbbradio.org/");
    audio.play(); // when it's 3am
    // wait till 4:05am
    audio.pause();
    // hopefully it gets gc'd
    ```

jekyll translation:

- index.html -> enter page
- home.html  -> main page
- about.html -> artist bios
- shows.html -> playlists of shows (and maybe downloads? need a cdn tho)
- live.html  -> listen live to terminal music! (maybe with doovendeer intro?)

- \_shows/   -> list of markdown posts with shows and notes
    - contains liquid: name, images(?) spotify_url, download_url(?)
    - content will be notes for the show, but has nice text formatting
- will need javascript for: `index.html` (glitching), `shows.html` (cubes), `live.html` (audio interface)