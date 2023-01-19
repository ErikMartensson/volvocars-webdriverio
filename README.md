## Intro

Normally I work with TypeScript based backend services. Even though I started out as a frontend developer, that was a while ago, and even then I never got to write tests for those frontends.

WebdriverIO (or webdrivers in general) is completely new area to me, and I don't know the best practices for creating reasonable frontend tests, which is something you probably could deduct from looking at the tests in this repo.

I do, however, completely understand the motivation for testing applications, especially frontends. This project was a new and interesting topic for me, and it's something I'd like to get better at.

## How to run the tests

You can either run the tests in your own Firefox instance by running:
```bash
npm run wdio
```
> This assumes that you have both Firefox and Geckodriver installed on your system.

The other option is to run it in a Docker instance instead:
```bash
npm run wdio-docker
```
> This assumes that you have Docker installed and running on your system.

By default, all test files run at once in parallel. If you want to run one specific test file you can run:
```bash
npm run <wdio|wdio-docker> -- --spec ./test/specs/<name-of-file>.spec.ts
```

## Problems I ran into

Regarding the cookie consent popup that always show.

I tried to set some cookies in order to prevent that box from showing, but that didn't work.
Refreshing afterwards always resulted in a "Access denied" message from the server.

I'd assume that there are better ways to prevent that popup, but I decided to just click accept before each test, except for the tests specifically made for that consent box.

Speaking of "Access denied", many of the pages assets couldn't load properly when running either Chrome or Firefox in webdriver mode. Lots of JS-files and the preview images for the video testimonials just ended up responding with 403. This did not happen when I launched the browsers and loaded the page normally, it only happen when running the tests.

I started out with Google Chrome, but switched to Firefox because "scrollIntoView" just didn't work for me in Chrome. It scrolled all the way to the bottom of the page. This didn't happen in Firefox for some reason.

There are definitely more tests to be written for this page, but since I had so many issues with "Access denied" and certain HTML tags or assets just not loading or showing up for me, I decided to end this project here.
