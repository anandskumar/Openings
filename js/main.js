var gsKey = "1VVv63RXL_GoV5kfotdMPvjQYT6dgLwiOYjo-HnTT6K4"
var yRows = [];

var source = $("#job-list").html();
var template = Handlebars.compile(source);

function addTeam(team) {
  var html = '<h3 class="accordion-toggle">' + team + '</h3>\n';
  html += '<div class="accordion accordion-content">\n';

  yRows[team].forEach(function(job) {
    html += template(job);
  });
  html += '</div>';
  $("#listings").append(html);
}

function digestInfo(data) {
    var teams = [];
    data.forEach(function(job) {
      var team = job["Sub Team"];
      if (!yRows[team]) {
        teams.push(team);
        yRows[team] = [];
      };
      //Extract just the relevant fields
      var hJob = {
        role: job['Role'],
        description: job['Job Description'],
        hours: job["# of hours per week"],
        contact: job['Contact Email'],
        duration: job['Min Term'],
        pastExp: job['Past experience needed? Y/N'],

        training: job['Training Provided? Y/N']
      };
      //sort jobs in teams specific arrays
      yRows[team].push(hJob);
    });

    teams.sort().forEach(addTeam);

    $('div.accordion').find('.accordion-toggle').click(function(){
      //Expand or collapse this panel
      $(this).next().slideToggle('fast');
    });
}

$(document).ready(Tabletop.init({ key: gsKey,
                 callback: digestInfo,
                 simpleSheet: true }))
