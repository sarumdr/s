$(document ).ready(function() {
    hide(1);
});


function hide(a)
{

  localStorage.setItem("index", a);
  switch(a)
  {

case 1:     $("#home").show();
            $("#donate").hide();
            $("#receiver").hide();
			
break;


case 2:     $("#home").hide();
            $("#donate").show();
            $("#receiver").hide();
break;


case 3:     $("#home").hide();
            $("#donate").hide();
            $("#receiver").show();
break;




}
}
