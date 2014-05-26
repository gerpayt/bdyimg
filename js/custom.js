
    (function ($) {
      var handler = null,
          page = 1,
          path = '/',
          isLoading = false;

      // Prepare layout options.
      var options = {
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('#tiles'), // Optional, used for some extra CSS styling
        offset: 2, // Optional, the distance between grid items
        itemWidth: 210 // Optional, the width of a grid item
      };
      $('#about-box').hide();
      $.ajax({
        url: 'dir',
        dataType: 'json',
        success: function(data){
		  var html = $('#nav').html()
		  for (i in data){
            var name = data[i].substr(data[i].lastIndexOf('/')+1)
            if (name == '' ) name ='首页'
		    html += '<li class="dirs" data-path="' + data[i] + '">' + name + '</li>';
          }
          html += '<li id="about"><strong>关于</strong></li>';
		  $('#nav').html(html);

          $("#about").click(function(){
            $('#tiles').hide();
            $('#loader').hide();
            $('#more').hide();
            $('#about-box').show();
            return false;
          });

    	  $('#nav li.dirs').click(function(){
            //console.log($(this).data('path'));
            path = $(this).data('path');
            page = 1;
            $('#tiles').empty();
            $('#tiles').css('height','0px');
            $('#tiles').show();
            $('#loader').show();
            $('#more').show();
            $('#about-box').hide();

            window.scrollTo(0,0);
            loadData();
          });
        }

      });

      $("#more_click").click(function(){
          loadData();
          return false;
      });

      /**
       * When scrolled all the way to the bottom, add more tiles.
       */
      function onScroll(event) {
        // Only check when we're not still waiting for data.
        if(!isLoading) {
          // Check if we're within 100 pixels of the bottom edge of the broser window.
          var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
          if(closeToBottom) {
            loadData();
          }
        }
      };

      /**
       * Refreshes the layout.
       */
      function applyLayout() {
        options.container.imagesLoaded(function() {
          // Create a new layout handler when images have loaded.
          handler = $('#tiles li');
          handler.wookmark(options);
        });
      };

      /**
       * Loads data from the API.
       */
      function loadData() {
        isLoading = true;
        $('#loaderCircle').show();

        $.ajax({
          url: 'get',
          dataType: 'json',
          data: {path: path, page: page}, // Page parameter to make sure we load new data
          success: onLoadData
        });
      };

      /**
       * Receives data from the API, creates HTML for images and updates the layout
       */
      function onLoadData(data) {
        isLoading = false;
        $('#loaderCircle').hide();

        // Increment page index for future calls.
        page++;

        // Create HTML for the images.
        var html = '';
        var i=0, length=data.length, image;
        for(; i<length; i++) {
          image = data[i];
          html += '<li>';

          html += '<a href="'+ image.src +'" data-lightbox="roadtrip">';
          // Image tag (preview in Wookmark are 200px wide, so we calculate the height based on that).
          html += '<img src="'+image.thumb+'" width="200">';

          html += '</a>';
          // Image title.
          html += '<p>'+image.title+'</p>';

          html += '</li>';
        }

        // Add image HTML to the page.
        $('#tiles').append(html);
        //$("img.lazy").show().lazyload();

        // Apply layout.
        applyLayout();
      };

      // Capture scroll event.
      $(document).bind('scroll', onScroll);

      // Load first data from the API.
      loadData();
    })(jQuery);
