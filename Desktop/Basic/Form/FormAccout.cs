using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Basic
{
    public partial class FormAccout : Form
    {
        private static string  addressEmail, roleAuth ,user;
        public FormAccout(string tokenID)
        {
            InitializeComponent();
            addressEmail = Shared.JWT.JsonToken(tokenID, "email");
            user = Shared.JWT.JsonToken(tokenID, "user");
            roleAuth = Shared.JWT.JsonToken(tokenID, "role");
        }
     

        private void FormAccout_Load(object sender, EventArgs e)
        {
                labEmail.Text = "Email : " + addressEmail;
                lableUser.Text = "User Name : " + user;
                lableRole.Text = "Role : "+ checkRole(roleAuth);

        }
        private string checkRole(string role)
        {
            string roleName;
            switch (role)
            {
                case "ROLE_ADMIN":
                    roleName = "Administrator";
                    break;
                case "ROLE_SEE":
                    roleName = "User";
                    break;
                case "ROLE_CONTROL":
                    roleName = "Control";
                    break;
                case "ROLE_MANAGER":
                    roleName = "Manager";
                    break;

                default:
                    roleName = "User";
                    break;
            }
            return roleName;
        }
    }
}
