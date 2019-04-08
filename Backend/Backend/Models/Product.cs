using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        public virtual ICollection<CompanyToProduct> CompaniesToProducts { get; set; }
        public virtual ICollection<VendorToProduct> VendorsToProducts { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }
    }
}
