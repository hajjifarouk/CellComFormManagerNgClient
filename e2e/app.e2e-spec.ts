import { CellComFormManagerPage } from './app.po';

describe('cell-com-form-manager App', () => {
  let page: CellComFormManagerPage;

  beforeEach(() => {
    page = new CellComFormManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
