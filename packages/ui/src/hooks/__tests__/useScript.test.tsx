import { renderHook } from '@testing-library/react-hooks';
import useScript from '../useScript';

const id = 'new-script';
const url = 'http://url/';

describe('useScript', () => {
  describe('when script is not in the document', () => {
    it('', () => {
      renderHook(() => useScript(url));
      expect(document.head.getElementsByTagName('script')[0].src).toBe(url);
    });
    it('should add/remove the script tag with the given id', () => {
      const { unmount } = renderHook(() => useScript(url, { id }));
      expect(document.getElementById(id)).toBeInTheDocument();
      expect((document.getElementById(id) as HTMLScriptElement)?.src).toBe(url);
      expect(document.getElementById(id)?.parentNode).toBe(document.head);

      unmount();
      expect(document.getElementById(id)).not.toBeInTheDocument();
    });
  });
  describe('when the script is in the document', () => {
    let script: HTMLScriptElement;
    beforeEach(() => {
      script = document.createElement('script');
      script.id = id;
      document.body.appendChild(script);
    });
    afterEach(() => {
      document.body.removeChild(script);
    });
    it('should not add/remove script if its already in the document', () => {
      const { unmount } = renderHook(() => useScript(url, { id }), {});
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(document.getElementById(id)?.parentNode).not.toBe(document.head);
      unmount();
      expect(document.getElementById(id)).toBeInTheDocument();
    });
  });

  it.each`
    options                        | key         | attribute
    ${{ async: true }}             | ${'async'}  | ${'async'}
    ${{ onload: () => undefined }} | ${'onload'} | ${'onload'}
  `('should add the $key', ({ options, key, attribute }) => {
    renderHook(() => useScript(url, { id, ...options }));
    expect(document.getElementById(id)?.[key]).toBe(options[attribute]);
  });
});
