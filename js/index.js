$(function($) {
  var years = {
    '1986': {
      '6': [
        {
          name: "Birth",
        },
      ]
    },
    '1989': {
      '6': [
        {
          name: "PC",
          type: "Game",
        },
      ]
    },
    '1993': {
      '1': [
        {
          name: "Primary School",
        },
      ]
    },
    '1995': {
      '12': [
        {
          name: "SNES",
          type: "Game",
        },
      ]
    },
    '1999': {
      '1': [
        {
          name: "High School",
        },
      ]
    },
    '2002': {
      '6': [
        {
          name: "PS2",
          type: "Game",
        },
      ]
    },
    '2004': {
      '5': [
        {
          name: "University",
        },
      ]
    },
    '2005': {
      '12': [
        {
          name: "NDS",
          type: "Game",
        },
      ]
    },
    '2007': {
      '8': [
        {
          name: "Wii",
          type: "Game",
        },
      ]
    },
    '2010': {
      '7': [
        {
          name: "Graduation",
        },
      ],
      '8': [
        {
          name: "Work",
        },
      ]
    },
    '2012': {
      '12': [
        {
          name: "WiiU",
          type: "Game",
        },
      ]
    },
    '2014': {
      '5': [
        {
          name: "Pixiv",
        },
      ]
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
        id: 'month-'+m,
      });
      m_el = $(m_tpl);
      m_el.appendTo(y_el);
    }
    for(m in years[y]){
      y_el.find('.month[data-month='+m+']').removeClass('empty').html(years[y][m][0]['name']);
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

