$( document ).ready(function() {
   FastClick.attach(document.body);

   // product list
   var productList = $('#product_list'),
      productMainContainer = $('#product_list-container'),
      productContainers = $('.product_list-inner', productList),
      productContainerCount = productContainers.length,
      activeContainer = 0,
      prevButton = $('#go_left').addClass('inactive'),
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

   $('#manual-button').on('click',function(){

      $('#manual').addClass('active');

   });

   $('#close-manual').on('click',function(){

      $('#manual').removeClass('active');

   });

   $.each($('.product_info-image'), function (i, elem) {
      $('.product_info-image-thumbs img', $(this)).click(function (event) {
         $(' > img', elem).attr('src', $(this).attr('data-fullsize-url'));
      });
   });

   prevButton.click(function (event) {
      event.preventDefault();

      if (activeContainer) {
         activeContainer -= 1;

         productMainContainer.css({
            webkitTransform: 'translate3d(' + -(activeContainer * 1024) + 'px, 0, 0)'
         });

         nextButton.removeClass('inactive');

         if (!activeContainer) {
            prevButton.addClass('inactive');
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

         prevButton.removeClass('inactive');

         if (activeContainer == (productContainerCount - 1)) {
            nextButton.addClass('inactive');
         }
      }
   });

   /*$(window).on('touchmove', function (event) {
      event.preventDefault();
   });*/
});

