import chai from 'chai';
import limitString from '../src/utilities';

const { assert } = chai;

describe('limitString', () => {
  const string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  it('is a function', () => {
    assert.isFunction(limitString);
  });
  it('takes string as an argument and return limited number of characters (by default 20 without space)', () => {
    let newString = limitString(string);
    newString = newString.split(' ').join('');
    assert.isBelow(newString.length, 30); // limitString does not cut words so there will be some extra characters.
  });
  it('return string with length equal to or below 14, without spaces', () => {
    let newString = limitString(string, 14);
    newString = newString.split(' ').join('');
    assert.isBelow(newString.length, 14);
  });
  it('Does not include cut words when limiting', () => {
    const newString = limitString(string, 25);

    assert.equal(newString, 'Lorem ipsum dolor sit amet, ...');
  });
  it('returns original string if length is smaller than mentioned limit', () => {
    const originalLength = string.length;
    const newString = limitString(string, 500);
    assert.equal(newString.length, originalLength);
  });
});
