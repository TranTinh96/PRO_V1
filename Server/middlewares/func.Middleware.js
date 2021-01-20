module.exports.checkNull = (valueNull) => {
   return valueNull === null ? true :false ;
}

module.exports.checkTokenProject = (tokenLast,token)=>{
   return  tokenLast ===token ? true:false ;
}

module.exports.checkUndefined = (value) => {
   return value === undefined ? true :false
}

module.exports.checkTypeUndefined = (value) => {
 return  value === undefined ? true :false
}


module.exports.checkNull = (valueNull) => {
  return valueNull == null ? true :false ;
}


module.exports.checkArray = (array) => {
   if (array === undefined || array.length == 0) {
       return true;
   }
   return false;
 }
 


module.exports.getKeyValue = (dataString, charFind) => {
  var lenStr = dataString.length;
  var lenCharFind = charFind.length;
  var indexCharFind = dataString.indexOf(charFind);
  if (indexCharFind !== -1) {
    var strCharFind = dataString.substring(indexCharFind);
    var indexDauVa = strCharFind.indexOf("&");
    var strCharToFind = strCharFind.slice(lenCharFind).toString();
    var strFind = "=";
    if (strCharToFind[0] === strFind) {
      var lenEnd = indexDauVa - indexCharFind;
      lenEnd = indexDauVa !== -1 ? lenEnd : lenStr;

      return parseFloat(strCharFind.slice(lenCharFind + 1, lenEnd));
    }
    return 0;
  }
  return 0;
};

 



module.exports.getKeyValueString = (str , key ,preValue) => {
   var value =preValue ;
   for (let i = 0; i < str.length; i++) {
     if(str[i].search(key) !== -1)
     {
       value = str[i].split('=')[1].toString();
       break;
     }
    
  }
  return value;
 }
 
 module.exports.getKeyValueStringTime = (str , key ,preValue) => {
   var value =preValue ;
   for (let i = 0; i < str.length; i++) {
     if(str[i].search(key) !== -1)
     {
       var valueTime = str[i].split('=')[1]
       value =valueTime.split(":")[0]+":"+valueTime.split(":")[1]
       break;
     }
    
  }
  return value;
  
 }