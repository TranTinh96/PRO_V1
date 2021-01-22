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
       var lenEnd = indexDauVa - indexCharFind;
       lenEnd = indexDauVa !== -1 ? lenEnd : lenStr;
 
       return parseInt(strCharFind.slice(lenCharFind + 1, lenEnd));
     }
     return 0;
   }
   return 0;
 };

//example key = V1=220&V1N=220 => getKeyValue: V1=220
module.exports.getKeyValueString = (str , key) => {
   var value ;
   for (let i = 0; i < str.length; i++) {
     if(str[i].search(key) !== -1)
     {
       value = str[i].split('=')[1];
       value=value.toString()
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






