//Check ROLE
module.exports.checkUndefined = (value) => {
     return value === undefined ? true :false
  }

module.exports.checkNull = (valueNull) => {
    return valueNull == null ? true :false ;
 }
 

 //example key = V1=220&V1N=220 => getKeyValue: V1=220
 module.exports.getKeyValue = (str , key) => {
    var value ;
    var strSplit = str.split('&')
    for (let i = 0; i < strSplit.length; i++) {
      if(strSplit[i].search('V1') !== -1)
      {
        value = parseFloat(strSplit[i].split('=')[1]);
        break;
      }
   }
   return value;
   
}



