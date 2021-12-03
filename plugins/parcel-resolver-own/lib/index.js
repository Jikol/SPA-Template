const path = require('path');
const { Resolver } = require('@parcel/plugin');

module.exports = new Resolver({
  async resolve({ specifier }) {
    const fileName = path.basename(specifier);
    if (fileName === 'config.js') {
      return { isExcluded: true }
    }
    return null;
  }
});
