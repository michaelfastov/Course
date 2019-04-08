using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Backend.Models
{
    public class Vendor
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CustomerID { get; set; }
        public virtual Customer Customer { get; set; }

        public virtual ICollection<VendorToProduct> VendorsToProducts { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
