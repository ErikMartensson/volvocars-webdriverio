describe('Cookie consent', () => {
  beforeEach(async () => await browser.url(''));
  afterEach(async () => await browser.deleteAllCookies());

  it('has a OneTrust cookie consent popup', async () => {
      // Consent popup should exist and be visible
      const oneTrustBanner = await $('#onetrust-banner-sdk');
      expect(await oneTrustBanner.isExisting()).toEqual(true);
      expect(await oneTrustBanner.isDisplayedInViewport()).toEqual(true);
  });

  it('popup goes away when giving cookie consent', async () => {
    // Click the "Accept" button
    await $('#onetrust-accept-btn-handler').click();

    const oneTrustBanner = await $('#onetrust-banner-sdk');
    // The element should still exist, but animate fade out to be invisible
    expect(await oneTrustBanner.isExisting()).toEqual(true);

    // Wait for the animation to complete
    await browser.pause(1000);

    // Popup no longer visible
    expect(await oneTrustBanner.isDisplayedInViewport()).toEqual(false);

    // Check that the cookie was set and that its value is a valid timestamp
    const cookie = await browser.getNamedCookie('OptanonAlertBoxClosed');
    expect((new Date(cookie.value)).getTime() > 0).toEqual(true);
  });

  describe('Cookie settings', () => {
    it('popup shows settings', async () => {
      const oneTrustSettings = await $('#ot-pc-content');
      // Not visible before clicking button
      await oneTrustSettings.waitForExist();
      expect(await oneTrustSettings.isExisting()).toEqual(true);
      expect(await oneTrustSettings.isDisplayedInViewport()).toEqual(false);

      // Click the "Cookie settings" button
      await $('#onetrust-pc-btn-handler').click();

      // Wait for the animation to complete
      await browser.pause(1000);

      // Settings should now be visible
      expect(await oneTrustSettings.isDisplayedInViewport()).toEqual(true);
    });

    it('is possible to reject all', async () => {
      // Click the "Cookie settings" button
      await $('#onetrust-pc-btn-handler').click();

      // Wait for the animation to complete
      await browser.pause(1000);

      const rejectAllButton = await $('button.ot-pc-refuse-all-handler');
      expect(await rejectAllButton.isExisting()).toEqual(true);
      expect(await rejectAllButton.isDisplayedInViewport()).toEqual(true);
      await rejectAllButton.click();

      // Wait for the animation to complete
      await browser.pause(1000);

      // Popup no longer visible
      expect(
        await $('#onetrust-banner-sdk').isDisplayedInViewport()
      ).toEqual(false);
    });

    it('is possible to allow all', async () => {
      // Click the "Cookie settings" button
      await $('#onetrust-pc-btn-handler').click();

      // Wait for the animation to complete
      await browser.pause(1000);

      const acceptAllButton = await $('#accept-recommended-btn-handler');
      expect(await acceptAllButton.isExisting()).toEqual(true);
      expect(await acceptAllButton.isDisplayedInViewport()).toEqual(true);
      await acceptAllButton.click();

      // Wait for the animation to complete
      await browser.pause(1000);

      // Popup no longer visible
      expect(
        await $('#onetrust-banner-sdk').isDisplayedInViewport()
      ).toEqual(false);
    });

    it('is possible to change a setting and confirm choices', async () => {
      // Click the "Cookie settings" button
      await $('#onetrust-pc-btn-handler').click();

      // Wait for the animation to complete
      await browser.pause(1000);

      // The "Statistics cookie" toggle should be on by default
      const statsCheckbox = await $('#ot-group-id-9');
      expect(await statsCheckbox.isSelected()).toEqual(true);

      // Click the toggle
      await $('label.ot-switch[for=ot-group-id-9]').click();

      // The toggle is now off
      expect(await statsCheckbox.isSelected()).toEqual(false);

      const confirmChoicesButton = await $('button.save-preference-btn-handler');
      expect(await confirmChoicesButton.isExisting()).toEqual(true);
      expect(await confirmChoicesButton.isDisplayedInViewport()).toEqual(true);
      await confirmChoicesButton.click();

      // Wait for the animation to complete
      await browser.pause(1000);

      // Popup no longer visible
      expect(
        await $('#onetrust-banner-sdk').isDisplayedInViewport()
      ).toEqual(false);
    });
  });
});
