import { CrudAngular2Page } from './app.po';

describe('crud-angular2 App', () => {
  let page: CrudAngular2Page;

  beforeEach(() => {
    page = new CrudAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
