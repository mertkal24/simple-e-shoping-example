using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eTicaret.Models;

namespace eTicaret.Controllers
{
   

    public class HomeController : Controller
    {
        MkEntities db = new MkEntities();
        multiModel yeni = new multiModel();
        public ActionResult Index()
        {
            yeni.urun = db.Urunler.ToList();
            return View(yeni);
        }
        [HttpPost]
        public JsonResult Getir(int id)
        {
            var veriler = db.Urunler.FirstOrDefault(x=>x.Id==id);            
            return Json(veriler,JsonRequestBehavior.AllowGet);
                
        }
        public JsonResult UyeOl(string KAD, string POSTA,string SIFRE,string TEL,string ADRES)
        {
            if (KAD.Length == 0 || POSTA.Length == 0 || SIFRE.Length == 0 || TEL.Length == 0) return Json("bos");
            if (KAD.Length < 8) return Json("kad");
            if (POSTA.Length ==0) return Json("posta");
            if (POSTA.IndexOf("@") <= 0)
            {
                return Json("@");
            }
            if (SIFRE.Length<8) return Json("s");
            if (TEL.Length < 11) return Json("tel");            

            User yeni = new User();
            yeni.k_adi = KAD;
            yeni.k_email = POSTA;
            yeni.k_sifre = SIFRE;
            yeni.k_telno = TEL;
            yeni.k_adress = ADRES;
            db.User.Add(yeni);
            db.SaveChanges();
            return Json("1");
        }
        public JsonResult Log(string KAD,string SIFRE)
        {
            var kullanici = db.User.FirstOrDefault(x => x.k_adi == KAD);
            if (kullanici != null)
            {
                if (kullanici.k_sifre == SIFRE)
                {
                    return Json("1");
                }
                else return Json("2");
            }
            else return Json("0");
        }
        public JsonResult UyeGetir(string kad)
        {
            User var = db.User.FirstOrDefault(x => x.k_adi == kad);
            return Json(var, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Ugur()
        {
            return View();
        }
        

    }
}