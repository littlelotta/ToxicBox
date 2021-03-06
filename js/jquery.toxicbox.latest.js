/**
* jquery.toxicbox ver.1.1.0.6
* ToxicBox - © 2015-2016 Berestov Andrey
* http://my-gallery.name
*/

var toxicbox_options={};

$(function() {window.ToxicBox = (function () {

var l='en',
  rl={
    im : 'Фото',
    o : 'из'
  },
  el={
    im : 'Image',
    o : 'of'
  },
  basic_width = 960, 
  auto_width = 'on',
  auto_alt_to_title = 'off',
  iu="../images/toxic/", 
  ps = 5, 
  sp =1,
  alert_width = 300, 
  start_box_size = 150,
  isMobile = { 
    Android: function() {
      return navigator.userAgent.match(/Android/i); 
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    } 
  },
  width = $(window).width(),
  height = $(window).height(),
  ci=$('a[data-toxic="group"]:not([data-toxic-name])').length,
  ai = $('a[data-toxic="group"]:not([data-toxic-name])'),
  ch=0,
  cw=0,
  back_src,
  next_src,
  cd,
  current_databox,
  is_single,
  zoom,
  cl,
  cin;

//initialization settings
  
if (Object.keys(toxicbox_options).length) {
  if(toxicbox_options.language) l=toxicbox_options.language;	
  if(toxicbox_options.padding) ps=toxicbox_options.padding;	
  if(toxicbox_options.images_url) iu=toxicbox_options.images_url;	
  if(toxicbox_options.alert_width) alert_width=toxicbox_options.alert_width;	
  if(toxicbox_options.basic_width) basic_width=toxicbox_options.basic_width;	
  if(toxicbox_options.auto_width) auto_width=toxicbox_options.auto_width;	
  if(toxicbox_options.speed) sp=toxicbox_options.speed;
  if(toxicbox_options.auto_alt_to_title) auto_alt_to_title=toxicbox_options.auto_alt_to_title;
  if(toxicbox_options.start_box_size) start_box_size=toxicbox_options.start_box_size;
}	

var old_width=start_box_size-ps*2,
  old_height=old_width;

$("a[data-toxic='single'], a[data-toxic='group']")
  .addClass('toxicbox_zoom_style');

$(new Image())
  .attr('src', iu+'loader.gif');

if (l=='ru') {
  cl=rl;
  } else {
  cl=el; 
}	

//correction for Mobile

function FixWidthForMobile() {
  if((navigator.userAgent.indexOf("Presto") + 1)||(navigator.userAgent.indexOf("iPhone") + 1)||(navigator.userAgent.indexOf("iPad") + 1)||(navigator.userAgent.indexOf("Android") + 1)) {
    width = window.innerWidth ;
  }
}

FixWidthForMobile();

function get_zoom(){
  zoom = Math.round(((window.outerWidth) / window.innerWidth)*100) / 100;
  return zoom;
}

document.body.addEventListener('touchend', function(e){
  zoom = get_zoom();
  width =(screen.width)/zoom;height = window.innerHeight;
  FixWidthForMobile();
}, false);

$( window ).resize(function() {
  if (!isMobile.any()){
    var ts=$("#toxicbox");
    zoom = get_zoom();
    width =$(window).width();height = $(window).height();
    if(ts){
      ts.css({'margin-left':0+'px','margin-top':0+'px','left':((width/2)-((cw)/2+ps)+$(window).scrollLeft())+'px','top':((height/2+$(window).scrollTop())-((ch)/2+ps))+'px'});
      if (parseInt(ts.css('top'))<0){ts.css('top','0');}
          }
                      }
});

//Processing loader

function image_start_load (){
  $('body')
    .prepend('<img src="'+iu+'loader.gif" alt="" id="toxicbox_loading" style="top:0;margin-top:'+((height/2-20)+$(window).scrollTop())+'px;margin-left:'+(width/2 - 20+$(window).scrollLeft())+'px;"  />');
}

//Display of images

function chk_arrow() {
  if (!back_src) $('#toxicbox .toxicbox_left_arrow a').remove();
  if (!next_src) $('#toxicbox .toxicbox_right_arrow a').remove();	
}
function preload() {
  $(new Image())
    .attr('src', $(back_src).attr('href'));
  $(new Image())
    .attr('src', $(next_src).attr('href'));
}
function GetImages(ct) {
  var ts=$("#toxicbox"), 
    tl=$('#toxicbox_loading'),
    i;
  function fix_img_height(correct){
    $(correct)
      .css({'max-height':(height-ttx.height()-ps*2)+'px','width':'auto'});
    cw=$(correct).width();
    $(correct).css('width',cw+'px');
    ch = $(correct).height();
    }
    ts
      .prepend('<img src="'+$(cd).attr('href')+'" alt="" class="toxicbox_the_current_object toxicbox_hidden" style="max-width:'+(width-ps*2)+'px;max-height:'+height+'px;" />' +
               '<div id="toxicbox_text_frame" class="toxicbox_hidden" style="min-height:'+(41+ps)+'px;margin-top:'+ps+'px;"></div>');
    var ttx=$('#toxicbox_text_frame');
    if (is_single == 21) {
      cin-=1;
      back_src=ai[cin-2];
      next_src=ai[cin];
      preload();
    }
	if (is_single == 22) {
      cin+=1;
      back_src=ai[cin-2];
      next_src=ai[cin];
      preload();
    }
    if (is_single == 2) {
    for(i=0;i<ci;i++){
      if(cd==ai[i]) {
        cin=i+1;
        back_src=ai[i-1];
        next_src=ai[i+1];
        preload();
        break;
      }
    }
    }
    $(".toxicbox_the_current_object")
      .on('load', function() {
        ch = $(this).height();
        cw = $(this).width();
        fix_img_height(this);
        if(ct){	
          if ( (is_single == 2)||(is_single == 21)||(is_single == 22) ) {
              ttx
                .css('width',(cw-ps*2-40)+'px')
                .html('<div id="toxicbox_arrow_frame" style="width:'+cw+'px;"><div class="toxicbox_left toxicbox_left_arrow" style="margin-left:-20px;" >' +
                      '<a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxicbox_left toxicbox_right_arrow"><a href="#next">' +
                      '<img src="'+iu+'right.png" alt="" /></a></div></div><p class="toxicbox_center toxicbox_pictures_count">'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p>' +
                      '<p class="toxicbox_center toxicbox_name_of_picture" style="margin-bottom:'+ps+'px;">'+ct+'</p>');
                chk_arrow();
          }
          if (is_single==1 ) {
              ttx
                .html('<p class="toxicbox_center toxicbox_name_of_picture" style="width:'+($(this).width()-40)+'px;margin-bottom:'+ps+'px;">'+ct+'</p>');
          }
        }else{
          if ( (is_single == 2)||(is_single == 21)||(is_single == 22) ) {
              ttx
                .html('<p class="toxicbox_center toxicbox_pictures_count" >'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p>')
                .prepend('<div id="toxicbox_arrow_frame" style="width:'+cw+'px;"><div class="toxicbox_left toxicbox_left_arrow" style="margin-left:-20px;" >' +
                         '<a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxicbox_left toxicbox_right_arrow"><a href="#next">' +
                         '<img src="'+iu+'right.png" alt="" /></a></div></div>');
                chk_arrow();
		  }
          if (is_single==1 ){
              ttx
                .css({'height':20+ps+'px','min-height':0});
		  }
        }
		
        fix_img_height(this);

        // TODO: Recall fix_img_height makes the calculation more precise
		
        $('#toxicbox .toxicbox_right_arrow, #toxicbox .toxicbox_left_arrow')
          .css('width',''+((cw)/2)+'px');
        ch=ttx.height()+ch;
        ts
          .prepend('<a href="#index" class="toxicbox_parent_of_close_button"><img id="toxicbox_close_image" class="toxicbox_hidden toxic_images_close" src="'+iu+'close.png" alt="" /></a>');
        $('#toxicbox_close_image')
          .css({'margin-left':(cw-20)+'px','margin-top':(ch-20)+'px'});
        ts
          .velocity( {
            left:((width/2)-((cw)/2+ps)+$(window).scrollLeft()),
            top: ((height/2+$(window).scrollTop())-((ch)/2+ps)),
            width:cw,
            height:ch
          },
		  600/sp,
		  function() {
		    tl
		      .velocity("fadeOut", 150/sp);
			ttx
		      .css('width',(cw-40));
		    $('#toxicbox .toxicbox_the_current_object, #toxicbox #toxicbox_text_frame, #toxicbox #toxicbox_close_image')
		      .velocity("fadeIn",150/sp);
		    }
		  );
      });
}
	
function GetDataToxic() {
  var ct=$(cd).attr('title');
  if ((auto_alt_to_title == 'on')&&(!ct)) ct=$(cd).find('img').attr('alt');
  if ($(cd).attr('data-toxic-name')) {
  ai=$('a[data-toxic-name="'+$(cd).attr('data-toxic-name')+'"]');
  ci=ai.length;
  }
    $('body')
      .append('<div id="toxicbox_darkness_substrate" class="toxic_images_close"></div><div id="toxicbox" style="height:'+old_height+'px;width:'+old_width+'px;' +
              'left:'+(width/2-ps-old_width/2+$(window).scrollLeft())+'px;top:'+((height)/2-ps-old_height/2+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    image_start_load();
    $(new Image())
      .attr('src', $(cd).attr('href'))
      .on('load', GetImages(ct));
    }
	
//Display of containers	
	
function GetDataToxicDatabox(id,title) {
    if (cd) current_databox = $('#'+$(cd).attr('data-toxic-databox'));
    if (id)	current_databox = $('#'+id);
    $('body')
      .append('<div id="toxicbox_darkness_substrate" class="toxicbox_databox_prefix"></div><div id="toxicbox" style="height:'+old_height+'px;width:'+old_width+'px;' +
              'left:'+(width/2-ps-old_width/2+$(window).scrollLeft())+'px;top:'+((height)/2-ps-old_height/2+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    var ts=$("#toxicbox"),
      padb=(parseInt(current_databox.css('paddingBottom'))),
      padt=(parseInt(current_databox.css('paddingTop'))),
      padl=(parseInt(current_databox.css('paddingLeft'))),
      padr=(parseInt(current_databox.css('paddingRight'))),
      istitle=$(cd).attr('title');
      if (title) istitle=title;
    image_start_load();
    var tl=$('#toxicbox_loading');
    cw=current_databox.width()+(parseInt(current_databox.css('borderLeftWidth')))+(parseInt(current_databox.css('borderRightWidth')))+padr+padl;
    if (cw==width) {
      if (auto_width=='on') {
        cw=basic_width;
        $(current_databox)
          .css('width',cw+'px');
      }else {
        cw=width-ps*2;
      }
    }
    if (cw>width) {
      cw=width-(parseInt(current_databox.css('borderLeftWidth')))-(parseInt(current_databox.css('borderRightWidth')))-padr-padl-ps*2;
      current_databox
        .css({'width':cw+'px','height':'auto'})
        .find('iframe')
        .attr('width',cw);
    }
    ch = $(current_databox).height()+20+(parseInt(current_databox.css('borderTopWidth')))+(parseInt(current_databox.css('borderBottomWidth')))+padt+padb+ps;
    if (istitle) {
      ts
        .prepend('<h2 id="toxicbox_header" style="width:'+cw+'px;margin-bottom:'+ps+'px;" class="toxicbox_hidden toxicbox_center">'+istitle+'</h2>');
      ch += parseInt($('#toxicbox_header').css('height'))+parseInt($('#toxicbox_header').css('marginTop'))+parseInt($('#toxicbox_header').css('marginBottom'))+
            parseInt($('#toxicbox_header').css('paddingTop'))+parseInt($('#toxicbox_header').css('paddingBottom'));
    }	
    ts
      .velocity( {
        width:cw,
        height:ch,
        marginLeft:-(cw/2-old_width/2),
        marginTop:(-height/2+(height-ch)/2+old_height/2)
	  },
      600/sp,
      function() {
        tl
          .velocity("fadeOut", 150/sp, function(){
	        $(this).remove();
          });
        ts
          .append(current_databox, '<a href="#index" class="toxicbox_parent_of_close_button"><img id="toxicbox_close_image" class="toxicbox_hidden toxicbox_databox_prefix" src="'+iu+'close.png" alt="" /></a>')
          .css({'min-height':ch+'px','height':'auto'});
        if (istitle) {
          current_databox
            .css({'marginLeft':padl+'px','marginTop':padt+parseInt($('#toxicbox_header').css( 'marginBottom'))+parseInt($('#toxicbox_header').css( 'paddingBottom'))+'px'})  
            .velocity("fadeIn", 150/sp);
        }else{
          current_databox
            .css({'marginLeft':padl+'px','marginTop':padt+'px'})  
            .velocity("fadeIn", 150/sp);
		}
        $('#toxicbox_close_image.toxicbox_databox_prefix')
          .css({'marginLeft':cw-20+'px','marginTop':(padb+ps)+'px'})
          .velocity("fadeIn",150/sp);
        $('#toxicbox_header').velocity("fadeIn",200/sp);
        if ((parseInt(ts.css('top')))+(parseInt(ts.css('marginTop'))-$(window).scrollTop())<0) {
          ts
            .css({'marginTop':'0','top':$(window).scrollTop()});
        }
      });
}

//Display of notifications

function GetDataToxicAlert(title) {
  if (cd) current_databox = $(cd).attr('data-toxic-alert');	
  if (title) current_databox = title;
  $('body')
    .append('<div id="toxicbox_darkness_substrate" class="toxic_images_close"></div><div id="toxicbox" class="toxicbox_alert_frame" style="height:'+old_height+'px;width:'+old_width+'px;' +
            'left:'+(width/2-ps-old_width/2+$(window).scrollLeft())+'px;top:'+((height)/2-ps-old_height/2+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
  var ts=$("#toxicbox");
  ts
    .html('<p class="toxicbox_alert_frame toxicbox_hidden" style="width:'+alert_width+'px;">'+current_databox+'</p>')
    .prepend('<a href="#index" class="toxicbox_parent_of_close_button"><img id="toxicbox_close_image" class="toxicbox_hidden toxic_images_close" src="'+iu+'close.png" alt="" /></a>');
  image_start_load();
  var tl=$('#toxicbox_loading'),
    tsp=$("#toxicbox p");
  cw=tsp.width();
  ch=tsp.height()+20+ps;
  if (cw>=width) {
    cw=width-ps*2;
    $("#toxicbox .toxicbox_alert_frame")
      .css('max-width',cw+'px');
    ch=tsp.height()+20+ps;
  }
  ts
    .velocity( {
      width:cw,
      height:ch,
      marginLeft:-(cw/2-old_width/2),
      marginTop:(-height/2+(height-ch)/2+old_height/2)
    },
    600/sp,
    function() {
      tl
        .velocity("fadeOut", 150/sp, function(){
          $(this).remove();
        });
      tsp
        .velocity("fadeIn",150/sp);
      $('#toxicbox_close_image.toxic_images_close')
        .css({'margin-left':(cw-20)+'px','margin-top':(ch-21)+'px'})
        .velocity("fadeIn",150/sp);
    });
}

//press the left - right

function get_new_img (correct, ct){
  cd = correct;
  ct=$(cd).attr('title');
  if ((auto_alt_to_title == 'on')&&(!ct)) ct=$(cd).find('img').attr('alt');
  image_start_load();
  $(new Image())
    .attr('src',$(cd).attr('href'))
    .on('load', function(){
      $('#toxicbox .toxicbox_the_current_object,#toxicbox #toxicbox_text_frame, #toxicbox #toxicbox_close_image, #toxicbox #toxicbox_arrow_frame').remove();
      GetImages(ct);
    });
}

$( document )
  .on( "click", ".toxicbox_left_arrow a", function() {
    is_single = 21;
    $('#toxicbox_loading').remove();
    get_new_img(back_src);
    return false;
  })	
  .on( "click", ".toxicbox_right_arrow a", function() {
    is_single = 22;
    $('#toxicbox_loading').remove();
    get_new_img(next_src);
    return false;
  })
  .on( "click", 'a[data-toxic="group"]', function() {
    is_single=2;
    cd=this;
    GetDataToxic();
    return false;
  })
  .on( "click", 'a[data-toxic="single"]', function() {
    is_single=1;
    cd=this;
    GetDataToxic();
    return false;
  })	
  .on( "click", '[data-toxic-databox]', function() {
    is_single=3;
    cd=this;
    GetDataToxicDatabox();
    return false;
  })  
  .on( "click", '[data-toxic-alert]', function() {
    is_single=3;
    cd=this;
    GetDataToxicAlert();
    return false;
  })  
  .on( "click", "#toxicbox_darkness_substrate, #toxicbox_close_image", function() {
    close_all();
    return false;
  })
  .keyup(function(e) {
    if (e.keyCode == 27) close_all();
  });
function close_function_progress() {
if (!old_width) {
  old_width=start_box_size-ps*2,
    old_height=old_width;
}
  if($('#toxicbox').find('.toxicbox_databox_prefix').length){
    $('body')
      .append(current_databox);
        current_databox
         .css({'display':'none','margin':0});
  }
  $('#toxicbox_loading')
    .remove();
  $('#toxicbox_darkness_substrate, #toxicbox')
    .remove();
  cd = undefined;
  ci=$('a[data-toxic="group"]:not([data-toxic-name])').length;
  ai = $('a[data-toxic="group"]:not([data-toxic-name])');
}	
function close_all() {
  old_width=$('#toxicbox').width();
  old_height=$('#toxicbox').height();
  $('#toxicbox_darkness_substrate, #toxicbox, #toxicbox_loading')
    .velocity("fadeOut", 150/sp, function(){
      close_function_progress();
    });
  return false;
}
function pre_close_all() {
  if ($('#toxicbox').is(':visible')) {
    old_width=$('#toxicbox').width();
    old_height=$('#toxicbox').height();
  }
  $('#toxicbox_darkness_substrate, #toxicbox, #toxicbox_loading').css('display','none');
  close_function_progress();
}
return {
      GetDatabox: function(id,delay,title) {
        if (!delay) delay=0;
        setTimeout(function() {
          pre_close_all();
          GetDataToxicDatabox(id,title);
        }, delay);
      },
      GetAlert: function(title,delay) {
        if (!delay) delay=0;
        setTimeout(function() {
          pre_close_all();
          GetDataToxicAlert(title);
        }, delay);
      }
       };
   
})();

});
