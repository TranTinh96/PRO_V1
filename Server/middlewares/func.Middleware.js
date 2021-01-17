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
 


//example key = V1=220&V1N=220 => getKeyValue: V1=220
module.exports.getKeyValue = (str , key) => {
  var value ;
  for (let i = 0; i < str.length; i++) {
    if(str[i].search(key) !== -1)
    {
      value = parseFloat(str[i].split('=')[1]);
      break;
    }
    else
    {
       value=0;
    }
 }
 return value;
 
}


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