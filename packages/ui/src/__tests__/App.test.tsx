import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should greet the world', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toHaveTextContent('Hello World');
  });
  it('should greet the user', () => {
    const { baseElement } = render(<App name="Bender" />);
    expect(baseElement).toHaveTextContent('Hello Bender');
  });
});
