using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Basic.Shared
{
    public static class funcService
    {
     
        public static string GetValueString(string dataString, string charFind)
        {
            int lenCharFind = charFind.Length;
            int indexCharFind = dataString.IndexOf(charFind);
            if ( indexCharFind !=-1)
            {
                string strCharFind = dataString.Substring(indexCharFind);
                int indexDauVa = strCharFind.IndexOf('&');
                string strCharToFind  = strCharFind[lenCharFind].ToString();
                string strFind = "=";
                if (indexDauVa !=-1)
                {
                    string strOut=  strCharFind.Substring(lenCharFind + 1, indexDauVa - lenCharFind - 1);
                  
                    if(strCharToFind.Equals(strFind))
                    {
                        return strOut;
                    }
                    return "0";

                }
                else
                {
                   
                    if (strCharToFind.Equals(strFind))
                    {
                         return strCharFind.Substring(lenCharFind + 1);

                    }
                    else
                    {
                        return "0";
                    }
                }
               
            }

            return "0";
        }

       
    }
}
