using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ViewModels
{
    public class InvoiceViewModel
    {
        public int ID { get; set; }
        public int CompanyID { get; set; }
        public int VendorID { get; set; }
        public string Date { get; set; }
        public bool isAccepted { get; set; }
        public bool isDelivered { get; set; }
    }
}
