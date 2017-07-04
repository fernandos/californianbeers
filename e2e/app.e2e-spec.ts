import { CaliforniabeerPage } from './app.po';

describe('californiabeer App', () => {
  let page: CaliforniabeerPage;

  beforeEach(() => {
    page = new CaliforniabeerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
