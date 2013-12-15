
       // CSV

jQuery.extend({
    csv: function(delim, quote, linedelim) {

        delim = typeof delim == "string" ? new RegExp("[" + (delim || ",") + "]") : typeof delim == "undefined" ? "," : delim;
        quote = typeof quote == "string" ? new RegExp("^[" + (quote || '"') + "]") : typeof quote == "undefined" ? '"' : quote;
        lined = typeof lined == "string" ? new RegExp("[" + (lined || "\n") + "]+") : typeof lined == "undefined" ? "\n" : lined;

        var nested_data_array = new Array();

        function splitline(v) {
            // Split the line using the delimitor
            var arr = v.split(delim),
                out = [], q;
            var parsed_data_array = new Array();
            for (var i = 0, l = arr.length; i < l; i++) {
                if (q = arr[i].match(quote)) {
                    for (j = i; j < l; j++) {
                        if (arr[j].charAt(arr[j].length - 1) == q[0]) { break; }
                    }
                    var s = arr.slice(i, j + 1).join(delim);
                    out.push(s.substr(1, s.length - 2));

        i = j;

                }
                else {parsed_data_array[i]=arr[i];}
            }
            return parsed_data_array;
        }

        return function(text) {
            var lines = text.split(lined);
            for (var i = 0, l = lines.length; i < l; i++) {
                nested_data_array[i] = splitline(lines[i]);
            }
            return nested_data_array ;
        };
    }
});



function generate_product_list_entry(data)
{


 var ret = '<section class="product">\
<div id="product-'+data[0]+'" class="product_inner">\
      <div class="product_slot">\
         ' + data[0] + '   \
        </div>\
        <div class="product_prize">\
         ' + data[2] + ' &euro;\
        </div>\
        <div class="product_image">\
         <img src="img/products/'+data[0]+'/listview.jpg" />\
        </div>\
        <h4 class="product_name">' + data[1] +'</h4>\
       </div>\
</section>';
return ret;
}



function generate_product_details(data)
{


 var ret = '<div class="product_info product_info-'+data[0]+'">\
            <a id="close-product_info-'+data[0]+'" class="close-product_info" href="#"><i class="glyphicon glyphicon-remove"></i></a>\
            <div class="container">\
                <div class="product_info-header">\
                    <div class="product_info-slot">\
                        Slot ' + data[0] +'\
                    </div>\
                    <div class="product_info-prize">\
                        ' +data[2] +' &euro;\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="product_info-image">\
                        <img class="bigimage" src="img/products/'+data[0]+'/1.jpg" />\
                        <div class="product_info-image-thumbs">';
                if(data[3]>1)
                {
                for(var i=1; i<=data[3]; i++)
                 ret+='<img src="img/products/'+data[0]+'/s_'+i+'.jpg" data-fullsize-url="img/products/'+data[0]+'/'+i+'.jpg" />';
                }
                 ret +='</div><!-- product_info-image-thumbs -->\
                    </div><!--  product_info-image -->\
                    <div class="product_info-description">\
                        <h4>'+data[1]+'</h4>\
                        <p>'+data[4]+'</p>\
                    </div>';



                if(data[5])
                {
                        ret +='<div class="product_info-data_sheet"><h4>Features</h4>\
                        <table class="table table-bordered table-condensed table-striped" cellspacing="0" cellpadding="0">';

                        arr=data[5].split(',');
                       for (var i = 0, l = arr.length; i < arr.length; i++)
                       {

                       var cont = arr[i].split(":");
                        ret +='<tr><td>'+cont[0]+'</td><td>'+cont[1]+'</td></tr>';

                        }


                        ret +='</table>\
                        </div><!-- product_info-data_sheet -->';

                }

        ret += '</div><!-- row -->\
            </div><!-- container -->\
        </div><!-- product_info-? -->';













 return ret;

}


var pages_count=1;
var current_page=1;




//////////////////////////////////////////////////////////////////////////////////////////////////////
function csv_fill(json_args)
{
        this.csv_url=json_args["csv_url"];
        $.ajax({

                url: this.csv_url,
                success: function(data)
                {
                        var page_data;
                        json_data = [];

                        var base_url = this.url.split("/");
                        base_url.pop();
                        base_url = base_url.join("/");

                        page_data = jQuery.csv(";")(data);
                        var total_entries = page_data.length;


                        //start in line #1  as #0 is the header
                        for (var i = 1, l = total_entries; i < (l-1); i++)
                        {

                                list_block=generate_product_list_entry(page_data[i]);
                                detail_block=generate_product_details(page_data[i]);

                                // console.log(list_block);
                                //console.log(detail_block);


                                // hackady hack..
                                css_selector="#product_list-inner-1 .row1";
                                if(i>4) css_selector="#product_list-inner-1 .row2";
                                if(i>8) {css_selector="#product_list-inner-2 .row1"; pages_count=2;}
                                if(i>12) css_selector="#product_list-inner-2 .row2";
                                if(i>16){css_selector="#product_list-inner-3 .row1"; pages_count=3;}
                                if(i>20) css_selector="#product_list-inner-3 .row2";
                                if(i>24){css_selector="#product_list-inner-4 .row1"; pages_count=4;}


                                // append element to list in approporiate list and row
                                $(css_selector).append(list_block);


                                //append the info overlays for each product
                                $("body").append(detail_block);

                        }


   // product list
   var productList = $('#product_list'),
      productMainContainer = $('#product_list-container'),
      productContainers = $('.product_list-inner', productList),
      productContainerCount = productContainers.length,
      activeContainer = 0,
      prevButton = $('#go_left'), //.addClass('inactive'),
      nextButton = $('#go_right'),
      products = $('.product'),
      productInfos = $('.product_info');

   $('.product', productMainContainer).click(function (event) {
      event.preventDefault();

      var position = products.index(this),
         productInfo = productInfos[position];

      $(productInfo).addClass('active');
   });

   $('.product_info .close-product_info').click(function (event) {
      event.preventDefault();

      $(this).parent('.product_info').removeClass('active');
   });


   $.each($('.product_info-image'), function (i, elem) {
      $('.product_info-image-thumbs img', $(this)).click(function (event) {
         $(' > img', elem).attr('src', $(this).attr('data-fullsize-url'));
      });
   });

                }
         })
}





$( document ).ready(function() {
   FastClick.attach(document.body);



   csv_fill({csv_url:"data.csv"});


   var productList = $('#product_list'),
      productMainContainer = $('#product_list-container'),
      productContainers = $('.product_list-inner', productList),
      productContainerCount = productContainers.length,
      activeContainer = 0,
      prevButton = $('#go_left').hide(),
      nextButton = $('#go_right'),
      products = $('.product'),
      productInfos = $('.product_info');





   $('#manual-button').on('click',function(){

      $('#manual').addClass('active');

   });

   $('#close-manual').on('click',function(){

      $('#manual').removeClass('active');

   });


   prevButton.click(function (event) {
      event.preventDefault();

      if (activeContainer) {
         activeContainer -= 1;

         productMainContainer.css({
            webkitTransform: 'translate3d(' + -(activeContainer * 1024) + 'px, 0, 0)'
         });

//         nextButton.removeClass('inactive');

	nextButton.show();

         if (!activeContainer) {
//            prevButton.addClass('inactive'); 
            prevButton.hide();		
         }
      }
   });

   nextButton.click(function (event) {
      event.preventDefault();

      if (activeContainer < (productContainerCount - 1)) {
         activeContainer += 1;

         productMainContainer.css({
            webkitTransform: 'translate3d(' + -(activeContainer * 1024) + 'px, 0, 0)'
         });

        // prevButton.removeClass('inactive');
	prevButton.show();
         if (activeContainer == (pages_count-1)) {
          //  nextButton.addClass('inactive');
	nextButton.hide();
         }
      }
   });

   /*$(window).on('touchmove', function (event) {
      event.preventDefault();
   });*/
});

