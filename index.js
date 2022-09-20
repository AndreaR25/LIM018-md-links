// module.exports = () => {
//   // ...
// };

const fs = require("fs")
const path = require("path")

const existRuta = (path) => fs.existsSync(path)

console.log(existRuta(/Users/andreareyes/Documents/LIM018-md-links/test/md-links.spec.js))