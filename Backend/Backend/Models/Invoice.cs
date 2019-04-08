using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Invoice
    {
        public int ID { get; set; }
        public string Date { get; set; }
        public int CompanyID { get; set; }
        public int VendorID { get; set; }
        public bool isAccepted { get; set; }
        public bool isDelivered { get; set; }
        public virtual Company Company { get; set; }
        public virtual Vendor Vendor { get; set; }

        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }
    }
}
