﻿using LiveCharts;
using LiveCharts.Defaults;
using LiveCharts.Wpf;
using Newtonsoft.Json.Linq;
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



namespace Basic
{
    public partial class FormDashboard : Form
    {

        private static string idProject, tokenID ,roleAuth;
        private static readonly string clientId = Guid.NewGuid().ToString();
        private static readonly string mqttURI = "hairdresser.cloudmqtt.com";
        private static readonly string mqttUser = "qiiwyeiv";
        private static readonly string mqttPassword = "X4hvcjgbyUit";
        private static readonly int mqttPort = 15572;
        private static MqttClient client;
        private static bool statusRelayA, statusRelayB ,modeRelayA ,modeRelayB;
        private static string topicPublish;

        public FormDashboard(string tokenAuth)
        {
            InitializeComponent();
            tokenID = tokenAuth;
            idProject = Shared.JWT.JsonToken(tokenID, "project_id");
            roleAuth = Shared.JWT.JsonToken(tokenID, "role");
            topicPublish = idProject + "/hwX6aOr7";
           

        }

      
        private async void FormDashboard_Load(object sender, EventArgs e)
        {
            #region ChangeControl
            btnAutoRelayA.PerformClick();
            btnAutoRelayB.PerformClick();
            panelManualRelayA.Visible = false;
            panelManualRelayB.Visible = false;
            if(roleAuth =="ROLE_SEE")
            {
                panel13.Enabled = false;
            }
            else
            {
                panel13.Enabled =true;
            }
            #endregion

            #region Connect MQTT

            try
            {
                if(! String.IsNullOrEmpty(idProject))
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

            #region Post Data Init
             if(!string.IsNullOrEmpty(idProject))
            {
                var reqString = await Shared.RestAPI.Post("api/cabin/get/init", tokenID, idProject);
                JObject reqJson = JObject.Parse(reqString);
                //SUMMARY
                VLN.Text = (string)reqJson["dataSummary"]["VLN"];
                KW.Text = (string)reqJson["dataSummary"]["KW"];
                KVA.Text = (string)reqJson["dataSummary"]["KVA"];
                KVAR.Text = (string)reqJson["dataSummary"]["KVAR"];
                PF.Text = (string)reqJson["dataSummary"]["PF"];
                valueEnegry.Text = (string)reqJson["dataSummary"]["KWH"];
                valueHz.Text = (string)reqJson["dataSummary"]["F"];
                //PHASE ONE
                V1N.Text = (string)reqJson["dataPhaseOne"]["V1N"];
                KW1.Text = (string)reqJson["dataPhaseOne"]["KW1"];
                KVA1.Text = (string)reqJson["dataPhaseOne"]["KVA1"];
                KVAR1.Text = (string)reqJson["dataPhaseOne"]["KVAR1"];
                PF1.Text = (string)reqJson["dataPhaseOne"]["PF1"];
                //PHASETWO
                V2N.Text = (string)reqJson["dataPhaseTwo"]["V2N"];
                KW2.Text = (string)reqJson["dataPhaseTwo"]["KW2"];
                KVA2.Text = (string)reqJson["dataPhaseTwo"]["KVA2"];
                KVAR2.Text = (string)reqJson["dataPhaseTwo"]["KVAR2"];
                PF2.Text = (string)reqJson["dataPhaseTwo"]["PF2"];
                //PHASETHREE
                V3N.Text = (string)reqJson["dataPhaseThree"]["V3N"];
                KW3.Text = (string)reqJson["dataPhaseThree"]["KW3"];
                KVA3.Text = (string)reqJson["dataPhaseThree"]["KVA3"];
                KVAR3.Text = (string)reqJson["dataPhaseThree"]["KVAR3"];
                PF3.Text = (string)reqJson["dataPhaseThree"]["PF3"];

                #endregion

                #region Control Relay Init
                var reqStringRelay = await Shared.RestAPI.Post("api/cabin/relay/info", tokenID, idProject);
                JObject reqJsonRelay = JObject.Parse(reqStringRelay);
                if (((bool)reqJsonRelay["success"]) && ((bool)reqJsonRelay["status"]))
                {
                    //RLA
                    var arrRelayA = reqJsonRelay["dataRelay"][0];
                    if (((string)arrRelayA["mode"]) == "manual")
                    {
                        btnAutoRelayA.Enabled = false;
                        btnManualRelayA.Enabled = true;
                        btnManualRelayA.PerformClick();
                        modeRelayA = false;
                    }
                    else
                    {
                        btnAutoRelayA.Enabled = true;
                        btnManualRelayA.Enabled = false;
                        btnAutoRelayA.PerformClick();
                        modeRelayA = true;
                    }
                    timeOnRelayA.Text = (string)arrRelayA["timeOn"];
                    timeOffRelayA.Text = (string)arrRelayA["timeOff"];
                    if (((string)arrRelayA["status"]) == "on")
                    {
                        statusRelayA = true;
                        statusOnRelayA.Visible = true;
                        statusOffRelayA.Visible = false;
                        btnManualOnRelayA.Enabled = false;
                        btnManualOffRelayA.Enabled = true;

                    }
                    else
                    {
                        statusOnRelayA.Visible = false;
                        statusOffRelayA.Visible = true;
                        btnManualOnRelayA.Enabled = true;
                        btnManualOffRelayA.Enabled = false;
                        statusRelayA = false;
                    }
                    //RLB
                    var arrRelayB = reqJsonRelay["dataRelay"][1];
                    if (((string)arrRelayB["mode"]) == "manual")
                    {
                        modeRelayB = false;
                        btnAutoRelayB.Enabled = false;
                        btnManualRelayB.Enabled = true;
                        btnManualRelayB.PerformClick();
                    }
                    else
                    {
                        modeRelayB = true;
                        btnAutoRelayB.Enabled = true;
                        btnManualRelayB.Enabled = false;
                        btnAutoRelayB.PerformClick();
                    }
                    timeOnRelayB.Text = (string)arrRelayB["timeOn"];
                    timeOffRelayB.Text = (string)arrRelayB["timeOff"];
                    if (((string)arrRelayB["status"]) == "on")
                    {
                        statusRelayB = true;
                        statusOnRelayB.Visible = true;
                        statusOffRelayB.Visible = false;
                        btnManualOnRelayB.Enabled = false;
                        btnManualOffRelayB.Enabled = true;

                    }
                    else
                    {
                        statusRelayB = false;
                        statusOnRelayB.Visible = false;
                        statusOffRelayB.Visible = true;
                        btnManualOnRelayB.Enabled = true;
                        btnManualOffRelayB.Enabled = false;
                    }

                }
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

            if (topic == idProject)
            {
   
                //SUMMARY
                VLN.Text = Shared.funcService.GetValueString(reqMessage, "VLN");
                KW.Text = Shared.funcService.GetValueString(reqMessage, "KW");
                KVA.Text = Shared.funcService.GetValueString(reqMessage, "KVA");
                KVAR.Text = Shared.funcService.GetValueString(reqMessage, "KVAR");
                PF.Text = Shared.funcService.GetValueString(reqMessage, "PF");
                valueEnegry.Text = Shared.funcService.GetValueString(reqMessage, "KWH");
                valueHz.Text = Shared.funcService.GetValueString(reqMessage, "FREQUENCY");
                //PHASE ONE
                V1N.Text = Shared.funcService.GetValueString(reqMessage, "V1N");
                KW1.Text = Shared.funcService.GetValueString(reqMessage, "KW1");
                KVA1.Text = Shared.funcService.GetValueString(reqMessage, "KVA1");
                KVAR1.Text = Shared.funcService.GetValueString(reqMessage, "KVAR1");
                PF1.Text = Shared.funcService.GetValueString(reqMessage, "PF1");
                //PHASETWO
                V2N.Text = Shared.funcService.GetValueString(reqMessage, "V2N");
                KW2.Text = Shared.funcService.GetValueString(reqMessage, "KW2");
                KVA2.Text = Shared.funcService.GetValueString(reqMessage, "KVA2");
                KVAR2.Text = Shared.funcService.GetValueString(reqMessage, "KVAR2");
                PF2.Text = Shared.funcService.GetValueString(reqMessage, "PF2");
                //PHASETHREE
                V3N.Text = Shared.funcService.GetValueString(reqMessage, "V3N");
                KW3.Text = Shared.funcService.GetValueString(reqMessage, "KW3");
                KVA3.Text = Shared.funcService.GetValueString(reqMessage, "KVA3");
                KVAR3.Text = Shared.funcService.GetValueString(reqMessage, "KVAR3");
                PF3.Text = Shared.funcService.GetValueString(reqMessage, "PF3");
                //RLA
                statusRelayA = isStatusRelay((string)Shared.funcService.GetValueString(reqMessage, "RLAstatus"));
                statusRelayA = isStatusRelay((string)Shared.funcService.GetValueString(reqMessage, "RLBstatus"));
                modeRelayA = isModeRelay((string)Shared.funcService.GetValueString(reqMessage, "RLAmode"));
                modeRelayB = isModeRelay((string)Shared.funcService.GetValueString(reqMessage, "RLBmode"));
                #region RLA & RLB
                //Relay A
                controlRelayA();
                if (modeRelayA)
                {

                    btnAutoRelayA.Enabled = false;
                    btnAutoRelayA.BackColor = Color.FromArgb(113, 97, 239);
                    btnManualRelayA.BackColor = Color.FromArgb(226, 234, 252);
                    btnManualRelayA.Enabled = true;
                    panelManualRelayA.Visible = false;
                    panelAutoRelayA.Visible = true;

                }
                else
                {
                    btnManualRelayA.BackColor = Color.FromArgb(113, 97, 239);
                    btnAutoRelayA.BackColor = Color.FromArgb(226, 234, 252);
                    btnAutoRelayA.Enabled = true;
                    panelManualRelayA.Visible = true;
                    panelAutoRelayA.Visible = false;
                }
                //RelayB
                controlRelayB();
                if (modeRelayB)
                {

                    btnAutoRelayB.Enabled = false;
                    btnAutoRelayB.BackColor = Color.FromArgb(113, 97, 239);
                    btnManualRelayB.BackColor = Color.FromArgb(226, 234, 252);
                    btnManualRelayB.Enabled = true;
                    panelManualRelayB.Visible = false;
                    panelAutoRelayB.Visible = true;

                }
                else
                {
                    btnManualRelayB.BackColor = Color.FromArgb(113, 97, 239);
                    btnAutoRelayB.BackColor = Color.FromArgb(226, 234, 252);
                    btnAutoRelayB.Enabled = true;
                    panelManualRelayB.Visible = true;
                    panelAutoRelayB.Visible = false;
                }
                #endregion

            }
        }

        #endregion


        #region Control
        private void btnAutoRelayA_Click(object sender, EventArgs e)
        {
            btnAutoRelayA.Enabled = false;
            btnAutoRelayA.BackColor = Color.FromArgb(113, 97, 239);
            btnManualRelayA.BackColor = Color.FromArgb(226, 234, 252);
            btnManualRelayA.Enabled = true;
            panelManualRelayA.Visible = false;
            panelAutoRelayA.Visible = true;
            modeRelayA = true;


        }

        private void btnManualRelayA_Click(object sender, EventArgs e)
        {
            btnManualRelayA.BackColor = Color.FromArgb(113, 97, 239);
            btnAutoRelayA.BackColor = Color.FromArgb(226, 234, 252);
            btnAutoRelayA.Enabled = true;
            panelManualRelayA.Visible = true;
            panelAutoRelayA.Visible = false;
            modeRelayA = false;
        }

        private void btnAutoRelayB_Click(object sender, EventArgs e)
        {
            btnAutoRelayB.Enabled = false;
            btnAutoRelayB.BackColor = Color.FromArgb(113, 97, 239);
            btnManualRelayB.BackColor = Color.FromArgb(226, 234, 252);
            btnManualRelayB.Enabled = true;
            panelManualRelayB.Visible = false;
            panelAutoRelayB.Visible = true;
            modeRelayB = true;
        }

        private void btnManualRelayB_Click(object sender, EventArgs e)
        {
            btnManualRelayB.BackColor = Color.FromArgb(113, 97, 239);
            btnAutoRelayB.BackColor = Color.FromArgb(226, 234, 252);
            btnAutoRelayB.Enabled = true;
            panelManualRelayB.Visible = true;
            panelAutoRelayB.Visible = false;
            modeRelayB = false;
        }



        private void btnSetAutoRelayA_Click(object sender, EventArgs e)
        {
            string message = "&RLAmode=auto&RLAonTime=" + timeOnRelayA.Value.ToString("HH:mm") + "&RLAoffTime="+timeOffRelayA.Value.ToString("HH:mm") + "&";
            client.Publish(topicPublish, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, true);
            controlRelayA();
        }

        private void btnSetAutoRelayB_Click(object sender, EventArgs e)
        {
            
            string message = "&RLBmode=auto&RLBonTime=" + timeOnRelayB.Value.ToString("HH:mm") + "&RLBoffTime=" + timeOffRelayB.Value.ToString("HH:mm") + "&";
            client.Publish(topicPublish, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, true);
            controlRelayB();
        }



        private void btnManualOnRelayA_Click(object sender, EventArgs e)
        {
            btnManualOnRelayA.Enabled = false;
            btnManualOffRelayA.Enabled = true;
            string message = "&RLAmode=manual&RLAstatus=on&";
            statusRelayA = true;
            client.Publish(topicPublish, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, true);
            controlRelayA();
        }

        private void btnManualOffRelayA_Click(object sender, EventArgs e)
        {
            btnManualOnRelayA.Enabled = true;
            btnManualOffRelayA.Enabled = false;
            string message = "&RLAmode=manual&RLAstatus=off&";
            statusRelayA = false;
            client.Publish(topicPublish, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, true);
            controlRelayA();
        }

        private void btnManualOnRelayB_Click(object sender, EventArgs e)
        {
            btnManualOnRelayB.Enabled = false;
            btnManualOffRelayB.Enabled = true;
            string message = "&RLBmode=manual&RLBstatus=on&";
            statusRelayB = true;
            client.Publish(topicPublish, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, true);
            controlRelayB();
        }

     

        private void btnManualOffRelayB_Click(object sender, EventArgs e)
        {
            btnManualOnRelayB.Enabled = true;
            btnManualOffRelayB.Enabled = false;
            string message = "&RLBmode=manual&RLBstatus=off&";
            statusRelayB = false;
            client.Publish(topicPublish, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, true);
            controlRelayB();
        }
        #endregion Control

        #region Function User
         private bool isStatusRelay ( string status)
        {
            return status == "on" ? true : false;
        }

        private bool isModeRelay(string mode)
        {
            return mode == "auto" ? true : false;
        }

        private void controlRelayA ()
        {
            if(statusRelayA)
            {
                statusOnRelayA.Visible = true;
                statusOffRelayA.Visible = false;
            }
            else
            {
                statusOnRelayA.Visible = false;
                statusOffRelayA.Visible = true;
            }
        }

        private void controlRelayB()
        {
            if (statusRelayB)
            {
                statusOnRelayB.Visible = true;
                statusOffRelayB.Visible = false;
            }
            else
            {
                statusOnRelayB.Visible = false;
                statusOffRelayB.Visible = true;
            }
        }


        #endregion

    }
}
