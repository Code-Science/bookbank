import axios from 'axios';

export default class Caller {
  constructor(requestObj, type) {
    this.type = type;
    if (type === 'general') {
      this.queryObj = requestObj;
    } else if (type === 'specific') {
      this.idObj = requestObj;
    }
  }

  async getResult() {
    let url;
    if (this.type === 'general') {
      url = this.createUrl(this.queryObj);
      const result = await axios.get(url);
      this.result = result.data.items;
      return result.data.items;
    }
    url = this.createUrl(this.idObj);
    const result = await axios.get(url);
    this.result = result.data;
    return result.data;
  }

  createUrl(reqObj) {
    let queryString = '';
    let optionalQueryString = '';
    if (this.type === 'general') {
      if (reqObj.standardQueryParams) {
        queryString = Object.keys(reqObj.standardQueryParams).reduce(
          (acc, currKey) => {
            const value = reqObj.standardQueryParams[currKey];
            if (currKey === 'keywords') {
              if (value) {
                const valueArray = value.split(' ');
                const str = valueArray.reduce((acc1, curr) => {
                  const str1 = acc1.trim();
                  const str2 = curr.trim();
                  return `${str1}+${str2}`;
                });
                return `${acc}${str}`;
              }
              return `${acc}`;
            }
            return `${acc}+${currKey}:${value}`;
          },
          '?q='
        );
      }

      if (reqObj.additionalQueryParams) {
        optionalQueryString = Object.keys(reqObj.additionalQueryParams).reduce(
          (acc, currkey, i) => {
            const value = reqObj.additionalQueryParams[currkey];
            if (i === 0) {
              return `${acc}${currkey}=${value}`;
            }
            return `${acc}&${currkey}=${value}`;
          },
          '&'
        );
      }

      return `${process.env.BASE_URL}/books/v1/volumes${queryString}${optionalQueryString}&key=${process.env.API_KEY}`;
    }
    const { id } = reqObj;
    return `${process.env.BASE_URL}/books/v1/volumes/${id}?key=${process.env.API_KEY}`;
  }

  static createRequestObject(
    type,
    keywordOrId,
    standardQueryParamsObject = null,
    additionalQueryParamsObject = null
  ) {
    // For general search, both additional and standard query params are optional, only keywords is required.

    if (type === 'general') {
      // second argument would automatically be considered as keyword for general search.
      const reqObj = {
        standardQueryParams: {
          keywords: keywordOrId,
        },
      };
      if (standardQueryParamsObject) {
        Object.keys(standardQueryParamsObject).forEach((key) => {
          if (standardQueryParamsObject[key] !== '') {
            reqObj.standardQueryParams[key] = standardQueryParamsObject[key];
          }
        });
      }
      if (additionalQueryParamsObject) {
        reqObj.additionalQueryParams = {};
        Object.keys(additionalQueryParamsObject).forEach((key) => {
          if (additionalQueryParamsObject[key] !== '') {
            reqObj.additionalQueryParams[key] =
              additionalQueryParamsObject[key];
          }
        });
      }
      return reqObj;
    }
    // if not general then
    const reqObj = {
      id: keywordOrId, // second argument would be considered as id value.
    };
    return reqObj;
  }
}
