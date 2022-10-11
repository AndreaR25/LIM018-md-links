

const{ existRuta , absoluteRoute , viewExt} = require('../index');


//path para validate links status 


const path1 = "/Users/andreareyes/Documents/LIM018-md-links/prueba.md";

describe('existRuta',() =>{
  it('should check if path exist', () => {
    const routep = '/Users/andreareyes/Documents/LIM018-md-links/package.json';
    expect(existRuta(routep)).toBeTruthy();
  }); 

  it('should check if path does not exist', () => {
    const routep = 'hola.md';
    expect(existRuta(routep)).toBeFalsy();
  });

  it('should check if the path is absolute', () => {
    const routep = '/Users/andreareyes/Documents/LIM018-md-links/index.js';
    expect(absoluteRoute(routep)).toBe('/Users/andreareyes/Documents/LIM018-md-links/index.js');
  });
  
  it('should give a .md extension',() =>{

    const routep = 'prueba.md';
    expect(viewExt(routep)).toBeTruthy();
  });
})
