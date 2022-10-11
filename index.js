// module.exports = () => {
//   // ...
// };
//se importan los metodos desde fs y path 
const { default: axios } = require('axios')
const { link } = require('node:fs')
const fs = require('node:fs')
const path = require('node:path')
const routep =  './prueba.md'

console.log(path.sep)

const existRuta = (routep) => fs.existsSync(routep)

console.log(existRuta(routep))

const absoluteRoute = (routep) => path.isAbsolute(routep)?routep:path.resolve(routep)

console.log("Es absoluta",absoluteRoute("prueba.md"))

const viewExt = (routep) => path.extname(routep) === '.md'

console.log('extension',viewExt(routep))

const readFile = (routep) => fs.readFileSync(routep,'utf-8')

console.log("readFile",readFile(routep));

const getLinks = (routep) =>{
   const regular = /(\[(.*?)\])?\(http(.*?)\)/gm
   const arr= [];

   const  links =readFile(routep).match(regular)
   
   if(link!==null){
       links.forEach(element=>{
       const findParenthesis= /\(([^)]+)\)/
       const findLinks = findParenthesis.exec(links);
       const href = findLinks[1];
       const text = element.slice(1,element.indexOf("]"));
       const correctText = text.length >50 ? text.slice(0,50):text
       const file = routep
       const petition = {href,
                        text:correctText,
                        file}
        arr.push(petition)
       })
    

    return arr

   } else {
     console.log("No se encontraron links")
     return []
   }

}
console.log("prueba",getLinks(routep))

const validaLinkStatus =(arr)=>{
const arrayofOb = getLinks(arr);
return Promise.all(arrayofOb.map((link)=>{
  return axios.get(link.href )
  .then((response)=>{
    link.status = response.status;
    link.message =response.statusText
 
    return link;
  })
  .catch((error)=>{
    link.status= 502
    link.message="Fail"

    return link;
  })
}))
}
validaLinkStatus(routep).then((objeto)=> console.log(objeto))




module.exports = {
    existRuta, absoluteRoute, viewExt
};