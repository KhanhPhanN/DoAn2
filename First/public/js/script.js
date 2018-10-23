var socket = io("http://localhost:3000");
function DanhSachNgay(nam,thang){
if(thang==4||thang==6||thang==9||thang==11){
   return 30;
}
if((thang==2)&&(nam%4==0)){
   return 29;
}
if((thang==2)&&(nam%4!=0)){
   return 28;
}
return 31;
}
function InNgay(nam,thang){
    XoaBang();
    var currentday = new Date();
    var url = "/";
 var ngay=new Date(nam+"-"+thang+"-"+1);
 var temp =1;
 var c =true;
 for(var i=0;i<36;i=i+7){
      if(i%7==0){
        $("#days").append("<tr></tr>");
     }
     var thu = ngay.getDay();
     if(c){
     for(var k = 0;k<thu;k++){
        var cell = "<th></th>";
        $("#days").append(cell);
     }
     c=false;
    }
    if(i==0)
    {
    for( var j=thu;j<7;j++){
    var cell = "<th id = "+'d'+temp+thang+nam+"><a href="+url+temp+"-"+thang+"-"+nam+">"+temp+"</a></th>";
    var cellcurrent = '<th id="currentday"><a href='+url+temp+"-"+thang+"-"+nam+"><span>"+temp+'</span ></a></th>';
 
     if(temp==currentday.getDate()&&(thang==currentday.getMonth()+1)&&(nam==currentday.getFullYear())){
        $("#days").append(cellcurrent);
     }else{
        $("#days").append(cell);
     }
    temp++;
    if(temp>DanhSachNgay(nam,thang)){
        return;
    }
    }
}else{
    for( var j=0;j<7;j++){
      var cell = "<th id = "+'d'+temp+thang+nam+"><a href="+url+temp+"-"+thang+"-"+nam+">"+temp+"</a></th>";
      var cellcurrent = '<th id="currentday" ><a href='+url+temp+"-"+thang+"-"+nam+"><span >"+temp+'</span ></a></th>';
      if(temp==currentday.getDate()&&(thang==currentday.getMonth()+1)&&(nam==currentday.getFullYear())){
         $("#days").append(cellcurrent);
      }else{
         $("#days").append(cell);
      }
        temp++;
        if(temp>DanhSachNgay(nam,thang)){
            return;
        }
        }
}
 }
}
function XoaBang(){
    $("#days").html("");
}
function KhoiDong(){
    var d =new Date();
    $("#thang").html((d.getMonth()+1));
    $("#nam").html(d.getFullYear());
    InNgay(d.getFullYear(),d.getMonth()+1);
}
function KhoiDong1(thang, nam){
    $("#thang").html(thang);
    $("#nam").html(nam);
    InNgay(nam,thang);
}
function ChayTang(nam,thang){
    if(thang>=12){
        thang=1;
        nam=nam+1;
    }else{
        thang++;
    }
    $("#thang").html(thang);
    $("#nam").html(nam);
    InNgay(nam,thang);
}
function ChayLui(nam,thang){
    if(thang<=1){
        thang=12;
        nam=nam-1;
    }else{
        thang--;
    }
    $("#thang").html(thang);
    $("#nam").html(nam);
    InNgay(nam,thang);
};

$(document).ready(function(){
    $("#data").hide();
    $("#next").click(function(){
        ChayTang(parseInt($("#nam").html()),parseInt($("#thang").html()));
        });
     $("#prev").click(function(){
        ChayLui(parseInt($("#nam").html()),parseInt($("#thang").html()));
            });
        
        // $("#f1").mouseup( function(){
        //         $("#time").html($("#t1").html())
        //         $("#showhopthoai").show()
        // });
        // $("#f2").click( function(){
        //     $("#time").html($("#t2").html())
        //    $("#showhopthoai").show();
        // });
        // $("#f3").click( function(){
        //     $("#time").html($("#t3").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f4").click( function(){
        //     $("#time").html($("#t4").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f5").click( function(){
        //     $("#time").html($("#t5").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f6").click( function(){
        //     $("#time").html($("#t6").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f7").click( function(){
        //     $("#time").html($("#t7").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f8").click( function(){
        //     $("#time").html($("#t8").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f9").click( function(){
        //     $("#time").html($("#t9").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f10").click( function(){
        //     $("#time").html($("#t10").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f11").click( function(){
        //     $("#time").html($("#t11").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f12").click( function(){
        //     $("#time").html($("#t12").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f13").click( function(){
        //     $("#time").html($("#t13").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f14").click( function(){
        //     $("#time").html($("#t14").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f15").click( function(){
        //     $("#time").html($("#t15").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f16").click( function(){
        //     $("#time").html($("#t16").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f17").click( function(){
        //     $("#time").html($("#t17").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f18").click( function(){
        //     $("#time").html($("#t18").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f19").click( function(){
        //     $("#time").html($("#t19").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f20").click( function(){
        //     $("#time").html($("#t20").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f21").click( function(){
        //     $("#time").html($("#t21").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f22").click( function(){
        //     $("#time").html($("#t22").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f23").click( function(){
        //     $("#time").html($("#t23").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f24").click( function(){
        //     $("#time").html($("#t24").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f25").click( function(){
        //     $("#time").html($("#t25").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f26").click( function(){
        //     $("#time").html($("#t26").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f27").click( function(){
        //     $("#time").html($("#t27").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f28").click( function(){
        //     $("#time").html($("#t28").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f29").click( function(){
        //     $("#time").html($("#t29").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f30").click( function(){
        //     $("#time").html($("#t30").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f31").click( function(){
        //     $("#time").html($("#t31").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f32").click( function(){
        //     $("#time").html($("#t32").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f33").click( function(){
        //     $("#time").html($("#t33").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f34").click( function(){
        //     $("#time").html($("#t34").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f35").click( function(){
        //     $("#time").html($("#t35").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f36").click( function(){
        //     $("#time").html($("#t36").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f37").click( function(){
        //     $("#time").html($("#t37").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f38").click( function(){
        //     $("#time").html($("#t38").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f39").click( function(){
        //     $("#time").html($("#t39").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f40").click( function(){
        //     $("#time").html($("#t40").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f41").click( function(){
        //     $("#time").html($("#t41").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f42").click( function(){
        //     $("#time").html($("#t42").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f43").click( function(){
        //     $("#time").html($("#t43").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f44").click( function(){
        //     $("#time").html($("#t44").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f45").click( function(){
        //     $("#time").html($("#t45").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f46").click( function(){
        //     $("#time").html($("#t46").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f47").click( function(){
        //     $("#time").html($("#t47").html())
        //     $("#showhopthoai").show();
        // });
        // $("#f48").click( function(){
        //     $("#time").html($("#t48").html())
        //     $("#showhopthoai").show();
        // });
        var colorList = ['000000', '993300', '333300', '003300', '003366', '000066', '333399', '333333',

        '660000', 'FF6633', '666633', '336633', '336666', '0066FF', '666699', '666666', 'CC3333', 'FF9933', '99CC33', '669966', '66CCCC', '3366FF', '663366', '999999', 'CC66FF', 'FFCC33', 'FFFF66', '99FF66', '99CCCC', '66CCFF', '993366', 'CCCCCC', 'FF99CC', 'FFCC99', 'FFFF99', 'CCffCC', 'CCFFff', '99CCFF', 'CC99FF', 'FFFFFF'];
        
            var picker1 = $('#color-picker-1');
            var picker2 = $('#color-picker-2');
            var picker3 = $('#color-picker-3');
        
        
            for(var i=0; i< colorList.length; i++)
        
            {
        
                picker1.append('<li class="color-item" data-hex="'+
        
                '#' + colorList[i] + '" style="background-color:' +
        
                '#' + colorList[i] + ';"></li>');
                picker2.append('<li class="color-item" data-hex="'+
        
                '#' + colorList[i] + '" style="background-color:' +
        
                '#' + colorList[i] + ';"></li>');
                picker3.append('<li class="color-item" data-hex="'+
        
                '#' + colorList[i] + '" style="background-color:' +
        
                '#' + colorList[i] + ';"></li>');
        
            }
        
            // khi click vao bang mau, no se tu mat
        
            $('body').click(function(){
                picker1.fadeOut();
                picker2.fadeOut();
                picker3.fadeOut();
            });
            var color1,color2,color3;
            temp1 = $("#sn").attr("style").split(" ");
            color1 = temp1[1]; 
            temp2 = $("#ch").attr("style").split(" ");
            color2 = temp2[1]; 
            temp3 = $("#nn").attr("style").split(" ");
            color3 = temp3[1]; 
            // click de xuat hien bang mau
        
            $('.call-picker-1').click(function(event){
        
                event.stopPropagation();
        
                picker1.fadeIn();
        
                picker1.children('li').hover(function(){
        
                    var codeHex = $(this).data('hex');
                    color1 = codeHex;
                    $("#sn").attr("style","background-color: "+color1)
                    $('.color-holder-1').css('background-color',codeHex);
        
                    $('#pickcolor').val(codeHex);
        
                });
        
            });
            $('.call-picker-2').click(function(event){
        
                event.stopPropagation();
        
                picker2.fadeIn();
        
                picker2.children('li').hover(function(){
        
                    var codeHex = $(this).data('hex');
                    color2 = codeHex;
                    $("#ch").attr("style","background-color: "+color2)
                    $('.color-holder-2').css('background-color',codeHex);
        
                    $('#pickcolor').val(codeHex);
        
                });
        
            });
            $('.call-picker-3').click(function(event){
        
                event.stopPropagation();
        
                picker3.fadeIn();
        
                picker3.children('li').hover(function(){
        
                    var codeHex = $(this).data('hex');
                    color3 = codeHex;
                    $("#nn").attr("style","background-color: "+color3)
                    $('.color-holder-3').css('background-color',codeHex);
        
                    $('#pickcolor').val(codeHex);
        
                });
        
            });
            function save(){
                for(var i=1;i<49;i++){
                if($("#time").html()==$("#t"+i).html()){
                $("#f"+i).html($("#node").val());
                var d1= $("#tieude1").html();
                var d2= $("#node").val();
                var d3= $("#time").html();
                var d4= $("#date").html();
               $("#data").val(d1+"/"+d2+"/"+d3+"/"+d4+"/"+color1+"/"+color2+"/"+color3);
               $("#node").val("");
                }
            }
             
            }
            $("#sn").click(function(){
                $("#tieude1").html("Sinh nhật")
            })
            $("#ch").click(function(){
                $("#tieude1").html("Cuộc họp")
            })
            $("#nn").click(function(){
                $("#tieude1").html("Nhắc nhở")
            })
            $("#cancel").click(function(){
                $("#node").val("");
               $("#showhopthoai").hide();
               $("#tieude1").html("Tiêu đề:");
            })
            $("#save").click(function(){
                save();
               $("#showhopthoai").hide();
            })
         $("#container-table").click(function(){
            $("#container-table").mousemove(function(event){
              

            })
         })
});


