$(function($) {
  var years = {
    '1986': {
      '6': "Birth",
    },
    '1989': {
      '6': "Start PC Games",
    },
    '1993': {
      '1': "Primary School",
    },
    '1995': {
      '12': "SNES GET",
    },
    '1999': {
      '1': "High School",
    },
    '2002': {
      '6': "PS2 GET",
    },
    '2004': {
      '5': "University"
    },
    '2005': {
      '12': "NDS GET",
    },
    '2005': {
      '3': "ねこだ!",
    },
    '2006': {
      '3': "ねこが...",
      '4': "...",
    },
    '2007': {
      '8': "Wii GET",
    },
    '2008': {
      '6': "PS3 GET",
    },
    '2010': {
      '7': "Graduation",
      '8': "First Job",
    },
    '2012': {
      '12': "WiiU GET",
    },
    '2013': {
      '4': "3DS GET",
    },
    '2014': {
      '5': "Pixiv",
    },
  };
  var y_prev = 0;
  for(var y in years){
    var y_num = parseInt(y);
    var y_diff = y_num - y_prev;
    var y_tpl, y_empty, y_el;
    if(y_prev != 0 && y_diff > 1){
      for(var x = 1; x < y_diff; x++){
        y_empty = y_prev + x;
        y_tpl = Handlebars.compile($('#year-tpl').html())({
          y_num: y_empty,
          id: 'year-'+y_empty,
        });
        y_el = $(y_tpl).addClass('empty');
        y_el.appendTo($('#years'));
      }
    }
    y_tpl = Handlebars.compile($('#year-tpl').html())({
      y_num: y,
      id: 'year-'+y,
    });
    y_el = $(y_tpl);
    y_el.appendTo($('#years'));

    var m, m_tpl, m_el;
    for(m = 1; m < 13; m++){
      m_tpl = Handlebars.compile($('#month-tpl').html())({
        m_num: m,
        id: 'year-'+ y_el.data('year')+ '-month-'+m,
      });
      m_el = $(m_tpl);
      m_el.appendTo(y_el);
    }
    for(m in years[y]){
      y_el.find('.month[data-month='+m+']').removeClass('empty').html(years[y][m]);
    }

    // done.
    y_prev = y_num;
  }

  for(var age = 0; age <= 28; age ++){
    var age_tpl = Handlebars.compile($('#age-tpl').html())({
      age: age,
    });
    var age_el = $(age_tpl);
    age_el.appendTo($('#age'));
  }

  var updateArrow = function(){
    var arrow_el = $('#arrow');
    var arrow = arrow_el.offset().top + arrow_el.height()/2;
    var year = 1986;
    $('.item').each(function(index, el){
      var i_top = $(el).offset().top;
      var i_bot = i_top + $(el).height();
      if(arrow >= i_top && arrow < i_bot){
        $(el).addClass('active');
        if($(el).hasClass('year')){
          year = $(el).data('year');
        }
      } else {
        $(el).removeClass('active');
      }
    });
    $('.age').removeClass('active');
    $('.age[data-age='+(year-1986)+']').addClass('active');
  }
  updateArrow();
  $(window).on('scroll', function(e){
    updateArrow();
  });
});

