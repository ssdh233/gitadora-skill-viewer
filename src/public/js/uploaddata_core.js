var script = document.createElement("script");
script.src = "//code.jquery.com/jquery-1.12.4.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

function handleAjaxError(request, status) {
  // TODO write link to user voice page into this message
  alert(`${request.responseText}\n\nstatus: ${status}`);
}

// TODO change to use promise and await
async function main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION) {
  if (window.location.hostname != "p.eagate.573.jp") {
    alert(
      "コナミ様のサイト(http://p.eagate.573.jp/)で行ってください。\n\n请在Konami的官方网站(http://p.eagate.573.jp/)上点击书签。\n\nPlease make sure you are on Konami official site(http://p.eagate.573.jp/)."
    );
  } else {
    var SKILL_URLS = [
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p/eam/playdata/skill.html?gtype=gf&stype=0`,
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p/eam/playdata/skill.html?gtype=gf&stype=1`,
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p/eam/playdata/skill.html?gtype=dm&stype=0`,
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p/eam/playdata/skill.html?gtype=dm&stype=1`
    ];
    var SKILL_LABEL = ["guitar_other", "guitar_hot", "drum_other", "drum_hot"];

    var PROFILE_URL = `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p/eam/playdata/profile.html`;

    var profile_data = {};
    var skill_data = {};
    var song_data = {};

    // ajax count
    var count = 0;

    // get profile data
    $.ajax({
      url: PROFILE_URL,
      async: false,
      error: handleAjaxError,
      success: function(html) {
        var doc = document.implementation.createHTMLDocument("html");
        doc.documentElement.innerHTML = html;

        var player_name = $(doc)
          .find(".profile_name_frame")
          .text();

        var card_number = "";
        var gitadora_id = "";

        if (VERSION === "exchain") {
          card_number = $(doc)
            .find("#contents > .maincont > h2")
            .text()
            .match(/[a-zA-Z0-9]+/);
          card_number = card_number && card_number[0];

          gitadora_id = $(doc)
            .find("div.common_frame_date")
            .text()
            .trim();
        } else {
          card_number = $(doc)
            .find(".common_frame_date")
            .text()
            .substring(10, 26);
        }

        profile_data["player_name"] = player_name;
        profile_data["card_number"] = card_number;
        profile_data["gitadora_id"] = gitadora_id;
      }
    });

    const [gfSharedSongs, dmSharedSongs] = await Promise.all([
      getSharedSongData("gf"),
      getSharedSongData("dm")
    ]);

    song_data = {
      g: gfSharedSongs,
      d: dmSharedSongs
    };

    if (profile_data["card_number"]) {
      for (var i = 0; i < 4; i++) {
        getSkillData(SKILL_URLS[i], SKILL_LABEL[i]);
      }
    } else {
      // TODO write link to user voice page into this message
      alert(
        "プレイヤーデータ取得できません。ログインした状態でもう一度試してみてください。\n\n无法取得玩家数据，请检查您是否已经登录。\n\nFailed to fetch player data. Please log in."
      );
    }
  }

  async function getSharedSongData(type) {
    // get shared song data
    const resHtml = await $.ajax({
      url: `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p/eam/setting/recommend.html?gtype=${type}`
    });

    var doc = document.implementation.createHTMLDocument("html");
    doc.documentElement.innerHTML = resHtml;

    const songs = $(doc)
      .find("#contents table.music_table_tb tr > td.music_cell")
      .map((i, el) =>
        $(el)
          .text()
          .trim()
      )
      .toArray();

    return songs;
  }

  // for passing parameters
  function getSkillData(url, label) {
    $.ajax({
      url: url,
      error: handleAjaxError,
      success: function(html) {
        var doc = document.implementation.createHTMLDocument("html");
        doc.documentElement.innerHTML = html;

        var skill_table = $(doc).find(".skill_table_tb");
        var lines = skill_table
          .children()
          .eq(1)
          .children();

        var skill_data_per_page = [];
        var skill_point = 0;
        for (var i = 0; i < 25; i++) {
          try {
            var current_line = lines.eq(i);
            var name = current_line
              .find("a.text_link")
              .eq(0)
              .text();
            // part: G, B, D
            var part = current_line
              .find("div.music_seq_box > div")
              .eq(0)
              .attr("class")
              .substring(14, 15);
            // diff: BAS, ADV, EXT, MAS
            var diff = current_line
              .find("div.music_seq_box > div")
              .eq(1)
              .attr("class")
              .substring(14, 17);

            var skill_value = current_line.find("td.skill_cell").text();
            skill_value = skill_value
              .substring(0, skill_value.length - 8)
              .trim();
            var achive_value = current_line
              .find("td.achive_cell")
              .text()
              .trim();
            var diff_value = current_line
              .find("td.diff_cell")
              .text()
              .trim();

            skill_data_per_page.push({
              name: name,
              part: part,
              diff: diff,
              skill_value: skill_value,
              achive_value: achive_value,
              diff_value: diff_value
            });
            skill_point += parseFloat(skill_value);
          } catch (error) {
            // when the form is not fully filled, ignore error
            break;
          }
        }
        count++;
        skill_data[label] = {
          point: skill_point.toFixed(2),
          data: skill_data_per_page
        };
      },
      complete: function() {
        if (count === 4) {
          $.ajax({
            url: `${SCRIPT_DOMAIN}/graphql`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
              query: `
                mutation Upload($version: Version, $data: UserInput) {
                  upload(version: $version, data: $data)
                }
              `,
              variables: {
                version: VERSION,
                data: {
                  cardNumber: profile_data["card_number"],
                  gitadoraId: profile_data["gitadora_id"],
                  playerName: profile_data["player_name"],
                  guitarSkill: {
                    hot: skill_data["guitar_hot"],
                    other: skill_data["guitar_other"]
                  },
                  drumSkill: {
                    hot: skill_data["drum_hot"],
                    other: skill_data["drum_other"]
                  },
                  sharedSongs: {
                    guitar: song_data.g,
                    drum: song_data.d
                  },
                  updateDate: getDate()
                }
              }
            }),
            success: function(res) {
              if (res.errors) {
                console.error(res.errors);
              } else {
                location = `${TARGET_DOMAIN}/${VERSION}/${
                  res.data.upload
                }/g?setLocalStorage=${res.data.upload}`;
              }
            }
          });
        }
      }
    });
  }
}

function getDate() {
  var date = new Date();
  var mm = date.getMinutes();
  var hh = date.getHours();
  var DD = date.getDate();
  var MM = date.getMonth() + 1;
  var YYYY = date.getFullYear();

  if (mm < 10) {
    mm = `0${mm}`;
  }

  if (hh < 10) {
    hh = `0${hh}`;
  }

  if (DD < 10) {
    DD = `0${DD}`;
  }

  if (MM < 10) {
    MM = `0${MM}`;
  }

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
}
