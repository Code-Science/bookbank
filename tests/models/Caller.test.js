const { assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const Caller = require('../../src/models/Caller');

describe('Caller', () => {
  let caller;
  let requestObj; // contains keywords string for 'General' and id for 'Specific'.
  const key = process.env.API_KEY;
  const baseUrl = process.env.BASE_URL;

  // stubbing axios 'get' method to avoid real api calls
  let stubAxiosGet;

  [
    {
      describe: 'General search for books, magazines etc',
      beforeEach: () => {
        requestObj = {
          standardQueryParams: {
            keywords: 'Alice in wonderland', // can contain more properties for advanced search
          },
        };
        caller = new Caller(requestObj, 'general');
        stubAxiosGet = sinon.stub(axios, 'get').resolves(
          Promise.resolve({
            data: {
              items: [
                'Alice in Wonderland',
                "Alice's Adventures in Wonderland",
                'etc',
              ],
            },
          })
        );
      },
      afterEach: () => {
        stubAxiosGet.restore();
      },
    },
    {
      describe: 'Specific book/volume or magazine request by ID',
      beforeEach: () => {
        requestObj = {
          id: '46yfyt767',
        };
        caller = new Caller(requestObj, 'specific');
        stubAxiosGet = sinon
          .stub(axios, 'get')
          .resolves(
            Promise.resolve({ data: { bookTitle: 'Alice in Wonderland' } })
          );
      },
      afterEach: () => {
        stubAxiosGet.restore();
      },
    },
  ].forEach((obj, i) => {
    describe(obj.describe, () => {
      beforeEach(obj.beforeEach);
      afterEach(obj.afterEach);

      it('Have a method getResult', () => {
        assert.typeOf(caller.getResult, 'function');
      });

      it(`saves requestObj as a property value with property name:${
        i === 0 ? '"queryObj"' : '"idObj"'
      }
      `, () => {
        assert.instanceOf(
          caller,
          Caller,
          'caller is an instance of Caller class'
        );
        if (i === 0) {
          assert.propertyVal(caller, 'queryObj', requestObj);
          assert.notProperty(caller, 'idObj');
        } else {
          assert.propertyVal(caller, 'idObj', requestObj);
          assert.notProperty(caller, 'queryObj');
        }
      });

      it("should make api call to Google book's api once with getResult method", (done) => {
        caller
          .getResult()
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
        sinon.assert.calledOnce(stubAxiosGet);
      });

      it('create URL according to request made', () => {
        assert.typeOf(caller.createUrl, 'function');

        const reqObj = {
          general: {
            standardQueryParams: {
              // any one of these is required do search with q=
              keywords: 'Alice in wonderland', // keywords is required value and should be first
              inauthor: 'author',
              subject: 'fiction',
            },
            additionalQueryParams: {
              filter: 'free-ebooks',
            },
          },
          specific: {
            id: '46yfyt767',
          },
        };
        const url = caller.createUrl(reqObj[caller.type]);

        if (caller.type === 'general') {
          assert.equal(
            url,
            `${baseUrl}/books/v1/volumes?q=Alice+in+wonderland+inauthor:author+subject:fiction&filter=free-ebooks&key=${key}`
          );
        }
        if (caller.type === 'specific') {
          assert.equal(url, `${baseUrl}/books/v1/volumes/46yfyt767?key=${key}`);
        }
      });

      it('should make call with correct URL', (done) => {
        caller
          .getResult()
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });

        if (i === 0) {
          sinon.assert.calledWithExactly(
            stubAxiosGet,
            `${baseUrl}/books/v1/volumes?q=Alice+in+wonderland&key=${key}`
          );
        } else {
          sinon.assert.calledWithExactly(
            stubAxiosGet,
            `${baseUrl}/books/v1/volumes/46yfyt767?key=${key}`
          );
        }
      });
      // for Gerenal
      if (i === 0) {
        it('Should return an array of books/magazines as a Promise and save it as property', (done) => {
          const result = 'result';
          assert.notProperty(caller, result);
          caller
            .getResult()
            .then((data) => {
              assert.deepEqual(data, [
                'Alice in Wonderland',
                "Alice's Adventures in Wonderland",
                'etc',
              ]);
              assert.propertyVal(caller, result, data);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      }
      // for Specific
      if (i === 1) {
        it('Should return an object of book/magazine as a Promise', (done) => {
          const result = 'result';
          assert.notProperty(caller, result);

          caller
            .getResult()
            .then((data) => {
              assert.deepEqual(data, { bookTitle: 'Alice in Wonderland' });
              assert.propertyVal(caller, result, data);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      }
    });
  });
});

// One advantage of jest over mocha or chai here is that it can also check how many assertions are made and run, with assertions.expect() method.

describe('createRequestObject', () => {
  it('is a function', () => {
    assert.isFunction(Caller.createRequestObject);
  });
  it('return request object for general search and filter out empty fields', () => {
    const keywords = 'Alice in wonderland'; // must value to have, can be anything, title, author etc.
    const standardQueryParamsObject = {
      intitle: '',
      inauthor: '',
      inpublisher: '',
      subject: 'fiction',
      isbn: '',
    };
    // Both additional and standard query params are optional, only keywords is required.
    const additionalQueryParamsObject = {
      filter: 'paid-ebooks',
      startIndex: 40,
      maxResults: '',
      printType: 'magazines',
      orderBy: 'newest',
    };
    const obj = Caller.createRequestObject(
      'general',
      keywords,
      standardQueryParamsObject,
      additionalQueryParamsObject
    );
    assert.isObject(obj, 'return value is an object');
    assert.deepEqual(obj, {
      standardQueryParams: {
        keywords: 'Alice in wonderland',
        subject: 'fiction',
      },
      additionalQueryParams: {
        filter: 'paid-ebooks',
        startIndex: 40,
        printType: 'magazines',
        orderBy: 'newest',
      },
    });
  });

  it('return request object for specific request', () => {
    const id = 'ytry6756'; // required value
    const obj = Caller.createRequestObject('specific', id);

    assert.isObject(obj, 'return value is an object');
    assert.deepEqual(obj, {
      id: 'ytry6756',
    });
  });
});
