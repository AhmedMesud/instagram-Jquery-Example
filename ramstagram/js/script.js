	/* 
    Get access token & ID through http://jelled.com/instagram/access-token
    Register your app here @ Instagram http://instagram.com/developer 
    */
	function yolla(gelen){
	  	
	  	var link = gelen;
	  		$.ajax({ 
	  		type:'POST',
	  		url:'instagramSql.php',
	  		data:{link:link},
	  		success:function(cevap){
	  			console.log(cevap);
	  		}
	  	});

	}
  
  //////////////İD SI VERILEN KULLANICININ TAKIPCI SAYISINI BULAN VE RESIMLERI TAKIPCI SAYISINA GöRE FILTRELEYEN FONKSIYON./////////////////////////////////////////////////////////////

	function takipcisayisi(kullanici_id,n,div) { 

		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: true,
            url: "https://api.instagram.com/v1/users/"+kullanici_id+"/?access_token=18360510.5b9e1e6.de870cc4d5344ffeaae178542029e98b",
			success: function(data) {
				var ig_count = data.data.counts.followed_by.toString();
				ig_count = add_commas(ig_count);
				$('#instagram_count'+n).html(ig_count);

				if(ig_count<200){ //200 den az takipçisi olan kullanicilarin paylaştığı resimleri göstermiyor.

					$('#pic-'+ div +'').remove(); 
				}
			}
		});
		function add_commas(number) {
			if (number.length > 3) {
				var mod = number.length % 3;
				var output = (mod > 0 ? (number.substring(0,mod)) : '');
				for (i=0 ; i < Math.floor(number.length / 3); i++) {
					if ((mod == 0) && (i == 0)) {
						output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
					} else {
						output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
					}
				}
				return (output);
			} else {
				return number;
			}
		}
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 var n = 0;

var access_token = "18360510.5b9e1e6.de870cc4d5344ffeaae178542029e98b"; //*** YOU NEED TO GET YOUR OWN ACCESS TOKEN FROM INSTAGRAM
//http://instagram.com/developer/authentication/
//http://dmolsen.com/2013/04/05/generating-access-tokens-for-instagram/

var resolution = "thumbnail"; // resolution: low_resolution, thumbnail, standard_resolution
var user_id = "18360510"; //userid
var hashtag = '';
var h2 = '';
var hashtagBaslangic = getParameterByName('tag') ; // #hashtag


if(hashtagBaslangic.split(' ').length>1){

	hashtag = hashtagBaslangic.split(' ')[0];
	h2 = hashtagBaslangic.split(' ')[1];

}else{


	hashtag = hashtagBaslangic.split(' ')[0];

}


var last_url = "";
//https://api.instagram.com/v1/subscriptions?client_secret=CLIENT-SECRET&client_id=CLIENT-ID

//HASHTAG URL - USE THIS URL FOR HASHTAG PICS
//var start_url = "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent/?access_token="+access_token;
//USER URL - USE THIS URL FOR USER PICS

var start_url = "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent/?access_token="+access_token;	
//https://api.instagram.com/v1/tags/racehungry/media/recent?access_token=1836…6303057241113856435_1395676110362&_=1395676128688&max_tag_id=1343521624608
	
	var tum_id ;
	var sadece_kullaniciId;
						
 ////////////////////////////////////RESIMLERI ARATIP EKRANA YAZDIRAN FONKSIYON/////////////////////////////////////////////////////////////////////////////////
function loadEmUp(next_url){

	//console.log("loadEmUp url:" + next_url);
	url = next_url;
				
		$(function() {
		    $.ajax({
			    	type: "GET",
			        dataType: "jsonp",
			        cache: false,
			        url: url ,
			        success: function(data) {
			        
			  		next_url = data.pagination.next_url;
			  		//count = data.data.length;
			  		//three rows of four
				    count = 20;
			  		//uncommment to see da codez
			        //console.log("next_url: " + next_url );
					//console.log("data: " + JSON.stringify(data) );
					
		            for (var i = 0; i < count; i++) {
						if (typeof data.data[i] !== 'undefined' ) {
							tum_id = data.data[i].id;
							sadece_kullaniciId = tum_id.substring(19,29); //Bulunan her resim için paylaşan kullanıcının id sini aldık, bunları aşağıda takipçilerine göre filtreleyeceğiz çünkü
							var div = data.data[i].id;


							if(hashtagBaslangic.split(' ').length==2){ // 2 hashtag aratabilmek için

								var tagSayisi = data.data[i].tags.length;

								for(var j=0;j<tagSayisi;j++){

									if(data.data[i].tags[j]==h2){
									
										takipcisayisi(sadece_kullaniciId,n,div); //200 den az takipçisi olanları göstermemesini sağlayan fonksiyon
										$("#instagram").append("<div class='instagram-wrap' id='pic-"+ data.data[i].id +"' ><a target='_blank' href='" + data.data[i].link +"'><span class='likes'>"+data.data[i].likes.count +"</span><img class='counts' src='img/takip.jpeg' style='width:20px;height:20px;margin-left:240px;'/><span class='counts' id='instagram_count"+n+"' ></span></br><img class='instagram-image' id='"+data.data[i].id+"' src='" + data.data[i].images.low_resolution.url +"'  /></a></div>"); 	
										//Aradıklarını ekrana yazdırıyor
									}

								}


							}else{

								takipcisayisi(sadece_kullaniciId,n,div); //200 den az takipçisi olanları göstermemesini sağlayan fonksiyon

								$("#instagram").append("<div class='instagram-wrap' id='pic-"+ data.data[i].id +"' ><a target='_blank' href='" + data.data[i].link +"'><span class='likes'>"+data.data[i].likes.count +"</span><img class='counts' src='img/takip.jpeg' style='width:20px;height:20px;margin-left:240px;'/><span class='counts' id='instagram_count"+n+"' ></span></br><img class='instagram-image' id='"+data.data[i].id+"' src='" + data.data[i].images.low_resolution.url +"'  /></a></div>"); 	
								//Aradıklarını ekrana yazdırıyor
							}

							//console.log(data.data[i].tags);
							
							
							n++;

						}  
		      		}     
			  		
					


					$('a').attr('onclick','yolla(this.href);');	  //Tıklanan fotoğrafın linkini sql e yolluyor.
					

			  		console.log("next_url: " + next_url);
			  		$("#showMore").hide();
			  		if (typeof next_url === 'undefined' || next_url.length < 10 ) {
				  		console.log("NO MORE");
				  		$("#showMore").hide();
				  		$( "#more" ).attr( "next_url", "");
			  		}
			  		
			  		
		      		else {
				        //set button value
				        console.log("displaying more");
				        $("#showMore").show();
				        $( "#more" ).attr( "next_url", next_url);
				        last_url = next_url;
			      		
		      		}
		        }
		    });
		});
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////TEKRAR TEKRAR ARAMAYI SAGLAYAN FONKSIYONLAR/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
var aramaSayisi = 20;

//CALL THE SCRIPT TO START...
$( document ).ready(function() {

	//APPEND LOAD MORE BUTTON TO THE BODY...
	$("#more" ).click(function() {  //load more a tıklayınca manuel olarak aramayı tekrar ediyor.

		aramaSayisi = aramaSayisi + 20;  
		var next_url = $(this).attr('next_url');
		loadEmUp(next_url);
		return false;
	});

	//start your engines
	loadEmUp(start_url);
    
	setInterval(function(){  //Burada 3 saniyede bir aramayı tekrar etmesini tekrarlardık.

		aramaSayisi = aramaSayisi + 20;
     	var next_url = $('#more').attr('next_url');
		loadEmUp(next_url); 
		console.log(aramaSayisi);
	}, 3000);
	
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}