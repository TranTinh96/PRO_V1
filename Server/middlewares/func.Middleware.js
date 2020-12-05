module.exports.checkNull = (valueNull) => {
   return valueNull == null ? true :false ;
}

module.exports.checkTokenProject = (tokenLast,token)=>{
   return  tokenLast ===token ? true:false ;
}