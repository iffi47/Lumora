// Run explicitly; never imported by the storefront.
require('dotenv').config({path: '.env.local'});
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Module = require('module');
const {transformSync} = require('@babel/core');
function loadSource(relativePath) {
 const filename = path.resolve(relativePath);
 const compiled = transformSync(fs.readFileSync(filename, 'utf8'), {
  filename, presets: [['@babel/preset-env', {targets: {node: 'current'}, modules: 'commonjs'}]],
  babelrc: false, configFile: false,
 }).code;
 const compiledModule = new Module(filename, module);
 compiledModule.filename = filename;
 compiledModule.paths = Module._nodeModulePaths(path.dirname(filename));
 compiledModule._compile(compiled, filename);
 return compiledModule.exports;
}
async function main() {
 if (!process.env.REACT_APP_FIREBASE_PROJECT_ID || !process.env.REACT_APP_FIREBASE_API_KEY) {
  throw new Error('Firebase project ID and API key must be configured in .env.local or .env.');
 }
 const {addCollectionAndDocuments, getCategoriesAndDocuments} = loadSource('src/utlis/firebase.utils.js');
 const {SHOP_DATA} = loadSource('src/shop-data.js');
 const created = await addCollectionAndDocuments('categories', SHOP_DATA, 'lumora-catalog-v1');
 const stored = await getCategoriesAndDocuments();
 const imported = SHOP_DATA.map(category => stored.find(item => item.title === category.title));
 if (imported.some((category, index) => !category || SHOP_DATA[index].items.some(product =>
  !category.items.some(item => item.id === product.id)))) {
  throw new Error('Catalog verification failed: expected imported products are missing.');
 }
 console.log(`Verified ${imported.length} Lumora categories and ${imported.reduce((count, category) => count + category.items.length, 0)} products in Firestore.`);
 console.log(created ? 'Created Lumora categories and products in Firestore.' : 'Lumora seed already completed; no writes performed.');
}
main().then(() => process.exit(0)).catch(error => {
 console.error('Catalog seed failed:', error.code || error.message);
 process.exit(1);
});
