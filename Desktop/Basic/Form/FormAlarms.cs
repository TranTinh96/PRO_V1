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
    public partial class FormAlarms : Form
    {
        private static string idProject, tokenID;
        private static readonly string clientId = Guid.NewGuid().ToString();
        private static readonly string mqttURI = "hairdresser.cloudmqtt.com";
        private static readonly string mqttUser = "qiiwyeiv";
        private static readonly string mqttPassword = "X4hvcjgbyUit";
        private static readonly int mqttPort = 15572;
        private static MqttClient client;
        public FormAlarms(string tokenAuth)
        {
            InitializeComponent();
            tokenID = tokenAuth;
            idProject = Shared.JWT.JsonToken(tokenID, "project_id");
        }

      
        private  void FormAlarms_Load(object sender, EventArgs e)
        {
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
                    readAlarm();
                }
               

            }
            catch (Exception)
            {
                Application.Exit();
            }
            #endregion

         


        }


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

             readAlarm();
        }

        #endregion

        #region Call API Alarm
        private async void readAlarm()
        {
            dataAlarm.Rows.Clear();
            var reqString = await Shared.RestAPI.Post("api/cabin/alarm/get-tag", tokenID, idProject);
            JObject reqJson = JObject.Parse(reqString);
            if((bool)reqJson["status"])
            {
                var DataAlarm = reqJson["dataAlarm"];
                var arrDataAlarm = DataAlarm.ToArray();
                for (int i = 0; i < arrDataAlarm.Length; i++)
                {
                    JObject jsonAlarm = JObject.Parse(arrDataAlarm[i].ToString());
                    addGridAlarm(i.ToString(), (string)jsonAlarm["name"], (string)jsonAlarm["HH"], (string)jsonAlarm["H"], (string)jsonAlarm["L"], (string)jsonAlarm["LL"], (string)jsonAlarm["Rate"], (string)jsonAlarm["valueTag"], printStaus((string)jsonAlarm["status"]));
                }
            }            


        }

        public string printStaus( string status)
        {
            switch(status)
            {
                case "HH":
                    return "HIGH HIGH";
                case "H":
                    return "HIGH";
                case "L":
                    return "LOW";
                case "LL":
                    return "LOW LOW";
                default:
                    return " ";

            }    


        }

        private void txtNavbarActive_Click(object sender, EventArgs e)
        {

        }

        #endregion

        #region Add Data Girl View
        private void addGridAlarm(string STT, string tagName, string HighHigh, string High, string Low, string LowLow, string deadBand, string tagValue, string status)
        {
            try
            {
                DataGridViewRow newRow = new DataGridViewRow();
                newRow.CreateCells(dataAlarm);
                newRow.Cells[0].Value = STT;
                newRow.Cells[1].Value = tagName;
                newRow.Cells[2].Value = HighHigh;
                newRow.Cells[3].Value = High;
                newRow.Cells[4].Value = Low;
                newRow.Cells[5].Value = LowLow;
                newRow.Cells[6].Value = deadBand;
                newRow.Cells[7].Value = tagValue;
                newRow.Cells[8].Value = status;
                dataAlarm.Rows.Add(newRow);
            }
            catch { }
        }
        #endregion

    }
}
