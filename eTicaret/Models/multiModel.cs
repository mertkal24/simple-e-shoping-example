using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eTicaret.Models
{
    public class multiModel
    {
        public IEnumerable<Hakkimizda> hakkimizda { get; set; }
        public IEnumerable<Siparisler> siparis { get; set; }
        public IEnumerable<Urunler> urun { get; set; }
        public IEnumerable<User> user { get; set; }
      
    }
}