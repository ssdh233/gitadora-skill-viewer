import $ from "jquery";
import "regenerator-runtime/runtime";

import { NO_EAM_PATH_VERSIONS } from "../constants";

// eslint-disable-next-line
async function main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION) {
  console.log({ TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION });
  var skill_data = {};

  try {
    if (window.location.hostname != "p.eagate.573.jp") {
      alert(
        "コナミ様のサイト(http://p.eagate.573.jp/)で行ってください。\n\n请在Konami的官方网站(http://p.eagate.573.jp/)上点击书签。\n\nPlease make sure you are on Konami official site(http://p.eagate.573.jp/)."
      );
      return;
    }

    // get profile data
    const [profileData] = await Promise.all([getProfileData()]);

    console.log("profileData", profileData);

    if (!profileData.cardNumber) {
      alert(
        "プレイヤーデータ取得できません。ログインした状態でもう一度試してみてください。\n\n无法取得玩家数据，请检查您是否已经登录。\n\nFailed to fetch player data. Please log in."
      );

      return;
    }

    var SKILL_URLS = [
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p${
        NO_EAM_PATH_VERSIONS.includes(VERSION) ? "/eam" : ""
      }/playdata/skill.html?gtype=gf&stype=0`,
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p${
        NO_EAM_PATH_VERSIONS.includes(VERSION) ? "/eam" : ""
      }/playdata/skill.html?gtype=gf&stype=1`,
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p${
        NO_EAM_PATH_VERSIONS.includes(VERSION) ? "/eam" : ""
      }/playdata/skill.html?gtype=dm&stype=0`,
      `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p${
        NO_EAM_PATH_VERSIONS.includes(VERSION) ? "/eam" : ""
      }/playdata/skill.html?gtype=dm&stype=1`
    ];
    var SKILL_LABEL = ["guitar_other", "guitar_hot", "drum_other", "drum_hot"];

    await Promise.all(
      [0, 1, 2, 3].map(index =>
        getSkillData(SKILL_URLS[index], SKILL_LABEL[index])
      )
    );

    let uploadRes = await $.ajax({
      url: `${SCRIPT_DOMAIN}/graphql`,
      error: handleAjaxError(`${SCRIPT_DOMAIN}/graphql`),
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
            ...profileData,
            guitarSkill: {
              hot: skill_data["guitar_hot"],
              other: skill_data["guitar_other"]
            },
            drumSkill: {
              hot: skill_data["drum_hot"],
              other: skill_data["drum_other"]
            },
            updateDate: getDate()
          }
        }
      })
    });

    if (uploadRes.errors) {
      postError(uploadRes.errors);
    } else {
      window.location = `${TARGET_DOMAIN}/${VERSION}/${uploadRes.data.upload}/g?setLocalStorage=${uploadRes.data.upload}`;
    }
  } catch (error) {
    // unhandled eror
    postError(error);
  }

  // for passing parameters
  async function getSkillData(url, label) {
    await $.ajax({
      url: url,
      error: handleAjaxError(url),
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
        skill_data[label] = {
          point: skill_point.toFixed(2),
          data: skill_data_per_page
        };
      }
    });
  }

  async function getProfileData() {
    var PROFILE_URL = `//p.eagate.573.jp/game/gfdm/gitadora_${VERSION}/p${
      NO_EAM_PATH_VERSIONS.includes(VERSION) ? "/eam" : ""
    }/playdata/profile.html`;

    let profileData = {};
    let resHtml = await $.ajax({
      url: PROFILE_URL,
      error: handleAjaxError(PROFILE_URL)
    });

    var doc = document.implementation.createHTMLDocument("html");
    doc.documentElement.innerHTML = resHtml;

    var playerName = $(doc)
      .find(".profile_name_frame")
      .text();

    var cardNumber = "";
    var gitadoraId = "";

    if (VERSION === "matixx" || VERSION === "tbre") {
      cardNumber = $(doc)
        .find(".common_frame_date")
        .text()
        .substring(10, 26);
    } else {
      cardNumber = $(doc)
        .find("#contents > .maincont > h2")
        .text()
        .match(/[a-zA-Z0-9]+/);
      cardNumber = cardNumber && cardNumber[0];

      gitadoraId = $(doc)
        .find("div.common_frame_date")
        .text()
        .trim();
    }

    profileData.playerName = playerName;
    profileData.cardNumber = cardNumber;
    profileData.gitadoraId = gitadoraId;

    return profileData;
  }

  async function postError(error) {
    if (!error) return;
    console.error(error);

    let errorStr = JSON.stringify(error);
    await $.ajax({
      url: `${SCRIPT_DOMAIN}/graphql`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        query: `
        mutation PostError($version: Version, $error: String, $date: String, $userAgent: String) {
          postError(version: $version, error: $error, date: $date, userAgent: $userAgent)
        }
      `,
        variables: {
          version: VERSION,
          error: errorStr,
          date: getDate(),
          userAgent: window.navigator.userAgent
        }
      }),
      error: () => {
        alert(
          `[failed to report error]\nエラーが発生しました。\n出了点问题。\nYou got an error.\n\n[error message]\n${errorStr}`
        );
      },
      success: () => {
        alert(
          `[error reported]\nエラーが発生しました。\n出了点问题。\nYou got an error.\n\n[error message]\n${errorStr}`
        );
      }
    });
  }

  function handleAjaxError(url) {
    return function(request, status) {
      console.error(`${request.responseText}\n\nstatus: ${status}`);
      postError(`${url}\n\n${request.responseText}\n\nstatus: ${status}`);
    };
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

export default main;
