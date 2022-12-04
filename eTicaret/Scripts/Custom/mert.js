//Üye ol SweetAlert..
$(document).on('click', '#uyeOl', async function Aga() {
    const { value: formValues } = await Swal.fire({
        title: 'Üye Ol',
        showCancelButton: true,
        cancelButtonColor: '#d43f3a',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Üye Ol',
        confirmButtonColor: '#337ab7',
        html:
            '<label id="kad" style="color:red"></label>'+
            '<input required="required" id="KAD" placeholder="Kullanıcı Adınız" class="swal2-input">' +
            '<label id="posta" style="color:red"></label>' +
            '<input required="required" id="POSTA" placeholder="Email Adresiniz" class="swal2-input">' +
            '<label id="sifre" style="color:red"></label>' +
            '<input type="password" id="SIFRE" placeholder="Şifreniz" class="swal2-input">' +
            '<label id="tel" style="color:red"></label>' +
            '<input required="required" id="TEL" placeholder="Telefon Numaranız" class="swal2-input">' +           
            '<input required="required" id="ADRES" placeholder="Adresiniz" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('KAD').value,
                document.getElementById('POSTA').value,
                document.getElementById('SIFRE').value,
                document.getElementById('TEL').value,
                document.getElementById('ADRES').value,
            ]
        }
    })
    $.ajax({
        url: '/Home/UyeOl',
        type: 'Post',
        dataType: 'json',
        data: { 'KAD': formValues[0], 'POSTA': formValues[1], 'SIFRE': formValues[2], 'TEL': formValues[3], 'ADRES': formValues[4] },
        success: function (dgr) {
            if (dgr == 'bos') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Boş Alan Bırakmayınız!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                
            }
            if (dgr == 'kad') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Kullanıcı Adı 8 Karakterden Az Olamaz',
                    showConfirmButton: false,
                    timer: 2000
                })               
                alert("Kullanıcı Adı 8 Karakterden Az olamaz!!")
                Aga();
            }            
            if (dgr == 'posta') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Eposta Alanı Boş Geçilemez',
                    showConfirmButton: false,
                    timer: 1500
                })
                alert("Eposta 8 Karakterden Az olamaz!!")
                Aga();
            }
            if (dgr == 's') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Şifreniz 8 Karakterden Az Olamaz!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                alert("Şifreniz 8 Karakterden Az olamaz!!")
                Aga();
            }
            if (dgr == 'tel') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Telefon Numaranız 11 Haneden Az Olamaz olamaz',
                    showConfirmButton: false,
                    timer: 1500
                })
                alert("Telefon Numarası 11 Karakterden Az olamaz!!")
                Aga();
            }
            if (dgr == '@') {
                alert("Belirtilen Email Adresinde @ Bulunmuyor!!");
                Aga();
            }
            if(dgr=='1'){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Üyelik Kaydınız Başarıyla Gerçekleşti Oturum Açtıktan Sonra Güvenle Sipariş Oluşturabilirsiniz',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        }
        
    });
});
//Sepete Ürün Ekleme.. Veritabanına Kullanıcının Sepete Eklediği Ürünü Kaydetme Bölümünü Yap 
$(document).ready(function () {
    $("#sepetim").click(function () {
        $('#sepet').toggle(1000);

    });
    $(".Sekle").click(function () {
        var id = $(this).attr("id");
        $.ajax({
            url: "/Home/Getir/" + id,
            type: 'post',
            dataType: 'json',
            success: function (veri) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Ürün ekleme Başarılı!!',
                    showConfirmButton: false,
                    timer: 1500                
                })              

                var sayi = Number(veri.urun_fiyati);
                var toplam = Number($('#toplam').text());
                toplam = toplam + sayi;
                $('#toplam').text(toplam);
               
                
                var rsm = '<img id="foto-' + id + '"style="width:50px;height:50px" src="'+veri.urun_resmi+'"/>';
                var ad = '<p id="ad-' + id + '">'+veri.urun_adi+'</p>';
                var adet = '<p>5</p>';
                var fiyat = '<p id=' + 'fyt-' + id + ' >' + veri.urun_fiyati + '</p>';
                var btn = '<button id=' + id + ' class="btn btn-danger s-ckr"><i class="far fa-trash-alt"></i></button>';
                var dgr = '<tr id="urun-'+id+'" ><td style="width:70px">' + rsm + '</td><td style="width:70px">' + ad + '</td><td style="width:70px">' + adet + '</td><td style="width:70px">' + fiyat + '</td><td style="width:70px">' + btn + '</td></tr>';
                $('#spt-yok').html(" ");               
                $("#spt").append(dgr);                
            }
            
            
        })

    });
    //Sepetten Kaldır Butonu
    $(document).on('click', '.s-ckr', function () {
        var id = $(this).attr('id');
        var sayi = Number($("#fyt-" + id).text());
        var toplam = Number($('#toplam').text());
        toplam = toplam - sayi;
        $('#toplam').text(toplam);
        $('#urun-' + id).hide(1000);
        $('#urun-' + id).html(" ");
        $('#urun-' + id).attr("id", "slndi");
       

    });

});
$(document).on('click', '#giris', async function () {
    const { value: formValues } = await Swal.fire({
        title: 'Giriş Yap',
        showCancelButton: false,
        confirmButtonText: 'Giriş Yap',
        confirmButtonColor: '#337ab7',
        html:
            '<label id="kad" style="color:red"></label>' +
            '<input required="required" id="KAD" placeholder="Kullanıcı Adınız" class="swal2-input">' +
            '<input type="password" id="SIFRE" placeholder="Şifreniz" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('KAD').value,
                document.getElementById('SIFRE').value,

            ]
        }
    })
    $.ajax({
        url: '/Home/Log',
        type: 'Post',
        dataType: 'json',
        data: { 'KAD': formValues[0], 'SIFRE': formValues[1] },
        success: function (cevap) {
            if (cevap == '1') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Giriş İşlemi Başarılı!!',
                    showConfirmButton: false,
                    timer: 3000
                })
                $('#account').show();
                $('#giris').hide();

            }
            if (cevap == '2') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Kullanıcı Adı ve Şifrenizi Kontrol Edin!!',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            if (cevap == '0') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Böyle Bir Kullanıcı Bulunmamakta!!',
                    showConfirmButton: false,
                    timer: 3000
                })
            }

        }


    });
    var kad = formValues[0];
    var email, adres, telefon, sifre, sepet;
    $.ajax({
        url: '/Home/UyeGetir',
        type: 'post',
        dataType: 'json',
        data: { 'kad': kad },
        success: function (veri) {
            email = veri.k_email;
            telefon = veri.k_telno;
            sifre = veri.k_sifre;
            adres = veri.k_adress;
            sepet = veri.k_sepet;
        }

    })

    $(document).on('click', '#account', async function () {
        const { value: formValues } = await Swal.fire({
            title: 'HESAP',
            showCancelButton: true,
            cancelButtonText: "Siteye Dön",
            showConfirmButton: false,
            html:
                '<h1>Hoşgeldiniz Sayın  <strong>' + kad + '</strong></h1><br/>' +
                '<label><strong>Kullanıcı Adı:</strong>  ' + kad + '</label><br/>' +
                '<label><strong>Email</strong>  ' + email + '</label>' + "   " + '<a href=" ">Güncelle</a><br/>' +
                '<label><strong>Telefon Numarası:</strong>  ' + telefon + '</label>' + "   " + '<button class="page-link postGnc">Güncelle</button><br/>' +
                '<label><strong>Adres:</strong>  ' + adres + '</label>' + "   " + '<button class="page-link postGnc">Güncelle</button><br/>',

            focusConfirm: false,

        })


    });
});



