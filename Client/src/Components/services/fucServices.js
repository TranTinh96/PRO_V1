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
    var strSplit = str.toString().split('&')
    for (let i = 0; i < strSplit.length; i++) {
      if(strSplit[i].search(key) !== -1)
      {
        value = parseFloat(strSplit[i].split('=')[1]);
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





