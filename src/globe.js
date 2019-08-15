
var width = 800,
  height = 1000,
  sens = 0.2,
  focused;

var percentColors = [
  { pct: 0.0, color: { r: 176, g: 224, b: 230 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }
];

var getColorForPercentage = function(pct) {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct === "-") {
      return "white";
    }
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
  // or output as hex if preferred
};

//https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
// color picking code taken from above link
const clickColor = getColorForPercentage(0.1);
//Setting projection

var projection = d3.geo
  .orthographic()
  .scale(350)
  .rotate([0, 0])
  .translate([width / 2, height / 2])
  .clipAngle(90);

var path = d3.geo.path().projection(projection);

//SVG container

var svg = d3
  .select(".globe")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//Adding water

svg
  .append("path")
  .datum({ type: "Sphere" })
  .attr("class", "water")
  .style("fill", "pink")
  .attr("d", path);

var countryTooltip = d3
    .select(".globe")
    .append("div")
    .attr("class", "countryTooltip"),
  countryList = d3
    .select(".globe")
    .append("select")
    .attr("name", "countries");

queue()
  .defer(d3.json, "src/data/world-110m.json")
  .defer(d3.tsv, "src/data/world-110m-country-names.tsv")
  .defer(d3.tsv, "src/data/aggregate-scores.tsv")
  .await(ready);

//Main function

function ready(error, world, countryData, percentData) {
  var countryPercents = {};
  var percentById = {};
  var countryById = {},
    countries = topojson.feature(world, world.objects.countries).features;

  //Adding countries to select

  countryData.forEach(function(d) {
    countryById[d.id] = d.name;
    option = countryList.append("option");
    option.text(d.name);
    option.property("value", d.id);

    percentData.forEach(function(d) {
      if (d.percent === "-") {
        countryPercents[d.name] = "-";
      } else {
        countryPercents[d.name] = parseFloat(d.percent) / 100;
      }
    });

    countryData.forEach(function(d) {
      percentById[d.id] = countryPercents[d.name];
    });

  
  });

  const config = {
    speed: 0.005,
    verticalTilt: -30,
    horizontalTilt: 0
  };

  // function enableRotation() {
  //   d3.timer(function(elapsed) {
  //     projection.rotate([
  //       config.speed * elapsed - 120,
  //       config.verticalTilt,
  //       config.horizontalTilt
  //     ]);
  //     svg.selectAll("path").attr("d", path);
  //   });
  // }
  
  // function disableRotation() {
  //   d3.timer(function(elapsed) {
  //     projection.rotate([
  //       config.speed * elapsed - 120,
  //       config.verticalTilt,
  //       config.horizontalTilt
  //     ]);
  //     svg.selectAll("path").attr("d", path);
  //   });
  // }
  
  enableRotation();


  //Drawing countries on the globe

  var world = svg
    .selectAll("path.land")
    .data(countries)
    .enter()
    .append("path")
    .attr("class", "land")
    .attr("d", path)
    // .style("fill", )

    .each(function(d, i) {
      // console.log(d)
      if (percentById[d.id] === "-" || d.id === -99) {
        d3.select(this).style("fill", "white");
        console.log("setting color white");
      } else {
        d3.select(this).style("fill", getColorForPercentage(percentById[d.id]));
      }
    })
    //Drag event

    .call(
      d3.behavior
        .drag()
        .origin(function() {
          var r = projection.rotate();
          return { x: r[0] / sens, y: -r[1] / sens };
        })
        .on("drag", function() {
          var rotate = projection.rotate();
          projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
          svg.selectAll("path").attr("d", path);
          // svg.selectAll(".water").attr("d", path)
          svg.selectAll(".focused").classed("focused", (focused = false));
        })
    )



    //Mouse events

    .on("click", function(d) {
      
      console.log(d);
      console.log(countryById[d.id]);
      const showContent = d3.select("div.show-content")
      showContent.selectAll("*").remove()
      showContent.append("h1").text(countryById[d.id]);
    })

    .on("mouseover", function(d) {
      countryTooltip
        .text(countryById[d.id])
        .style("left", d3.event.pageX + 7 + "px")
        .style("top", d3.event.pageY - 15 + "px")
        .style("display", "block")
        .style("opacity", 1);
    })
    .on("mouseout", function(d) {
      countryTooltip.style("opacity", 0).style("display", "none");
    })
    .on("mousemove", function(d) {
      countryTooltip
        .style("left", d3.event.pageX + 7 + "px")
        .style("top", d3.event.pageY - 15 + "px");
    });

  //Country focus on option select

  d3.select("select").on("change", function() {
    var rotate = projection.rotate(),
      focusedCountry = country(countries, this),
      p = d3.geo.centroid(focusedCountry);

    svg.selectAll(".focused").classed("focused", (focused = false));

    //Globe rotating

    (function transition() {
      d3.transition()
        .duration(2500)
        .tween("rotate", function() {
          var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            svg
              .selectAll("path")
              .attr("d", path)
              .classed("focused", function(d, i) {
                return d.id == focusedCountry.id ? (focused = d) : false;
              });
          };
        });
    })();
  });

  function country(cnt, sel) {
    for (var i = 0, l = cnt.length; i < l; i++) {
      if (cnt[i].id == sel.value) {
        return cnt[i];
      }
    }
  }
}

// var rotationDelay = 3000;
// var v0; // Mouse position in Cartesian coordinates at start of drag gesture.
// var r0; // Projection rotation as Euler angles at start.
// var q0; // Projection rotation as versor at start.
// var lastTime = d3.now();
// var degPerMs = degPerSec / 1000;
// var autorotate, now, diff, rotation;

// var degPerSec = 6;
// var angles = { x: -20, y: 40, z: 0 };
// function setAngles() {
//   var rotation = projection.rotate();
//   rotation[0] = angles.y;
//   rotation[1] = angles.x;
//   rotation[2] = angles.z;
//   projection.rotate(rotation);
// }

// function startRotation(delay) {
//   autorotate.restart(rotate, delay || 0);
// }

// function stopRotation() {
//   autorotate.stop();
// }

// function dragended() {
//   startRotation(rotationDelay);
// }

// function rotate(elapsed) {
//   now = d3.now();
//   diff = now - lastTime;
//   if (diff < elapsed) {
//     rotation = projection.rotate();
//     rotation[0] += diff * degPerMs;
//     projection.rotate(rotation);
//   }
//   lastTime = now;
// }
// setAngles();
// autorotate = d3.timer(rotate);
