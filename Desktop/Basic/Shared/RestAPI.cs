using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Basic.Shared
{
    public static class RestAPI
    {
        private static readonly string baseURL = "http://localhost:5000/";

        public static async Task<string> Post (string url, string token, string idProject)
        {
            var reqData = new Dictionary<string, string>
            {
                {"_idProject", idProject }
            };
            var req = new FormUrlEncodedContent(reqData);
            using(HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                using (HttpResponseMessage res = await client.PostAsync(baseURL + url ,req))
                {
                    using (HttpContent content = res.Content)
                    {
                        string data = await content.ReadAsStringAsync();
                        if(data != String.Empty)
                        {
                            return data;
                        }
                       
                    }
                }
            }
            return string.Empty;
        }

    }
}
