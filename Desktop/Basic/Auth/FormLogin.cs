using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace Basic.Auth
{
    public partial class FormLogin : Form
    {
        private static readonly HttpClient client = new HttpClient();

        public FormLogin()
        {
            InitializeComponent();
            this.Text = string.Empty;
            this.ControlBox = false;
            this.DoubleBuffered = true;
            this.MaximizedBounds = Screen.FromHandle(this.Handle).WorkingArea;
          

        }

        static string tokenAuth;

        private void FormLogin_Load(object sender, EventArgs e)
        {
            lableErrEmail.Visible = false;
            lableErrPassword.Visible = false;

        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            #region Check Input
            //Check Input Email
            if (txtEmail.Text==String.Empty)
            {
                lableErrEmail.Visible = true;
                lableErrEmail.Text = "Enter a valid email address";

            }
            else
            {
                 lableErrEmail.Visible = false;
            }

            //Check input Password
            if (txtPassword.Text == String.Empty)
            {
                lableErrPassword.Visible = true;
                lableErrPassword.Text = "Enter a valid password";

            }
            else
            {
                lableErrPassword.Visible = false;
            }
            #endregion
            #region Login Accout
            if (!(txtEmail.Text == String.Empty) && !(txtPassword.Text == String.Empty))
            {

                var values = new Dictionary<string, string>
                {
                   { "email", txtEmail.Text },
                   { "password", txtPassword.Text }
                };

                var content = new FormUrlEncodedContent(values);

               
                try
                {
                    var req = await client.PostAsync("http://localhost:5000/profile/login", content);
                    string reqString = await req.Content.ReadAsStringAsync();
                    JObject reqJson = JObject.Parse(reqString);
                    if( (bool)reqJson["success"])
                    {
                        tokenAuth = (string)reqJson["token"];
                        if(!(tokenAuth == String.Empty))
                        {
                            
                            screenForm Child = new screenForm(tokenAuth);      //Tạo Form2
                            Child.Show();
                            guna2Panel1.Enabled = false;
                        }

                    } 
                    else
                    {
                        if ((bool)reqJson["email"])
                        {
                            lableErrPassword.Visible = true;
                            lableErrPassword.Text = (string)reqJson["message"];
                        }
                        else
                        {

                            lableErrEmail.Visible = true;
                            lableErrEmail.Text = (string)reqJson["message"];
                        }
                    }
             
                }
                catch
                {
                    Application.Exit();
                }




            }

            #endregion



        }

        private void btnForgotPassword_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("https://tnt-iot.herokuapp.com/profile/forgotpassword");
        }

        private void btnSignup_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("https://tnt-iot.herokuapp.com/profile/register/token-project");
        }


        private void txtPassword_OnValueChanged(object sender, EventArgs e)
        {
            lableErrPassword.Visible = false;
        }

        private void txtEmail_OnValueChanged(object sender, EventArgs e)
        {
            lableErrEmail.Visible = false;
        }

      
        private void btnExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
