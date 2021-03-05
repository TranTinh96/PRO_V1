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

namespace Simulator
{
    public partial class Simulator : Form
    {
       
        public Simulator()
        {
            InitializeComponent();
        }
        private readonly Random _random = new Random();
        private string topicPublish;
        private static string idProject, mqttURI, mqttUser, mqttPassword;
        private string RLAmode, RLBmode , RLAstatus, RLBstatus ,RLAonTime , RLAoffTime , RLBonTime ,RLBoffTime , RLAcontrol , RLBcontrol ;
        private static string clientId = Guid.NewGuid().ToString();
        private static int mqttPort = 15572;
        private static MqttClient client;

        private void Simulator_Load(object sender, EventArgs e)
        {

            RLAmode = "manual";
            RLBmode = "manual";
            RLAstatus = "off";
            RLBstatus = "off";
            RLAonTime = "00:00";
            RLAoffTime = "00:00";
            RLBonTime = "00:00";
            RLBoffTime = "00:00";
            RLAcontrol = "manual";
            RLBcontrol = "manual";

        }

        private void btnConnectMQTT_Click(object sender, EventArgs e)
        {
            if ((txtServer.Text != String.Empty) && (txtUser.Text != String.Empty) && (txtPassword.Text != String.Empty) && (txtProjectID.Text != String.Empty))
            {
                mqttURI = txtServer.Text.Trim();
                mqttUser = txtUser.Text.Trim();
                mqttPassword = txtPassword.Text.Trim();
                idProject = txtProjectID.Text.Trim();
                topicPublish = idProject + "/hwX6aOr7";
                client = new MqttClient(mqttURI, mqttPort, false, MqttSslProtocols.None, null, null)
                {
                    ProtocolVersion = MqttProtocolVersion.Version_3_1
                };
                client.Connect(clientId, mqttUser, mqttPassword, true, 60);
                //Subcribe Topic
                client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
                client.Subscribe(new string[] { topicPublish}, new byte[] { MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE });
                txtServer.Enabled = false;
                txtUser.Enabled = false;
                txtPassword.Enabled = false;
                txtProjectID.Enabled = false;
                
                btnConnectMQTT.Text = "CONNECT";
            }


            timerPublishMQTT.Enabled = true;
            timerChangeValue.Enabled = true;
        }

        private void timerPublishMQTT_Tick(object sender, EventArgs e)
        {

            string payloadRelayA = "RLAmode="+ RLAmode+"&RLAstatus="+ RLAstatus +"&RLAonTime="+ RLAonTime +"&RLAoffTime="+ RLAoffTime;
            string payloadRelayB = "&RLBmode=" + RLBmode + "&RLBstatus="+ RLBstatus + "&RLBonTime=" + RLBonTime + "&RLBoffTime=" + RLBoffTime;
            string payloadSummary = "&VLN=" + VLN.Text + "&VLL=" + VLL.Text + "&I=" + I.Text + "&KW=" + KW.Text
                                  + "&KVA=" + KVA.Text + "&KVAR=" + KVAR.Text + "&PF=" + PF.Text + "&FREQUENCY=" + F.Text + "&KWH=" + KWH.Text;
            string payloadPhaseOne = "&V1N=" + V1N.Text + "&V12=" + V12.Text + "&I1=" + I1.Text + "&KW1=" + KW1.Text
                                    + "&KVA1=" + KVA1.Text + "&KVAR1=" + KVAR1.Text + "&PF1=" + PF1.Text;
            string payloadPhaseTwo = "&V2N=" + V2N.Text + "&V23=" + V23.Text + "&I2=" + I2.Text + "&KW2=" + KW2.Text
                                    + "&KVA2=" + KVA2.Text + "&KVAR2=" + KVAR2.Text + "&PF2=" + PF2.Text;
            string payloadPhaseThree = "&V3N=" + V3N.Text + "&V31=" + V31.Text + "&I3=" + I3.Text + "&KW3=" + KW3.Text
                                    + "&KVA3=" + KVA3.Text + "&KVAR3=" + KVAR3.Text + "&PF3=" + PF3.Text;

            string payload = payloadRelayA+ payloadRelayB +  payloadSummary + payloadPhaseOne + payloadPhaseTwo + payloadPhaseThree;

            client.Publish(idProject, Encoding.UTF8.GetBytes(payload), MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, true);
         
        }

        private void timerChangeValue_Tick(object sender, EventArgs e)
        {   
            //VLN
            VLN.Text = RandomNumber(200, 230).ToString();
            V1N.Text = RandomNumber(200, 230).ToString();
            V2N.Text = RandomNumber(200, 230).ToString();
            V3N.Text = RandomNumber(200, 230).ToString();
            //VLL
            VLL.Text = RandomNumber(200, 230).ToString();
            V12.Text = RandomNumber(200, 230).ToString();
            V23.Text = RandomNumber(200, 230).ToString();
            V31.Text = RandomNumber(200, 230).ToString();

            //I
            I.Text = RandomNumber(0, 0).ToString();
            I1.Text = RandomNumber(0, 0).ToString();
            I2.Text = RandomNumber(0, 0).ToString();
            I3.Text = RandomNumber(0, 0).ToString();

            //KW
            KW.Text = RandomNumber(0, 0).ToString();
            KW1.Text = RandomNumber(0, 0).ToString();
            KW2.Text = RandomNumber(0, 0).ToString();
            KW3.Text = RandomNumber(0, 0).ToString();

            //KVA
            KVA.Text = RandomNumber(0, 0).ToString();
            KVA1.Text = RandomNumber(0, 0).ToString();
            KVA2.Text = RandomNumber(0, 0).ToString();
            KVA3.Text = RandomNumber(0, 0).ToString();

            //KVAR
            KVAR.Text = RandomNumber(0, 0).ToString();
            KVAR1.Text = RandomNumber(0, 0).ToString();
            KVAR2.Text = RandomNumber(0, 0).ToString();
            KVAR3.Text = RandomNumber(0, 0).ToString();


            //PF
            PF.Text = RandomNumber(1, 1).ToString();
            PF1.Text = RandomNumber(1, 1).ToString();
            PF2.Text = RandomNumber(1, 1).ToString();
            PF3.Text = RandomNumber(1, 1).ToString();


            //HZ , KWH
            KWH.Text = RandomNumber(0, 0).ToString();
            F.Text = RandomNumber(48, 51).ToString();

            //CONTROL
            if (RLAmode == "auto")
            {

                DateTime onTimeRLA = DateTime.Parse(RLAonTime);
                DateTime offTimeRLA = DateTime.Parse(RLAoffTime);
                DateTime myTime = DateTime.Now;
               
                //RLA
                if ((DateTime.Compare(onTimeRLA, myTime) <= 0)&&(DateTime.Compare(myTime, offTimeRLA) <= 0))
                {
                    statusOnRelayA.Visible = true;
                    statusOffRelayA.Visible = false;
                    RLAstatus = "on";

                }
                else
                {
                    statusOnRelayA.Visible = false;
                    statusOffRelayA.Visible = true;
                    RLAstatus = "off";
                }
                RLAmode = "auto";



            }
            if (RLBmode == "auto")
            {

                DateTime onTimeRLB = DateTime.Parse(RLBonTime);
                DateTime offTimeRLB = DateTime.Parse(RLBoffTime);
                DateTime myTimeB = DateTime.Now;

                //RLB
                if ((DateTime.Compare(onTimeRLB, myTimeB) <= 0) && (DateTime.Compare(myTimeB, offTimeRLB) <= 0))
                {
                    statusOnRelayB.Visible = true;
                    statusOffRelayB.Visible = false;
                    RLBstatus = "on";

                }
                else
                {
                    statusOnRelayB.Visible = false;
                    statusOffRelayB.Visible = true;
                    RLBstatus = "off";
                }
                RLBmode = "auto";



            }



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

            if(topic == topicPublish)
            {
                RLAmode = GetValueString(reqMessage, "RLAmode");
                RLAcontrol = GetValueString(reqMessage, "RLAstatus");
                RLBmode = GetValueString(reqMessage, "RLBmode");
                RLBcontrol = GetValueString(reqMessage, "RLBstatus");
                RLAonTime = GetValueString(reqMessage, "RLAonTime");
                RLAoffTime = GetValueString(reqMessage, "RLAoffTime");
                RLBonTime = GetValueString(reqMessage, "RLBonTime");
                RLBoffTime = GetValueString(reqMessage, "RLBoffTime");

              
                //DateTime myDate = new DateTime();

                //Manual
                if (RLAmode == "manual")
                {
                    if(RLAcontrol =="on")
                    {
                        statusOnRelayA.Visible = true;
                        statusOffRelayA.Visible = false;
                        RLAstatus = "on";
                    }
                    else
                    {
                        statusOnRelayA.Visible = false;
                        statusOffRelayA.Visible = true;
                        RLAstatus = "off";
                    }
                    RLAmode = "manual";

                }
                else if(RLAmode =="0")
                {
                    RLAmode = "manual";
                }
                else
                {
                    RLAmode = "auto";
                }
               
                //RLB
                if (RLBmode == "manual")
                {
                    if (RLBcontrol == "on")
                    {
                        statusOnRelayB.Visible = true;
                        statusOffRelayB.Visible = false;
                        RLBstatus = "on";
                    }
                    else
                    {
                        statusOnRelayB.Visible = false;
                        statusOffRelayB.Visible = true;
                        RLBstatus = "off";
                    }

                }
                else if (RLBmode == "0")
                {
                    RLBmode = "manual";
                }
              


                //Time

                if(RLAonTime =="0")
                {
                    RLAonTime = "00:00";
                }

                if (RLBonTime == "0")
                {
                    RLBonTime = "00:00";
                }

                if (RLAoffTime == "0")
                {
                    RLAoffTime = "00:00";
                }

                if (RLBoffTime == "0")
                {
                    RLBoffTime = "00:00";
                }
            }    

        }

        #endregion

        public int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }
        public static string GetValueString(string dataString, string charFind)
        {
            int lenCharFind = charFind.Length;
            int indexCharFind = dataString.IndexOf(charFind);
            if (indexCharFind != -1)
            {
                string strCharFind = dataString.Substring(indexCharFind);
                int indexDauVa = strCharFind.IndexOf('&');
                string strCharToFind = strCharFind[lenCharFind].ToString();
                string strFind = "=";
                if (indexDauVa != -1)
                {
                    string strOut = strCharFind.Substring(lenCharFind + 1, indexDauVa - lenCharFind - 1);

                    if (strCharToFind.Equals(strFind))
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

