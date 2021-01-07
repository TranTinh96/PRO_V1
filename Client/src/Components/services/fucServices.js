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

 //example key = V1=220&V1N=220 => getKeyValue: V1=220
 module.exports.getKeyValue2Int = (str , key) => {
   var value ;
   for (let i = 0; i < str.length; i++) {
     if(str[i].search(key) !== -1)
     {
       value = parseInt(str[i].split('=')[1]);
       break;
     }
     else
     {
        value=0;
     }
  }
  return value;
  
}

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
     else
     {
        value =' ';
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
 
 
 



