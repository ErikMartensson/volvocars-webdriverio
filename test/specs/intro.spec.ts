describe('Intro content', () => {
  before(async () => {
    await browser.url('');
    // Click the "Accept" button in the cookie consent popup
    await $('#onetrust-accept-btn-handler').click();
  });

  it('has an intro title and paragraph', async () => {
    const title = await $('#ModelIntro-1 h2');
    expect(await title.getText()).toEqual(
      'Ideas that change the world are often the most controversial.',
    );
    const paragraph = await $('#ModelIntro-1 p');
    expect(await paragraph.getText()).toEqual(
      `After we introduced the 3-point safety belt, we faced a world of criticism. Since then, it has saved more than a million lives. Now it's time for the next step. For everyone's safety.`,
    );
  });

  it('is possible to pause video preview', async () => {
    // Video player is viewable and has started auto playing
    const video = await $('#Video-1 video');
    expect(await video.isDisplayedInViewport()).toEqual(true);
    expect(await video.getProperty('autoplay')).toEqual(true);
    expect(await video.getProperty('paused')).toEqual(false);

    // Click the pause button in bottom right corner of video player
    const pauseButton = await $('#Video-1 video+button');
    await pauseButton.click();

    // Video should now be paused
    expect(await video.getProperty('paused')).toEqual(true);

    // Unpausing the preview makes the video play again
    await pauseButton.click();
    expect(await video.getProperty('paused')).toEqual(false);
  });

  // Got some hints from here 😏 https://stackoverflow.com/q/64944524/1713635
  it('is possible to play full video', async () => {
    // When clicking the "Watch the story" button, the video element gets
    // replaced with an embedded YouTube player (iframe).
    const watchButton = await $('#Video-1 section > div > div button');
    await watchButton.click();

    // Switch context to the iframe
    const ytIframe = await $('#Video-1 iframe');
    browser.switchToFrame(ytIframe);

    // Video is playing
    const ytPlayer = await $('#movie_player');
    expect(await ytPlayer.getProperty('classList')).toContain('playing-mode');

    // Click the pause button in the video player
    await (await $('button.ytp-play-button')).click();

    // Player is now paused
    expect(await ytPlayer.getProperty('classList')).toContain('paused-mode');

    // Video timestamp should be zero since we paused before it could play
    expect(await (await $('span.ytp-time-current')).getText()).toEqual('0:00');
  });
});
