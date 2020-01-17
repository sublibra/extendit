let axios = require('axios');

const key = 'eyJhbGciOiJFUzM4NCIsImtpZCI6IjRkMzMzNGFiLTVjMTItNGQ0MC1iZDlhLTdjZDdkZDZjOGI3OCIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiYk9vd0hpNnB4bjBHYVVjWEluYTRvRmNvNjJhZzl1b0giLCJqdGkiOiI0ZDMzMzRhYi01YzEyLTRkNDAtYmQ5YS03Y2Q3ZGQ2YzhiNzgiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoidXIwX0hGR3Mtc3Fjd2RfSUx4Y1lBT1dXX1dmRVJjTFQifQ.HWddQqHQ7cOkxz_0JqD2l3GVkhoAx9UqT56uHihTVFcLfY7uRu3JlR1ipz-Fq8AKvGA2xH6rSOiS49srz16hEJj654p7Tzyo8QRvodwIkQQzFVzchnTUmvgdt7UarpYm';

axios.defaults.headers.common['Authorization'] = key;

const validURL = str => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const uploadExtension = async extensionFile => {
  console.log('Not implemented');
};

module.exports = {getData, validURL, uploadExtension}