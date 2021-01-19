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
                if(indexDauVa !=-1)
                {
                    return strCharFind.Substring(lenCharFind + 1, indexDauVa - lenCharFind - 1);
                }
                return strCharFind.Substring(lenCharFind + 1);
            }

            return "0";
        }
    }
}
