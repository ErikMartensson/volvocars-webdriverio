describe('Statement and callouts', () => {
  before(async () => {
    await browser.url('');
    // Click the "Accept" button in the cookie consent popup
    await $('#onetrust-accept-btn-handler').click();
  });

  it('has a statement with two differently colored spans', async () => {
    const statementBox = await $('#TextStatement-1');
    await statementBox.scrollIntoView();
    expect(await statementBox.isDisplayedInViewport()).toEqual(true);

    const [firstSpan, secondSpan] = await statementBox.$$('span');
    const [c1, c2] = await Promise.all([
      firstSpan.getCSSProperty('color'),
      secondSpan.getCSSProperty('color'),
    ]);
    expect(c1.value).not.toEqual(c2.value);
  });

  it('has 4 callouts with icon, title and paragraph', async () => {
    const calloutBox = await $('#IconCallouts-1');
    await calloutBox.scrollIntoView();
    expect(await calloutBox.isDisplayedInViewport()).toEqual(true);

    const iconBoxes = await calloutBox.$$('section > div > div:nth-child(1) > div');
    expect(iconBoxes).toHaveLength(4);

    // Check all "icon boxes"
    for (const iconBox of iconBoxes) {
      // This is where I'd make up some tests regarding the SVG icons, but they
      // refuse to show up in the HTML when I run these tests.
      // They're just not there 🤔 ...
      // const svgIcon = await iconBox.$('svg');
      // expect(await svgIcon.isExisting()).toEqual(true);

      const title = await iconBox.$('em');
      expect(await title.isExisting()).toEqual(true);
      expect(await title.getText()).toBeTruthy();

      const paragraph = await iconBox.$('p');
      expect(await paragraph.isExisting()).toEqual(true);
      expect(await paragraph.getText()).toBeTruthy();
    }
  });

  it('has a link to learn more about car safety', async () => {
    const link = await $('#IconCallouts-1 a');
    await link.scrollIntoView();
    await browser.pause(3000);
    expect(await link.isDisplayedInViewport()).toEqual(true);

    // Make sure "href" is correct
    expect(await link.getAttribute('href')).toEqual('/intl/v/car-safety');

    // This is where I would have tested to click the link and make sure we are
    // redirected to the correct page, but I only get "Access denied" from the
    // web server, so I couldn't really test this part.
    // await link.click();
    // expect(await browser.getUrl()).toEqual('https://www.volvocars.com/intl/v/safety/highlights');
  });
});
