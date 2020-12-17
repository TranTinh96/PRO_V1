
namespace Basic
{
    partial class screenForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(screenForm));
            this.panelMenu = new System.Windows.Forms.Panel();
            this.lableTime = new System.Windows.Forms.Label();
            this.btnAccout = new FontAwesome.Sharp.IconButton();
            this.btnAlarms = new FontAwesome.Sharp.IconButton();
            this.btnDataTables = new FontAwesome.Sharp.IconButton();
            this.btnDashboard = new FontAwesome.Sharp.IconButton();
            this.panelLogo = new System.Windows.Forms.Panel();
            this.btnHome = new System.Windows.Forms.PictureBox();
            this.panelHeader = new System.Windows.Forms.Panel();
            this.btnExit = new FontAwesome.Sharp.IconButton();
            this.btnScreen = new FontAwesome.Sharp.IconButton();
            this.btnSearch = new FontAwesome.Sharp.IconButton();
            this.btnMenu = new FontAwesome.Sharp.IconButton();
            this.btnTask = new FontAwesome.Sharp.IconButton();
            this.btnNotification = new FontAwesome.Sharp.IconButton();
            this.btnProfile = new System.Windows.Forms.PictureBox();
            this.btnShowProfile = new FontAwesome.Sharp.IconButton();
            this.panelDesktop = new System.Windows.Forms.Panel();
            this.panelMenu.SuspendLayout();
            this.panelLogo.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnHome)).BeginInit();
            this.panelHeader.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnProfile)).BeginInit();
            this.SuspendLayout();
            // 
            // panelMenu
            // 
            this.panelMenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.panelMenu.Controls.Add(this.lableTime);
            this.panelMenu.Controls.Add(this.btnAccout);
            this.panelMenu.Controls.Add(this.btnAlarms);
            this.panelMenu.Controls.Add(this.btnDataTables);
            this.panelMenu.Controls.Add(this.btnDashboard);
            this.panelMenu.Controls.Add(this.panelLogo);
            this.panelMenu.Dock = System.Windows.Forms.DockStyle.Left;
            this.panelMenu.Location = new System.Drawing.Point(0, 0);
            this.panelMenu.Name = "panelMenu";
            this.panelMenu.Size = new System.Drawing.Size(250, 966);
            this.panelMenu.TabIndex = 0;
            // 
            // lableTime
            // 
            this.lableTime.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.lableTime.Font = new System.Drawing.Font("Open Sans SemiBold", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lableTime.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.lableTime.Location = new System.Drawing.Point(0, 911);
            this.lableTime.Name = "lableTime";
            this.lableTime.Size = new System.Drawing.Size(250, 55);
            this.lableTime.TabIndex = 6;
            this.lableTime.Text = "15-12-2020";
            this.lableTime.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnAccout
            // 
            this.btnAccout.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnAccout.FlatAppearance.BorderSize = 0;
            this.btnAccout.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAccout.Font = new System.Drawing.Font("Open Sans SemiBold", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAccout.ForeColor = System.Drawing.SystemColors.Control;
            this.btnAccout.IconChar = FontAwesome.Sharp.IconChar.User;
            this.btnAccout.IconColor = System.Drawing.Color.Lavender;
            this.btnAccout.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnAccout.IconSize = 19;
            this.btnAccout.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnAccout.Location = new System.Drawing.Point(0, 230);
            this.btnAccout.Name = "btnAccout";
            this.btnAccout.Padding = new System.Windows.Forms.Padding(20, 0, 20, 0);
            this.btnAccout.Size = new System.Drawing.Size(250, 55);
            this.btnAccout.TabIndex = 5;
            this.btnAccout.Text = "Accout";
            this.btnAccout.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnAccout.UseVisualStyleBackColor = true;
            this.btnAccout.Click += new System.EventHandler(this.btnAccout_Click);
            // 
            // btnAlarms
            // 
            this.btnAlarms.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnAlarms.FlatAppearance.BorderSize = 0;
            this.btnAlarms.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAlarms.Font = new System.Drawing.Font("Open Sans SemiBold", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAlarms.ForeColor = System.Drawing.SystemColors.ControlLight;
            this.btnAlarms.IconChar = FontAwesome.Sharp.IconChar.Bell;
            this.btnAlarms.IconColor = System.Drawing.Color.Lavender;
            this.btnAlarms.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnAlarms.IconSize = 19;
            this.btnAlarms.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnAlarms.Location = new System.Drawing.Point(0, 175);
            this.btnAlarms.Name = "btnAlarms";
            this.btnAlarms.Padding = new System.Windows.Forms.Padding(20, 0, 20, 0);
            this.btnAlarms.Size = new System.Drawing.Size(250, 55);
            this.btnAlarms.TabIndex = 4;
            this.btnAlarms.Text = "Alarms";
            this.btnAlarms.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnAlarms.UseVisualStyleBackColor = true;
            this.btnAlarms.Click += new System.EventHandler(this.btnAlarms_Click);
            // 
            // btnDataTables
            // 
            this.btnDataTables.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnDataTables.FlatAppearance.BorderSize = 0;
            this.btnDataTables.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDataTables.Font = new System.Drawing.Font("Open Sans SemiBold", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDataTables.ForeColor = System.Drawing.SystemColors.Control;
            this.btnDataTables.IconChar = FontAwesome.Sharp.IconChar.Table;
            this.btnDataTables.IconColor = System.Drawing.Color.Lavender;
            this.btnDataTables.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnDataTables.IconSize = 19;
            this.btnDataTables.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnDataTables.Location = new System.Drawing.Point(0, 120);
            this.btnDataTables.Name = "btnDataTables";
            this.btnDataTables.Padding = new System.Windows.Forms.Padding(20, 0, 20, 0);
            this.btnDataTables.Size = new System.Drawing.Size(250, 55);
            this.btnDataTables.TabIndex = 3;
            this.btnDataTables.Text = "Data Tables";
            this.btnDataTables.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnDataTables.UseVisualStyleBackColor = true;
            this.btnDataTables.Click += new System.EventHandler(this.btnDataTables_Click);
            // 
            // btnDashboard
            // 
            this.btnDashboard.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnDashboard.FlatAppearance.BorderSize = 0;
            this.btnDashboard.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDashboard.Font = new System.Drawing.Font("Open Sans SemiBold", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDashboard.ForeColor = System.Drawing.SystemColors.Control;
            this.btnDashboard.IconChar = FontAwesome.Sharp.IconChar.ChartBar;
            this.btnDashboard.IconColor = System.Drawing.Color.Lavender;
            this.btnDashboard.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnDashboard.IconSize = 20;
            this.btnDashboard.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnDashboard.Location = new System.Drawing.Point(0, 65);
            this.btnDashboard.Name = "btnDashboard";
            this.btnDashboard.Padding = new System.Windows.Forms.Padding(20, 0, 20, 0);
            this.btnDashboard.Size = new System.Drawing.Size(250, 55);
            this.btnDashboard.TabIndex = 2;
            this.btnDashboard.Text = "Dashboard";
            this.btnDashboard.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnDashboard.UseVisualStyleBackColor = true;
            this.btnDashboard.Click += new System.EventHandler(this.btnDashboard_Click);
            // 
            // panelLogo
            // 
            this.panelLogo.Controls.Add(this.btnHome);
            this.panelLogo.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelLogo.Location = new System.Drawing.Point(0, 0);
            this.panelLogo.Name = "panelLogo";
            this.panelLogo.Size = new System.Drawing.Size(250, 65);
            this.panelLogo.TabIndex = 1;
            // 
            // btnHome
            // 
            this.btnHome.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.btnHome.Image = ((System.Drawing.Image)(resources.GetObject("btnHome.Image")));
            this.btnHome.Location = new System.Drawing.Point(0, 0);
            this.btnHome.Name = "btnHome";
            this.btnHome.Size = new System.Drawing.Size(250, 65);
            this.btnHome.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
            this.btnHome.TabIndex = 0;
            this.btnHome.TabStop = false;
            this.btnHome.Click += new System.EventHandler(this.btnHome_Click);
            // 
            // panelHeader
            // 
            this.panelHeader.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.panelHeader.Controls.Add(this.btnExit);
            this.panelHeader.Controls.Add(this.btnScreen);
            this.panelHeader.Controls.Add(this.btnSearch);
            this.panelHeader.Controls.Add(this.btnMenu);
            this.panelHeader.Controls.Add(this.btnTask);
            this.panelHeader.Controls.Add(this.btnNotification);
            this.panelHeader.Controls.Add(this.btnProfile);
            this.panelHeader.Controls.Add(this.btnShowProfile);
            this.panelHeader.Cursor = System.Windows.Forms.Cursors.No;
            this.panelHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelHeader.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.panelHeader.Location = new System.Drawing.Point(250, 0);
            this.panelHeader.Name = "panelHeader";
            this.panelHeader.Size = new System.Drawing.Size(1134, 65);
            this.panelHeader.TabIndex = 0;
            // 
            // btnExit
            // 
            this.btnExit.FlatAppearance.BorderSize = 0;
            this.btnExit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnExit.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.btnExit.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(239)))), ((int)(((byte)(35)))), ((int)(((byte)(60)))));
            this.btnExit.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnExit.IconSize = 18;
            this.btnExit.Location = new System.Drawing.Point(543, 12);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(25, 20);
            this.btnExit.TabIndex = 10;
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // btnScreen
            // 
            this.btnScreen.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnScreen.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnScreen.FlatAppearance.BorderSize = 0;
            this.btnScreen.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnScreen.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnScreen.IconChar = FontAwesome.Sharp.IconChar.Expand;
            this.btnScreen.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.btnScreen.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnScreen.IconSize = 22;
            this.btnScreen.Location = new System.Drawing.Point(80, 0);
            this.btnScreen.Name = "btnScreen";
            this.btnScreen.Size = new System.Drawing.Size(40, 65);
            this.btnScreen.TabIndex = 9;
            this.btnScreen.UseVisualStyleBackColor = false;
            // 
            // btnSearch
            // 
            this.btnSearch.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnSearch.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnSearch.FlatAppearance.BorderSize = 0;
            this.btnSearch.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSearch.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnSearch.IconChar = FontAwesome.Sharp.IconChar.Search;
            this.btnSearch.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.btnSearch.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnSearch.IconSize = 22;
            this.btnSearch.Location = new System.Drawing.Point(40, 0);
            this.btnSearch.Name = "btnSearch";
            this.btnSearch.Size = new System.Drawing.Size(40, 65);
            this.btnSearch.TabIndex = 8;
            this.btnSearch.UseVisualStyleBackColor = false;
            // 
            // btnMenu
            // 
            this.btnMenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnMenu.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnMenu.FlatAppearance.BorderSize = 0;
            this.btnMenu.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnMenu.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnMenu.IconChar = FontAwesome.Sharp.IconChar.Bars;
            this.btnMenu.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.btnMenu.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnMenu.IconSize = 22;
            this.btnMenu.Location = new System.Drawing.Point(0, 0);
            this.btnMenu.Name = "btnMenu";
            this.btnMenu.Size = new System.Drawing.Size(40, 65);
            this.btnMenu.TabIndex = 7;
            this.btnMenu.UseVisualStyleBackColor = false;
            // 
            // btnTask
            // 
            this.btnTask.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnTask.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnTask.FlatAppearance.BorderSize = 0;
            this.btnTask.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTask.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnTask.IconChar = FontAwesome.Sharp.IconChar.Tasks;
            this.btnTask.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.btnTask.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnTask.IconSize = 22;
            this.btnTask.Location = new System.Drawing.Point(969, 0);
            this.btnTask.Name = "btnTask";
            this.btnTask.Size = new System.Drawing.Size(40, 65);
            this.btnTask.TabIndex = 6;
            this.btnTask.UseVisualStyleBackColor = false;
            // 
            // btnNotification
            // 
            this.btnNotification.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnNotification.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnNotification.FlatAppearance.BorderSize = 0;
            this.btnNotification.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnNotification.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnNotification.IconChar = FontAwesome.Sharp.IconChar.Bell;
            this.btnNotification.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.btnNotification.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnNotification.IconSize = 22;
            this.btnNotification.Location = new System.Drawing.Point(1009, 0);
            this.btnNotification.Name = "btnNotification";
            this.btnNotification.Size = new System.Drawing.Size(50, 65);
            this.btnNotification.TabIndex = 5;
            this.btnNotification.UseVisualStyleBackColor = false;
            // 
            // btnProfile
            // 
            this.btnProfile.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnProfile.Image = ((System.Drawing.Image)(resources.GetObject("btnProfile.Image")));
            this.btnProfile.Location = new System.Drawing.Point(1059, 0);
            this.btnProfile.Margin = new System.Windows.Forms.Padding(3, 3, 5, 3);
            this.btnProfile.Name = "btnProfile";
            this.btnProfile.Size = new System.Drawing.Size(45, 65);
            this.btnProfile.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
            this.btnProfile.TabIndex = 4;
            this.btnProfile.TabStop = false;
            // 
            // btnShowProfile
            // 
            this.btnShowProfile.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnShowProfile.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnShowProfile.FlatAppearance.BorderSize = 0;
            this.btnShowProfile.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnShowProfile.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(46)))), ((int)(((byte)(62)))));
            this.btnShowProfile.IconChar = FontAwesome.Sharp.IconChar.ChevronDown;
            this.btnShowProfile.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(114)))), ((int)(((byte)(124)))), ((int)(((byte)(245)))));
            this.btnShowProfile.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnShowProfile.IconSize = 16;
            this.btnShowProfile.Location = new System.Drawing.Point(1104, 0);
            this.btnShowProfile.Name = "btnShowProfile";
            this.btnShowProfile.Size = new System.Drawing.Size(30, 65);
            this.btnShowProfile.TabIndex = 3;
            this.btnShowProfile.UseVisualStyleBackColor = false;
            // 
            // panelDesktop
            // 
            this.panelDesktop.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelDesktop.Location = new System.Drawing.Point(250, 65);
            this.panelDesktop.Name = "panelDesktop";
            this.panelDesktop.Size = new System.Drawing.Size(1134, 901);
            this.panelDesktop.TabIndex = 1;
            // 
            // screenForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(34)))), ((int)(((byte)(37)))), ((int)(((byte)(47)))));
            this.ClientSize = new System.Drawing.Size(1384, 966);
            this.Controls.Add(this.panelDesktop);
            this.Controls.Add(this.panelHeader);
            this.Controls.Add(this.panelMenu);
            this.MaximumSize = new System.Drawing.Size(1400, 1005);
            this.MinimumSize = new System.Drawing.Size(1400, 1005);
            this.Name = "screenForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Load += new System.EventHandler(this.FormDashboard_Load);
            this.panelMenu.ResumeLayout(false);
            this.panelLogo.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.btnHome)).EndInit();
            this.panelHeader.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.btnProfile)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelMenu;
        private System.Windows.Forms.Panel panelHeader;
        private System.Windows.Forms.Panel panelLogo;
        private System.Windows.Forms.PictureBox btnHome;
        private FontAwesome.Sharp.IconButton btnDashboard;
        private FontAwesome.Sharp.IconButton btnDataTables;
        private FontAwesome.Sharp.IconButton btnAccout;
        private FontAwesome.Sharp.IconButton btnAlarms;
        private FontAwesome.Sharp.IconButton btnShowProfile;
        private FontAwesome.Sharp.IconButton btnTask;
        private FontAwesome.Sharp.IconButton btnNotification;
        private System.Windows.Forms.PictureBox btnProfile;
        private FontAwesome.Sharp.IconButton btnScreen;
        private FontAwesome.Sharp.IconButton btnSearch;
        private FontAwesome.Sharp.IconButton btnMenu;
        private System.Windows.Forms.Label lableTime;
        private FontAwesome.Sharp.IconButton btnExit;
        private System.Windows.Forms.Panel panelDesktop;
    }
}

