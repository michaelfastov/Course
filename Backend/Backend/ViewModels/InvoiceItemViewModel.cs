using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ViewModels
{
    public class InvoiceItemViewModel
    {
        public int ID { get; set; }
        public int InvoiceID { get; set; }
        public int ProductID { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductWeight { get; set; }
    }
}
