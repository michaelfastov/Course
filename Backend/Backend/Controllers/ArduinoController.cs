using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLayer;
using Backend.Models;
using System.IO.Ports;
using System.Web;
using System.Text;
using System.ComponentModel;
using System.Windows;
using System.Net.Sockets;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Arduino")]
    public class ArduinoController : Controller
    {

        SerialPort ardo;

        public ArduinoController()
        {
            ardo = new SerialPort();
            ardo.PortName = "COM3";
            ardo.BaudRate = 9600;
        }

        [Route("On5sec")]
        [HttpGet]
        public void On5sec()
        {
            string red = "1";
            ardo.Open();
            ardo.Write(red);
            ardo.Close();

        }


        [Route("Blink")]
        [HttpGet]
        public void Blink()
        {
            string red = "2";
            ardo.Open();
            ardo.Write(red);
            ardo.Close();
        }

        [Route("Data")]
        [HttpGet]
        public string Data()
        {
            string red = "3";
            ardo.Open();
            ardo.Write(red);
            string a = ardo.ReadExisting();
            ardo.Close();
            return a;
        }
    }
}