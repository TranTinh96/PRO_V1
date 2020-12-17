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
    public partial class FormDashboard : Form
    {
        public FormDashboard()
        {
            InitializeComponent();
        }

        #region  Khai bao bien
        bool statusRelayA = false;
        bool statusRelayB = true;
            
        #endregion
        private void FormDashboard_Load(object sender, EventArgs e)
        {
            btnAutoRelayA.PerformClick();
            btnAutoRelayB.PerformClick();
            panelManualRelayA.Visible = false;
            panelManualRelayB.Visible = false;
            //Relay A
            if (statusRelayA){
                statusOnRelayA.Visible = true;
                statusOffRelayA.Visible = false;
                statusOnRelayA.Dock= DockStyle.Fill;

            }
            else
            {
                statusOnRelayA.Visible = false;
                statusOffRelayA.Visible = true;
                statusOffRelayA.Dock = DockStyle.Fill;
            }
            //RelayB
            if (statusRelayB)
            {
                statusOnRelayB.Visible = true;
                statusOffRelayB.Visible = false;
                statusOnRelayB.Dock = DockStyle.Fill;

            }
            else
            {
                statusOnRelayB.Visible = false;
                statusOffRelayB.Visible = true;
                statusOffRelayB.Dock = DockStyle.Fill;
            }
        }

        #region Control
        private void btnAutoRelayA_Click(object sender, EventArgs e)
        {
            btnAutoRelayA.Enabled = false;
            btnAutoRelayA.BackColor = Color.FromArgb(113, 97, 239);
            btnManualRelayA.BackColor = Color.FromArgb(226, 234, 252);
            btnManualRelayA.Enabled = true;
            panelManualRelayA.Visible = false;
            panelAutoRelayA.Visible = true;


        }

        private void btnManualRelayA_Click(object sender, EventArgs e)
        {
            btnManualRelayA.BackColor = Color.FromArgb(113, 97, 239);
            btnAutoRelayA.BackColor = Color.FromArgb(226, 234, 252);
            btnAutoRelayA.Enabled = true;
            panelManualRelayA.Visible = true;
            panelAutoRelayA.Visible = false;
        }

        private void btnAutoRelayB_Click(object sender, EventArgs e)
        {
            btnAutoRelayB.Enabled = false;
            btnAutoRelayB.BackColor = Color.FromArgb(113, 97, 239);
            btnManualRelayB.BackColor = Color.FromArgb(226, 234, 252);
            btnManualRelayB.Enabled = true;
            panelManualRelayB.Visible = false;
            panelAutoRelayB.Visible = true;
        }

        private void btnManualRelayB_Click(object sender, EventArgs e)
        {
            btnManualRelayB.BackColor = Color.FromArgb(113, 97, 239);
            btnAutoRelayB.BackColor = Color.FromArgb(226, 234, 252);
            btnAutoRelayB.Enabled = true;
            panelManualRelayB.Visible = true;
            panelAutoRelayB.Visible = false;
        }

        

        private void btnSetAutoRelayA_Click(object sender, EventArgs e)
        {
            
        }

        private void btnSetAutoRelayB_Click(object sender, EventArgs e)
        {
            
        }

       

        private void btnManualOnRelayA_Click(object sender, EventArgs e)
        {
            btnManualOnRelayA.Enabled = false;
            btnManualOffRelayA.Enabled = true;
        }

        private void btnManualOffRelayA_Click(object sender, EventArgs e)
        {
            btnManualOnRelayA.Enabled = true;
            btnManualOffRelayA.Enabled = false;
        }

        private void btnManualOnRelayB_Click(object sender, EventArgs e)
        {
            btnManualOnRelayB.Enabled = false;
            btnManualOffRelayB.Enabled = true;
        }

        private void btnManualOffRelayB_Click(object sender, EventArgs e)
        {
            btnManualOnRelayB.Enabled = true;
            btnManualOffRelayB.Enabled = false;
        }
        #endregion Control
    }
}
