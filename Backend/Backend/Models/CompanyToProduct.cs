using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class CompanyToProduct
    {
        public int ID { get; set; }

        public int CompanyID { get; set; }
        public int ProductID { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductWeight { get; set; }

        public virtual Product Product { get; set; }
        public virtual Company Company { get; set; }

    }
}
