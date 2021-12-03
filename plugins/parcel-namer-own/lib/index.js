const path = require('path');
const { Namer } = require('@parcel/plugin');

module.exports = new Namer({
  name({ bundle }) {
    const filePath = bundle.getMainEntry().filePath;
    const fileExt = path.extname(filePath);
    const fileName = path.basename(filePath).replace(fileExt, '');
    if (bundle.type === 'png' || bundle.type === 'jpg' || bundle.type === 'jpeg' || bundle.type === 'ico') {
      return `assets/images/${fileName}.${bundle.hashReference}${fileExt}`;
    }
    if (bundle.type === 'css' || bundle.type === 'css.map') {
      return `styles/${fileName}.${bundle.hashReference}${fileExt}`;
    }
    if (bundle.type === 'ttf') {
      return `styles/fonts/${path.basename(filePath)}`;
    }
    if (bundle.type === 'js' || bundle.type === 'js.map') {
      return `scripts/${fileName}.${bundle.hashReference}${fileExt}`;
    }
    if (bundle.type === 'mst') {
      return `assets/templates/${fileName}.${bundle.hashReference}${fileExt}`;
    }
    return null;
  }
});
