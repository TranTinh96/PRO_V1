//Check ROLE
module.exports.checkUndefined = (value) => {
     return value === 'undefined' ? true :false
  }

module.exports.checkTypeUndefined = (value) => {
   return  value === undefined ? true :false
}


module.exports.checkNull = (valueNull) => {
    return valueNull == null ? true :false ;
 }

 module.exports.checkRole = (role) => {
   return role == "Administrator" ? true :false ;
}

module.exports.checkValue= (value) => {
    if(value ===null ||value === undefined)
          return true
    return false
}
module.exports.checkString= (value) => {
   if(value ||value === '')
         return true
   return false
}

module.exports.isEmpty =(obj) =>{
   for(var prop in obj) {
       if(obj.hasOwnProperty(prop))
           return false;
   }

   return true;
}
 

 //example key = V1=220&V1N=220 => getKeyValue: V1=220
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
       var lenEnd = indexDauVa ;
       lenEnd = indexDauVa !== -1 ? lenEnd : lenStr;
 
       return parseFloat(strCharFind.slice(lenCharFind + 1, lenEnd));
     }
     return 0;
   }
   return 0;
 };
 //VD
 module.exports.getKeyValuePhase3 = (dataString, charFind) => {
   console.log(dataString)
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

 
 //example key = V1=220&V1N=220 => getKeyValue: V1=220
 module.exports.getKeyValue2Int = (dataString, charFind) => {
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
 
       return parseInt(strCharFind.slice(lenCharFind + 1, lenEnd));
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
 

//example if(limitData =5) array =[100 ,200,300,400,500,600,700] => array =[200,300,400,500,600,700]
//VD: lenghtArray =10 , limit =5
module.exports.limitData = (array ,limit ,data) => {
  var lengthArray = array.length 
  if(lengthArray > limit )
  {
   for (let i = 0;  i < (lengthArray -limit + 1); i++) {
      array.shift();
   }
  }
  array.push(data);   

  return array
}

module.exports.checkNumber = (number) => {
   return (typeof number == 'number')? true :false
 }
 
 
 



