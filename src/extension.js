const urls = require('get-urls');
const FileType = require('file-type');
const got = require('got');

const getUrls = file => {
  return urls(file, {requireSchemeOrWww: true, stripWWW: false});
}

const getFileType = (url) => {
  console.log(url);
  const stream = got.stream(url);
	return FileType.fromStream(stream);
};

module.exports = {getUrls, getFileType};
