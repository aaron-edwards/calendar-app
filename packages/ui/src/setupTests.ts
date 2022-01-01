/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const generateProfile = ({
  id = 'id',
  email = 'me@email.com',
  name = 'John Doe',
  givenName = name.split(' ')[0],
  familyName = name.split(' ', 2)[1],
  imageUrl = 'http://me.jpg',
}: {
  id?: string;
  email?: string;
  givenName?: string;
  familyName?: string;
  name?: string;
  imageUrl?: string;
} = {}) => ({
  getId: jest.fn(() => id),
  getEmail: jest.fn(() => email),
  getName: jest.fn(() => name),
  getGivenName: jest.fn(() => givenName),
  getFamilyName: jest.fn(() => familyName),
  getImageUrl: jest.fn(() => imageUrl),
});

const profile = generateProfile();

const currentUser = {
  isSignedIn: jest.fn(() => true),
  getAuthResponse: jest.fn(() => ({})),
  getBasicProfile: jest.fn(() => profile),
};

const googleAuth = {
  currentUser: {
    get: jest.fn(() => currentUser),
    listen: jest.fn(),
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
};

Object.defineProperty(global, 'gapi', {
  value: {
    load: jest.fn((_lib: string, cb: () => void) => cb()),
    auth2: {
      init: jest.fn(() => ({
        then: (fn: () => void) => fn(),
      })),
      getAuthInstance: jest.fn(() => googleAuth),
    },
  },
});

afterEach(jest.clearAllMocks);
