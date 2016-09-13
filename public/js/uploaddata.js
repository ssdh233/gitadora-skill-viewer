var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

if (window.location.hostname == "p.eagate.573.jp") {
  var urls = [
    "http://p.eagate.573.jp/game/gfdm/gitadora_tb/p/eam/playdata/skill.html?gtype=gf&stype=0",
    "http://p.eagate.573.jp/game/gfdm/gitadora_tb/p/eam/playdata/skill.html?gtype=gf&stype=1",
    "http://p.eagate.573.jp/game/gfdm/gitadora_tb/p/eam/playdata/skill.html?gtype=dm&stype=0",
    "http://p.eagate.573.jp/game/gfdm/gitadora_tb/p/eam/playdata/skill.html?gtype=dm&stype=1"
  ];

  var label = [
    "guitar_other",
    "guitar_hot",
    "drum_other",
    "drum_hot" 
  ];

  var profile_data = {};
  var skill_data = {};

  // ajax count
  var count = 0;

  // get profile data
  var url = "http://p.eagate.573.jp/game/gfdm/gitadora_tb/p/eam/playdata/profile.html";
  $.ajax({
    url: url,
    async: false,
    success: function(html) {
      var doc = document.implementation.createHTMLDocument("html");
      doc.documentElement.innerHTML = html;

      var player_name = $(doc).find(".profile_name_frame").text();
      var card_number = $(doc).find(".common_frame_date").text().substring(10,26);

      profile_data["player_name"] = player_name;
      profile_data["card_number"] = card_number;
    }
  });

  for (var i=0;i<4;i++) {
    extract_data(urls[i], label[i]);
  }

  // for passing parameters
  function extract_data(url, label) {
    $.ajax({
      url: url,
      success: function(html) {
        var doc = document.implementation.createHTMLDocument("html");
        doc.documentElement.innerHTML = html;

        var skill_table = $(doc).find(".skill_table_tb");
        var lines = skill_table.children().eq(1).children();

        var skill_data_per_page = [];
        var skill_point = 0;
        for (var i=0;i<25;i++) {
          var current_line = lines.eq(i);
          var name = current_line.find("a.text_link").eq(0).text();
          // part: G, B, D
          var part = current_line.find("div.music_seq_box > div").eq(0).attr('class').substring(14,15);
          // diff: BAS, ADV, EXT, MAS
          var diff = current_line.find("div.music_seq_box > div").eq(1).attr('class').substring(14,17);

          var skill_value = current_line.find("td.skill_cell").text();
          skill_value = skill_value.substring(0, skill_value.length - 8).trim();
          var achive_value = current_line.find("td.achive_cell").text().trim();
          var diff_value = current_line.find("td.diff_cell").text().trim();

          skill_data_per_page.push({
            name: name,
            part: part,
            diff: diff,
            skill_value: skill_value,
            achive_value: achive_value,
            diff_value: diff_value
          });
          skill_point += parseFloat(skill_value);
        }
        count++;
        skill_data[label] = {
          point: skill_point.toFixed(2),
          data: skill_data_per_page
        }
      },
      complete: function() {
        if (count === 4) {
          $.ajax({
            url: "https://gitadora-skill-viewer.herokuapp.com/upload",
            //url: "http://127.0.0.1:3000/upload",
            method: "POST",
            data: {
              card_number: profile_data["card_number"],
              player_name: profile_data["player_name"],
              guitar: {
                hot: skill_data["guitar_hot"],
                other: skill_data["guitar_other"]
              },
              drum: {
                hot: skill_data["drum_hot"],
                other: skill_data["drum_other"]
              }
            },
            success: function(data){
              console.log(data);
              if (data.status === 0) {
                location = "https://gitadora-skill-viewer.herokuapp.com/" + data.message + "/guitar";
              }
            }
          });
        }
      }
    });
  }
} else {
  alert("コナミ様のサイトhttp://p.eagate.573.jp/で行ってください。");
}
