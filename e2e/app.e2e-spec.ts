import { QuickColorsPage } from './app.po';

describe('quick-colors App', function() {
  let page: QuickColorsPage;

  beforeEach(() => {
    page = new QuickColorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
