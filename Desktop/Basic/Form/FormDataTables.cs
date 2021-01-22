using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using Newtonsoft.Json.Linq;



namespace Basic
{
    public partial class FormDataTables : Form
    {
        private static string idProject, tokenID, timeSelect, phaseSelect;
        private static readonly string clientId = Guid.NewGuid().ToString();
        private static readonly string mqttURI = "hairdresser.cloudmqtt.com";
        private static readonly string mqttUser = "qiiwyeiv";
        private static readonly string mqttPassword = "X4hvcjgbyUit";
        private static readonly int mqttPort = 15572;
        private static MqttClient client;

        public FormDataTables(string tokenAuth)
        {
            InitializeComponent();
            tokenID = tokenAuth;
            idProject = Shared.JWT.JsonToken(tokenID, "project_id");
        }

        #region Mode Time
        private void btnRealTime_Click(object sender, EventArgs e)
        {
            btnRealTime.FlatAppearance.BorderSize = 1;
            btnHours.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnHours.FlatAppearance.BorderSize = 0;
            btnDays.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnDays.FlatAppearance.BorderSize = 0;
            btnWeeks.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnWeeks.FlatAppearance.BorderSize = 0;
            timeSelect = "REAL_TIME";
            #region Connect MQTT
            try
            {
                if (!String.IsNullOrEmpty(idProject))
                {
                    client = new MqttClient(mqttURI, mqttPort, false, MqttSslProtocols.None, null, null)
                    {
                        ProtocolVersion = MqttProtocolVersion.Version_3_1
                    };
                    client.Connect(clientId, mqttUser, mqttPassword, true, 60);
                    //Subcribe Topic
                    client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
                    client.Subscribe(new string[] { idProject }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                }


            }
            catch (Exception)
            {
                Application.Exit();
            }

            #endregion

        }


        private async void btnHours_Click(object sender, EventArgs e)
        {

            btnHours.FlatAppearance.BorderSize = 1;
            btnRealTime.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnRealTime.FlatAppearance.BorderSize = 0;
            btnDays.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnDays.FlatAppearance.BorderSize = 0;
            btnWeeks.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnWeeks.FlatAppearance.BorderSize = 0;
            timeSelect = "HOURS";
            dataTableSummary.Rows.Clear();
            dataTablePhase1.Rows.Clear();
            dataTablePhase2.Rows.Clear();
            dataTablePhase3.Rows.Clear();
            var reqString = await Shared.RestAPI.Post("api/cabin/dataTimeHours", tokenID, idProject);
            JObject reqJson = JObject.Parse(reqString);
            //SUMMARY
            var dataSummary = reqJson["dataSummary"];
            var arrSummary = dataSummary.ToArray();

            //PHASE ONE
            var dataPhaseOne = reqJson["dataPhaseOne"];
            var arrPhaseOne = dataPhaseOne.ToArray();

            //PHASE TWO
            var dataPhaseTwo = reqJson["dataPhaseTwo"];
            var arrPhaseTwo = dataPhaseTwo.ToArray();

            //PHASE THREE
            var dataPhaseThree = reqJson["dataPhaseThree"];
            var arrPhaseThree = dataPhaseThree.ToArray();


            switch (phaseSelect)
            {
                case "SUMMARY":
                    for (int i = 0; i < arrSummary.Length; i++)
                    {
                        JObject jsonSummary = JObject.Parse(arrSummary[i].ToString());
                        addGridSummary((string)jsonSummary["VLN"], (string)jsonSummary["VLL"], (string)jsonSummary["I"], (string)jsonSummary["KW"], (string)jsonSummary["KVA"], (string)jsonSummary["KVAR"], (string)jsonSummary["PF"], (string)jsonSummary["F"], (string)jsonSummary["KW"], (string)jsonSummary["timeCreate"]);
                    }
                    break;
                case "PHASE_ONE":
                    for (int i = 0; i < arrPhaseOne.Length; i++)
                    {
                        JObject jsonPhaseOne = JObject.Parse(arrPhaseOne[i].ToString());
                        addGridPhaseOne((string)jsonPhaseOne["V1N"], (string)jsonPhaseOne["V12"], (string)jsonPhaseOne["I1"], (string)jsonPhaseOne["KW1"], (string)jsonPhaseOne["KVA1"], (string)jsonPhaseOne["KVAR1"], (string)jsonPhaseOne["PF1"], (string)jsonPhaseOne["timeCreate"]);
                    }
                    break;
                case "PHASE_TWO":
                    for (int i = 0; i < arrPhaseTwo.Length; i++)
                    {
                        JObject jsonPhaseTwo = JObject.Parse(arrPhaseTwo[i].ToString());
                        addGridPhaseTwo((string)jsonPhaseTwo["V2N"], (string)jsonPhaseTwo["V23"], (string)jsonPhaseTwo["I2"], (string)jsonPhaseTwo["KW2"], (string)jsonPhaseTwo["KVA2"], (string)jsonPhaseTwo["KVAR2"], (string)jsonPhaseTwo["PF2"], (string)jsonPhaseTwo["timeCreate"]);
                    }
                    break;
                case "PHASE_THREE":
                    for (int i = 0; i < arrPhaseThree.Length; i++)
                    {
                        JObject jsonPhaseThree = JObject.Parse(arrPhaseThree[i].ToString());
                        addGridPhaseThree((string)jsonPhaseThree["V3N"], (string)jsonPhaseThree["V31"], (string)jsonPhaseThree["I3"], (string)jsonPhaseThree["KW3"], (string)jsonPhaseThree["KVA3"], (string)jsonPhaseThree["KVAR3"], (string)jsonPhaseThree["PF3"], (string)jsonPhaseThree["timeCreate"]);
                    }
                    break;



            }


        }







        private async void btnWeeks_Click(object sender, EventArgs e)
        {

            btnWeeks.FlatAppearance.BorderSize = 1;
            btnRealTime.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnRealTime.FlatAppearance.BorderSize = 0;
            btnDays.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnDays.FlatAppearance.BorderSize = 0;
            btnHours.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnHours.FlatAppearance.BorderSize = 0;
            timeSelect = "WEEKS";
            dataTableSummary.Rows.Clear();
            dataTablePhase1.Rows.Clear();
            dataTablePhase2.Rows.Clear();
            dataTablePhase3.Rows.Clear();
            var reqString = await Shared.RestAPI.Post("api/cabin/dataTimeWeeks", tokenID, idProject);
            JObject reqJson = JObject.Parse(reqString);
            //SUMMARY
            var dataSummary = reqJson["dataSummary"];
            var arrSummary = dataSummary.ToArray();

            //PHASE ONE
            var dataPhaseOne = reqJson["dataPhaseOne"];
            var arrPhaseOne = dataPhaseOne.ToArray();

            //PHASE TWO
            var dataPhaseTwo = reqJson["dataPhaseTwo"];
            var arrPhaseTwo = dataPhaseTwo.ToArray();

            //PHASE THREE
            var dataPhaseThree = reqJson["dataPhaseThree"];
            var arrPhaseThree = dataPhaseThree.ToArray();


            switch (phaseSelect)
            {
                case "SUMMARY":
                    for (int i = 0; i < arrSummary.Length; i++)
                    {
                        JObject jsonSummary = JObject.Parse(arrSummary[i].ToString());
                        addGridSummary((string)jsonSummary["VLN"], (string)jsonSummary["VLL"], (string)jsonSummary["I"], (string)jsonSummary["KW"], (string)jsonSummary["KVA"], (string)jsonSummary["KVAR"], (string)jsonSummary["PF"], (string)jsonSummary["F"], (string)jsonSummary["KW"], (string)jsonSummary["timeCreate"]);
                    }
                    break;
                case "PHASE_ONE":
                    for (int i = 0; i < arrPhaseOne.Length; i++)
                    {
                        JObject jsonPhaseOne = JObject.Parse(arrPhaseOne[i].ToString());
                        addGridPhaseOne((string)jsonPhaseOne["V1N"], (string)jsonPhaseOne["V12"], (string)jsonPhaseOne["I1"], (string)jsonPhaseOne["KW1"], (string)jsonPhaseOne["KVA1"], (string)jsonPhaseOne["KVAR1"], (string)jsonPhaseOne["PF1"], (string)jsonPhaseOne["timeCreate"]);
                    }
                    break;
                case "PHASE_TWO":
                    for (int i = 0; i < arrPhaseTwo.Length; i++)
                    {
                        JObject jsonPhaseTwo = JObject.Parse(arrPhaseTwo[i].ToString());
                        addGridPhaseTwo((string)jsonPhaseTwo["V2N"], (string)jsonPhaseTwo["V23"], (string)jsonPhaseTwo["I2"], (string)jsonPhaseTwo["KW2"], (string)jsonPhaseTwo["KVA2"], (string)jsonPhaseTwo["KVAR2"], (string)jsonPhaseTwo["PF2"], (string)jsonPhaseTwo["timeCreate"]);
                    }
                    break;
                case "PHASE_THREE":
                    for (int i = 0; i < arrPhaseThree.Length; i++)
                    {
                        JObject jsonPhaseThree = JObject.Parse(arrPhaseThree[i].ToString());
                        addGridPhaseThree((string)jsonPhaseThree["V3N"], (string)jsonPhaseThree["V31"], (string)jsonPhaseThree["I3"], (string)jsonPhaseThree["KW3"], (string)jsonPhaseThree["KVA3"], (string)jsonPhaseThree["KVAR3"], (string)jsonPhaseThree["PF3"], (string)jsonPhaseThree["timeCreate"]);
                    }
                    break;



            }

        }

        private async void btnDays_Click(object sender, EventArgs e)
        {
            btnDays.FlatAppearance.BorderSize = 1;
            btnRealTime.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnRealTime.FlatAppearance.BorderSize = 0;
            btnHours.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnHours.FlatAppearance.BorderSize = 0;
            btnWeeks.ForeColor = System.Drawing.Color.FromArgb(0, 245, 212);
            btnWeeks.FlatAppearance.BorderSize = 0;
            timeSelect = "DAYS";
            dataTableSummary.Rows.Clear();
            dataTablePhase1.Rows.Clear();
            dataTablePhase2.Rows.Clear();
            dataTablePhase3.Rows.Clear();
            var reqString = await Shared.RestAPI.Post("api/cabin/dataTimeDays", tokenID, idProject);
            JObject reqJson = JObject.Parse(reqString);
            //SUMMARY
            var dataSummary = reqJson["dataSummary"];
            var arrSummary = dataSummary.ToArray();

            //PHASE ONE
            var dataPhaseOne = reqJson["dataPhaseOne"];
            var arrPhaseOne = dataPhaseOne.ToArray();

            //PHASE TWO
            var dataPhaseTwo = reqJson["dataPhaseTwo"];
            var arrPhaseTwo = dataPhaseTwo.ToArray();

            //PHASE THREE
            var dataPhaseThree = reqJson["dataPhaseThree"];
            var arrPhaseThree = dataPhaseThree.ToArray();


            switch (phaseSelect)
            {
                case "SUMMARY":
                    for (int i = 0; i < arrSummary.Length; i++)
                    {
                        JObject jsonSummary = JObject.Parse(arrSummary[i].ToString());
                        addGridSummary((string)jsonSummary["VLN"], (string)jsonSummary["VLL"], (string)jsonSummary["I"], (string)jsonSummary["KW"], (string)jsonSummary["KVA"], (string)jsonSummary["KVAR"], (string)jsonSummary["PF"], (string)jsonSummary["F"], (string)jsonSummary["KW"], (string)jsonSummary["timeCreate"]);
                    }
                    break;
                case "PHASE_ONE":
                    for (int i = 0; i < arrPhaseOne.Length; i++)
                    {
                        JObject jsonPhaseOne = JObject.Parse(arrPhaseOne[i].ToString());
                        addGridPhaseOne((string)jsonPhaseOne["V1N"], (string)jsonPhaseOne["V12"], (string)jsonPhaseOne["I1"], (string)jsonPhaseOne["KW1"], (string)jsonPhaseOne["KVA1"], (string)jsonPhaseOne["KVAR1"], (string)jsonPhaseOne["PF1"], (string)jsonPhaseOne["timeCreate"]);
                    }
                    break;
                case "PHASE_TWO":
                    for (int i = 0; i < arrPhaseTwo.Length; i++)
                    {
                        JObject jsonPhaseTwo = JObject.Parse(arrPhaseTwo[i].ToString());
                        addGridPhaseTwo((string)jsonPhaseTwo["V2N"], (string)jsonPhaseTwo["V23"], (string)jsonPhaseTwo["I2"], (string)jsonPhaseTwo["KW2"], (string)jsonPhaseTwo["KVA2"], (string)jsonPhaseTwo["KVAR2"], (string)jsonPhaseTwo["PF2"], (string)jsonPhaseTwo["timeCreate"]);
                    }
                    break;
                case "PHASE_THREE":
                    for (int i = 0; i < arrPhaseThree.Length; i++)
                    {
                        JObject jsonPhaseThree = JObject.Parse(arrPhaseThree[i].ToString());
                        addGridPhaseThree((string)jsonPhaseThree["V3N"], (string)jsonPhaseThree["V31"], (string)jsonPhaseThree["I3"], (string)jsonPhaseThree["KW3"], (string)jsonPhaseThree["KVA3"], (string)jsonPhaseThree["KVAR3"], (string)jsonPhaseThree["PF3"], (string)jsonPhaseThree["timeCreate"]);
                    }
                    break;



            }


        }
        #endregion

        #region Sub MQTT

        Action<string, string> ReceiveAction;
        private void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            ReceiveAction = Receive;
            try
            {
                this.BeginInvoke(ReceiveAction, Encoding.UTF8.GetString(e.Message), e.Topic);
            }
            catch { };
        }
        void Receive(string reqMessage, string topic)
        {

            if (timeSelect == "REAL_TIME")
            {
                //SUMMARY
                string VLN = Shared.funcService.GetValueString(reqMessage, "VLN");
                string VLL = Shared.funcService.GetValueString(reqMessage, "VLL");
                string KW = Shared.funcService.GetValueString(reqMessage, "KW");
                string KVA = Shared.funcService.GetValueString(reqMessage, "KVA");
                string I = Shared.funcService.GetValueString(reqMessage, "I");
                string KVAR = Shared.funcService.GetValueString(reqMessage, "KVAR");
                string PF = Shared.funcService.GetValueString(reqMessage, "PF");
                string KWH = Shared.funcService.GetValueString(reqMessage, "KWH");
                string F = Shared.funcService.GetValueString(reqMessage, "FREQUENCY");
                //PHASE ONE
                string V1N = Shared.funcService.GetValueString(reqMessage, "V1N");
                string KW1 = Shared.funcService.GetValueString(reqMessage, "KW1");
                string I1 = Shared.funcService.GetValueString(reqMessage, "I1");
                string V12 = Shared.funcService.GetValueString(reqMessage, "V12");
                string KVA1 = Shared.funcService.GetValueString(reqMessage, "KVA1");
                string KVAR1 = Shared.funcService.GetValueString(reqMessage, "KVAR1");
                string PF1 = Shared.funcService.GetValueString(reqMessage, "PF1");
                //PHASETWO
                string V2N = Shared.funcService.GetValueString(reqMessage, "V2N");
                string KW2 = Shared.funcService.GetValueString(reqMessage, "KW2");
                string I2 = Shared.funcService.GetValueString(reqMessage, "I2");
                string V23 = Shared.funcService.GetValueString(reqMessage, "V23");
                string KVA2 = Shared.funcService.GetValueString(reqMessage, "KVA2");
                string KVAR2 = Shared.funcService.GetValueString(reqMessage, "KVAR2");
                string PF2 = Shared.funcService.GetValueString(reqMessage, "PF2");
                //PHASETHREE
                string V3N = Shared.funcService.GetValueString(reqMessage, "V3N");
                string KW3 = Shared.funcService.GetValueString(reqMessage, "KW3");
                string I3 = Shared.funcService.GetValueString(reqMessage, "I3");
                string V31 = Shared.funcService.GetValueString(reqMessage, "V23");
                string KVA3 = Shared.funcService.GetValueString(reqMessage, "KVA3");
                string KVAR3 = Shared.funcService.GetValueString(reqMessage, "KVAR3");
                string PF3 = Shared.funcService.GetValueString(reqMessage, "PF3");
                switch (phaseSelect)
                {
                    case "SUMMARY":
                        addGridSummary(VLN, VLL, I, KW, KVA, KVAR, PF, F, KWH, DateTime.Now.ToString("MM/dd/yyyy h:mm:ss tt"));
                        break;
                    case "PHASE_ONE":
                        addGridPhaseOne(V1N, V12, I1, KW1, KVA1, KVAR1, PF1, DateTime.Now.ToString("MM/dd/yyyy h:mm:ss tt"));
                        break;
                    case "PHASE_TWO":
                        addGridPhaseTwo(V2N, V23, I2, KW2, KVA2, KVAR2, PF2, DateTime.Now.ToString("MM/dd/yyyy h:mm:ss tt"));
                        break;
                    case "PHASE_THREE":
                        addGridPhaseThree(V3N, V31, I3, KW3, KVA3, KVAR3, PF3, DateTime.Now.ToString("MM/dd/yyyy h:mm:ss tt"));
                        break;

                }
            }
        }

        #endregion



        #region Mode Phase

        private void btnPhaseOne_Click(object sender, EventArgs e)
        {

            btnSummary.Enabled = true;
            btnPhaseOne.Enabled = false;
            btnPhaseTwo.Enabled = true;
            btnPhaseThree.Enabled = true;
            tabSummary.Visible = false;
            tabPhase1.Visible = true;
            tabPhase2.Visible = false;
            tabPhase3.Visible = false;
            dataTableSummary.Visible = false;
            dataTablePhase1.Visible = true;
            dataTablePhase2.Visible = false;
            dataTablePhase3.Visible = false;
            phaseSelect = "PHASE_ONE";
            btnRealTime.PerformClick();

        }

        private void btnPhaseTwo_Click(object sender, EventArgs e)
        {
            btnSummary.Enabled = true;
            btnPhaseOne.Enabled = true;
            btnPhaseTwo.Enabled = false;
            btnPhaseThree.Enabled = true;
            tabSummary.Visible = false;
            tabPhase1.Visible = false;
            tabPhase2.Visible = true;
            tabPhase3.Visible = false;
            dataTableSummary.Visible = false;
            dataTablePhase1.Visible = false;
            dataTablePhase2.Visible = true;
            dataTablePhase3.Visible = false;
            phaseSelect = "PHASE_TWO";
            btnRealTime.PerformClick();
        }

        private void btnPhaseThree_Click(object sender, EventArgs e)
        {
            btnSummary.Enabled = true;
            btnPhaseOne.Enabled = true;
            btnPhaseTwo.Enabled = true;
            btnPhaseThree.Enabled = false;
            tabSummary.Visible = false;
            tabPhase1.Visible = false;
            tabPhase2.Visible = false;
            tabPhase3.Visible = true;
            dataTableSummary.Visible = false;
            dataTablePhase1.Visible = false;
            dataTablePhase2.Visible = false;
            dataTablePhase3.Visible = true;
            phaseSelect = "PHASE_THREE";
            btnRealTime.PerformClick();
        }

        private void btnSummary_Click(object sender, EventArgs e)
        {
            btnSummary.Enabled = false;
            btnPhaseOne.Enabled = true;
            btnPhaseTwo.Enabled = true;
            btnPhaseThree.Enabled = true;
            tabSummary.Visible = true;
            tabPhase1.Visible = false;
            tabPhase2.Visible = false;
            tabPhase3.Visible = false;
            dataTableSummary.Visible = true;
            dataTablePhase1.Visible = false;
            dataTablePhase2.Visible = false;
            dataTablePhase3.Visible = false;
            phaseSelect = "SUMMARY";
            btnRealTime.PerformClick();
        }

        private void FormDataTables_Load(object sender, EventArgs e)
        {

            //Init btn Summary
            btnSummary.Enabled = false;
            btnPhaseOne.Enabled = true;
            btnPhaseTwo.Enabled = true;
            btnPhaseThree.Enabled = true;
            tabSummary.Visible = true;
            tabPhase1.Visible = false;
            tabPhase2.Visible = false;
            tabPhase3.Visible = false;
            dataTableSummary.Visible = true;
            dataTablePhase1.Visible = false;
            dataTablePhase2.Visible = false;
            dataTablePhase3.Visible = false;
            phaseSelect = "SUMMARY";
            btnRealTime.PerformClick();


        }

        #endregion

        #region Add Data Girl View
        private void addGridSummary(string VLN, string VLL, string I, string KW, string KVA, string KVAR, string PF, string F, string KWH, string dateTime)
        {
            try
            {
                DataGridViewRow newRow = new DataGridViewRow();
                newRow.CreateCells(dataTableSummary);
                newRow.Cells[0].Value = VLN;
                newRow.Cells[1].Value = VLL;
                newRow.Cells[2].Value = I;
                newRow.Cells[3].Value = KW;
                newRow.Cells[4].Value = KVA;
                newRow.Cells[5].Value = KVAR;
                newRow.Cells[6].Value = PF;
                newRow.Cells[7].Value = F;
                newRow.Cells[8].Value = KWH;
                newRow.Cells[9].Value = dateTime;
                dataTableSummary.Rows.Add(newRow);
            }
            catch { }
        }

        private void addGridPhaseOne(string V1N, string V12, string I1, string KW1, string KVA1, string KVAR1, string PF1, string dateTime)
        {
            try
            {
                DataGridViewRow newRow = new DataGridViewRow();
                newRow.CreateCells(dataTablePhase1);
                newRow.Cells[0].Value = V1N;
                newRow.Cells[1].Value = V12;
                newRow.Cells[2].Value = I1;
                newRow.Cells[3].Value = KW1;
                newRow.Cells[4].Value = KVA1;
                newRow.Cells[5].Value = KVAR1;
                newRow.Cells[6].Value = PF1;
                newRow.Cells[7].Value = dateTime;
                dataTablePhase1.Rows.Add(newRow);

            }
            catch { }
        }

        private void addGridPhaseTwo(string V2N, string V23, string I2, string KW2, string KVA2, string KVAR2, string PF2, string dateTime)
        {
            try
            {
                DataGridViewRow newRow = new DataGridViewRow();
                newRow.CreateCells(dataTablePhase2);
                newRow.Cells[0].Value = V2N;
                newRow.Cells[1].Value = V23;
                newRow.Cells[2].Value = I2;
                newRow.Cells[3].Value = KW2;
                newRow.Cells[4].Value = KVA2;
                newRow.Cells[5].Value = KVAR2;
                newRow.Cells[6].Value = PF2;
                newRow.Cells[7].Value = dateTime;
                dataTablePhase2.Rows.Add(newRow);
            }
            catch { }
        }

        private void addGridPhaseThree(string V3N, string V31, string I3, string KW3, string KVA3, string KVAR3, string PF3, string dateTime)
        {
            try
            {
                DataGridViewRow newRow = new DataGridViewRow();
                newRow.CreateCells(dataTablePhase3);
                newRow.Cells[0].Value = V3N;
                newRow.Cells[1].Value = V31;
                newRow.Cells[2].Value = I3;
                newRow.Cells[3].Value = KW3;
                newRow.Cells[4].Value = KVA3;
                newRow.Cells[5].Value = KVAR3;
                newRow.Cells[6].Value = PF3;
                newRow.Cells[7].Value = dateTime;
                dataTablePhase3.Rows.Add(newRow);
            }
            catch { }
        }

        #endregion
    }
}
