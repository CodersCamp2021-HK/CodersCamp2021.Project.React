import { act } from 'react-dom/test-utils';

describe('main', () => {
  beforeEach(async () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render page', async () => {
    // Given
    const root = /** @type {Element} */ (document.querySelector('#root'));
    expect(root.children).toHaveLength(0);

    // When
    await act(async () => {
      await import('./main');
    });

    // Then
    expect(root.children).not.toHaveLength(0);
  });
});
