

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
function buildChart(data) {
  var margin = { top: 20, right: 30, bottom: 30, left: 40 },
    width = 400 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear().range([height, 0]);

  var heightRatio = d3.max(data) / height

  var xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg
    .axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

  var chart = d3
    .select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(
      data.map(function(d) {
        return d.name;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);

    chart
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 100)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      // .text("Frequency");

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.name);
      })
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return height - y(d.value);
      })
      .attr("width", x.rangeBand());
      
}

//bar chart help from https://bost.ocks.org/mike/bar/2/
var width = 800,
  height = 750,
  sens = 0.2,
  focused;

var percentColors = [
  { pct: 0.0, color: { r: 169, g: 169, b: 169 } },
  { pct: 0.5, color: { r: 128, g: 128, b: 128 } },
  { pct: 1.0, color: { r: 0, g: 0, b: 0 } }
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
  // .append("svg")
  // .attr("width", width)
  // .attr("height", height)

//Adding water

svg
  .append("path")
  .datum({ type: "Sphere" })
  .attr("class", "water")
  // .style("fill", "whitesmoke")
  .attr("d", path);

var countryTooltip = d3
    .select(".globe")
    .append("div")
    .attr("class", "countryTooltip"),
  countryList = d3
    .select(".select")
    // .append("select")
    // .attr("name", "countries");

queue()
  .defer(d3.json, "src/data/world-110m.json")
  .defer(d3.tsv, "src/data/world-110m-country-names.tsv")
  .defer(d3.tsv, "src/data/aggregate-scores.tsv")
  .defer(d3.tsv, "src/data/detail-scores.tsv")
  .await(ready);

//Main function

function ready(error, world, countryData, percentData, detailData) {
  const noDataCountries = ["Afghanistan", "Antartica", "Bahamas", "Brunei Darussalam","Burundi",
                          "Central African Republic", "Cuba","Cyprus","Djibouti","Equatorial Guinea",
                          "Eritrea","Falkland Islands (Malvinas)","Fiji","French Southern Territories",
                          "Gabon","Gambia","Greenland","Guinea","Guinea-Bissau","Guyana","Haiti","Iceland",
                          "Iran, Islamic Republic of","Korea, Democratic People's Republic of","Kuwait",
                          "Libya","Luxembourg","New Caledonia","Oman","Palestinian Territory, Occupied",
                          "Papua New Guinea","Puerto Rico","Qatar","Solomon Islands","Somalia","South Sudan",
                          "Sudan","Suriname","Swaziland","Syrian Arab Republic","Taiwan, Province of China",
                          "Timor-Leste","Turkmenistan","United Arab Emirates","Uzbekistan","Vanatu","Western Sahara"];
  var countryPercents = {};
  var percentById = {};
  var countryById = {};
  var countryDetails = {};
    var countries = topojson.feature(world, world.objects.countries).features;

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

    detailData.forEach(function(d) {
      let arr = [];
      arr.push(d.a)
      arr.push(d.b)
      arr.push(d.c)
      arr.push(d.d)
      arr.push(d.e)
      countryDetails[d.name] = arr;
    })

  
  });

  let config = {
    speed: 0.005,
    verticalTilt: -10,
    horizontalTilt: 0
  };


  
  let stopRotation = false;
  let lastElapsed = 0

  const timerGlobeRotation = (elapsed) => {
   
    projection.rotate([
      config.speed * (lastElapsed + elapsed) - 120,
      config.verticalTilt,
      config.horizontalTilt
    ]);
    svg.selectAll("path").attr("d", path);
    if (stopRotation) {
      lastElapsed += elapsed
    }
    return stopRotation
  }
  
  function enableRotation() {
    d3.timer(timerGlobeRotation)
  }
  function stopGlobe() {
    stopRotation = true
    // if (!stopRotation) {
    //   enableRotation();
    // }
  }
  
  enableRotation();

  // setTimeout(stopGlobe, 3000)


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
        d3.select(this).style(
          "fill",
          getColorForPercentage(percentById[d.id])
        );
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
        .on("dragstart", function() {
          stopGlobe();
        })
        .on("drag", function() {
          var rotate = projection.rotate();
          projection.rotate([
            d3.event.x * sens,
            -d3.event.y * sens,
            rotate[2]
          ]);
          svg.selectAll("path").attr("d", path);
          // svg.selectAll(".water").attr("d", path)
          svg.selectAll(".focused").classed("focused", (focused = false));

          // lastElapsed += d3.event.x * sens
          config.verticalTilt = -d3.event.y * sens;
          config.horizontalTilt = rotate[2];
        })
        .on("dragend", function() {
          stopGlobe();
        })
    )

    //Mouse events

    .on("click", function(d) {
      
        let name = countryById[d.id];
        let arr = [];
        let alpha = ["A", "B", "C", "D", "E"]
        countryDetails[name].forEach((val, idx) => {
          if (val === "-") {
            arr.push({name: "data not present", value: 0});
          } else {
            arr.push({name: alpha[idx], value: parseFloat(val)/100});
          }
        });
        const showContentCont = d3.select("div.show-content-cont");
          showContentCont
            .selectAll("*")
            .remove()

        //https://stackoverflow.com/questions/24030267/d3-transition-for-transform-translate-not-working-for-div
        // var startTranslateState = "translate(-300px,0px)";
        // var endTranslateState = "translate(0px,0px)";
        // var translateInterpolator = d3.interpolateString( startTranslateState, endTranslateState );
        // d3.select(".show-content-cont")
        //   .transition()
        //   .styleTween("transform", function(d) {
        //       return translateInterpolator;
        //   })
        //   .transition()
        //   .style("border", "10px solid #798478")
        //   .style("border-radius", "10px") 
        //   .style("background-color", "white")     
            //  d3.select(".show-content")
            //    .transition()
            //    .duration(1000)
            //    .style("background-color", "pink");
        showContentCont
          .append("h1")
          .text(countryById[d.id])
          .append("p")
          .attr("class", "show-content-p")
          .text("The Five Metrics:")
          .append("p")
          .attr("class", "show-content-p")
          .text("A: Proportion of women aged 20-24 years who were married or in a union before age 18")
          .append("p")
          .attr("class", "show-content-p")
          .text("B: Percentage of women (aged 15+ years) who agree that a husband is justified in beating his wife/partner under certain circumstances")
          .append("p")
          .attr("class", "show-content-p")
          .text("C: The extend to which there are legal grounds for abortion")
          .append("p")
          .attr("class", "show-content-p")
          .text("D: Proportion of seats held by women in national parliaments")
          .append("p")
          .attr("class", "show-content-p")
          .text("E: Proportion of ministerial/senior government positions held by women");
        // showContentCont
        //   .append("div")
        //   .text(countryDetails[name].toString());
        showContentCont
          .append("svg")
          .attr("class", "chart")
        buildChart(arr);
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

  d3.select("select").on("change", function(d) {

    
    var rotate = projection.rotate(),
    focusedCountry = country(countries, this),
    p = d3.geo.centroid(focusedCountry);

    let name = countryById[focusedCountry.id];
    let arr = [];
    let alpha = ["A", "B", "C", "D", "E"];
    countryDetails[name].forEach((val, idx) => {
      if (val === "-") {
        arr.push({ name: "data not present", value: 0 });
      } else {
        arr.push({ name: alpha[idx], value: parseFloat(val) / 100 });
      }
    });
    const showContentCont = d3.select("div.show-content-cont");
    showContentCont.selectAll("*").remove();
    showContentCont
      .append("h1")
      .text(countryById[focusedCountry.id])
      .append("p")
      .attr("class", "show-content-p")
      .text("The Five Metrics:")
      .append("p")
      .attr("class", "show-content-p")
      .text(
        "A: Proportion of women aged 20-24 years who were married or in a union before age 18"
      )
      .append("p")
      .attr("class", "show-content-p")
      .text(
        "B: Percentage of women (aged 15+ years) who agree that a husband is justified in beating his wife/partner under certain circumstances"
      )
      .append("p")
      .attr("class", "show-content-p")
      .text("C: The extend to which there are legal grounds for abortion")
      .append("p")
      .attr("class", "show-content-p")
      .text("D: Proportion of seats held by women in national parliaments")
      .append("p")
      .attr("class", "show-content-p")
      .text(
        "E: Proportion of ministerial/senior government positions held by women"
      );
    // showContentCont
    //   .append("div")
    //   .text(countryDetails[name].toString());
    showContentCont.append("svg").attr("class", "chart");
    buildChart(arr);
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
        })
        stopGlobe();
        
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

