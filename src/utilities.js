const limitString = (string, limit = 20) => {
  const newString = [];
  if (string.length > limit) {
    string.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newString.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newString.join(' ')} ...`;
  }
  return string;
};

module.exports = {
  limitString,
};
