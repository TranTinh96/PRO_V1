using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using FontAwesome.Sharp;
using System.IdentityModel.Tokens.Jwt;
using Basic.Auth;

namespace Basic
{
    public partial class screenForm : Form
    {
        //Fields
        private IconButton currentBtn;
        private Panel leftBorderBtn;
        private Form currentChildForm;

        private static string tokenID ,addressEmail , roleAuth;
        public screenForm(string tokenAuth)
        {
            InitializeComponent();
            leftBorderBtn = new Panel();
            leftBorderBtn.Size = new Size(5, 55);
            panelMenu.Controls.Add(leftBorderBtn);
            //Form
            this.Text = string.Empty;
            this.ControlBox = false;
            this.DoubleBuffered = true;
            this.MaximizedBounds = Screen.FromHandle(this.Handle).WorkingArea;
            tokenID = tokenAuth;
            addressEmail = Shared.JWT.JsonToken(tokenID, "email");
            lableUser.Text = Shared.JWT.JsonToken(tokenID, "user");
            roleAuth = Shared.JWT.JsonToken(tokenID, "role");
            lableRole.Text = checkRole(Shared.JWT.JsonToken(tokenID, "role"));
        }
  
        //Structs
        private struct RGBColors
        {
            public static Color color1 = Color.FromArgb(0, 245, 212);
            public static Color color2 = Color.FromArgb(249, 118, 176);
            public static Color color3 = Color.FromArgb(253, 138, 114);
            public static Color color4 = Color.FromArgb(239, 35, 60);
            public static Color color5 = Color.FromArgb(249, 88, 155);
            public static Color color6 = Color.FromArgb(24, 161, 251);
        }
        //Methods
        private void ActivateButton(object senderBtn, Color color)
        {
            if (senderBtn != null)
            {
                DisableButton();
                //Button
                currentBtn = (IconButton)senderBtn;
                currentBtn.BackColor = Color.FromArgb(49, 71, 94);
                currentBtn.ForeColor = color;
                currentBtn.TextAlign = ContentAlignment.MiddleLeft ;
                currentBtn.IconColor = color;
                currentBtn.TextImageRelation = TextImageRelation.ImageBeforeText;
                currentBtn.ImageAlign = ContentAlignment.MiddleLeft;
                leftBorderBtn.BackColor = color;
                leftBorderBtn.Location = new Point(0, currentBtn.Location.Y);
                leftBorderBtn.Visible = true;
                leftBorderBtn.BringToFront();
            }
        }
        private void DisableButton()
        {
            if (currentBtn != null)
            {
                currentBtn.BackColor = Color.FromArgb(36, 46, 62);
                currentBtn.ForeColor = Color.Gainsboro;
                currentBtn.TextAlign = ContentAlignment.MiddleLeft;
                currentBtn.IconColor = Color.Gainsboro;
                currentBtn.TextImageRelation = TextImageRelation.ImageBeforeText;
                currentBtn.ImageAlign = ContentAlignment.MiddleLeft;
            }
        }
        private void OpenChildForm(Form childForm)
        {
            //open only form
            if (currentChildForm != null)
            {
                currentChildForm.Close();
            }
            currentChildForm = childForm;
            //End
            childForm.TopLevel = false;
            childForm.FormBorderStyle = FormBorderStyle.None;
            childForm.Dock = DockStyle.Fill;
            panelDesktop.Controls.Add(childForm);
            panelDesktop.Tag = childForm;
            childForm.BringToFront();
            childForm.Show();
        }
        private void Reset()
        {
            DisableButton();
            leftBorderBtn.Visible = false;
           
        }

        private void btnHome_Click(object sender, EventArgs e)
        {
            btnDashboard.PerformClick();
        }

        private void btnDashboard_Click(object sender, EventArgs e)
        {
            ActivateButton(sender, RGBColors.color1);
            OpenChildForm(new FormDashboard(tokenID));
        }

        private void btnDataTables_Click(object sender, EventArgs e)
        {
            ActivateButton(sender, RGBColors.color2);
            OpenChildForm(new FormDataTables(tokenID));
        }

        private void btnAlarms_Click(object sender, EventArgs e)
        {
            ActivateButton(sender, RGBColors.color3);
            OpenChildForm(new FormAlarms(tokenID));
        }

        private void btnAccout_Click(object sender, EventArgs e)
        {
            ActivateButton(sender, RGBColors.color4);
            OpenChildForm(new FormAccout(tokenID));
        }

        private void FormDashboard_Load(object sender, EventArgs e)
        {

           

            DateTime tn = DateTime.Now;
            lableTime.Text = tn.ToString("dd-MM-yyyy");
            btnDashboard.PerformClick();
        }


        private void btnExit_Click(object sender, EventArgs e)
        {
            FormLogin Child = new FormLogin();
            this.Hide();
            Child.ShowDialog();

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
