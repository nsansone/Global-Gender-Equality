/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chart.js":
/*!**********************!*\
  !*** ./src/chart.js ***!
  \**********************/
/*! exports provided: type, buildChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildChart", function() { return buildChart; });
function type(d) {
  d.value = +d.value; // coerce to number

  return d;
}
function buildChart() {
  var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
  var y = d3.scale.linear().range([height, 0]);
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
  var chart = d3.select(".chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  d3.tsv("data.tsv", type, function (error, data) {
    x.domain(data.map(function (d) {
      return d.name;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);
    chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    chart.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Frequency");
    chart.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
      return x(d.name);
    }).attr("y", function (d) {
      return y(d.value);
    }).attr("height", function (d) {
      return height - y(d.value);
    }).attr("width", x.rangeBand());
  });
}

/***/ }),

/***/ "./src/globe.js":
/*!**********************!*\
  !*** ./src/globe.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function type(d) {
  d.value = +d.value; // coerce to number

  return d;
}

function buildChart(data) {
  var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
      width = 400 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
  var y = d3.scale.linear().range([height, 0]);
  var heightRatio = d3.max(data) / height;
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
  var chart = d3.select(".chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  x.domain(data.map(function (d) {
    return d.name;
  }));
  y.domain([0, d3.max(data, function (d) {
    return d.value;
  })]);
  chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
  chart.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 100).attr("dy", ".71em").style("text-anchor", "end"); // .text("Frequency");

  chart.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
    return x(d.name);
  }).attr("y", function (d) {
    return y(d.value);
  }).attr("height", function (d) {
    return height - y(d.value);
  }).attr("width", x.rangeBand());
} //bar chart help from https://bost.ocks.org/mike/bar/2/


var width = 800,
    height = 750,
    sens = 0.2,
    focused;
var percentColors = [{
  pct: 0.0,
  color: {
    r: 169,
    g: 169,
    b: 169
  }
}, {
  pct: 0.5,
  color: {
    r: 128,
    g: 128,
    b: 128
  }
}, {
  pct: 1.0,
  color: {
    r: 0,
    g: 0,
    b: 0
  }
}];

var getColorForPercentage = function getColorForPercentage(pct) {
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
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")"; // or output as hex if preferred
}; //https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
// color picking code taken from above link


var clickColor = getColorForPercentage(0.1); //Setting projection

var projection = d3.geo.orthographic().scale(350).rotate([0, 0]).translate([width / 2, height / 2]).clipAngle(90);
var path = d3.geo.path().projection(projection); //SVG container

var svg = d3.select(".globe"); // .append("svg")
// .attr("width", width)
// .attr("height", height)
//Adding water

svg.append("path").datum({
  type: "Sphere"
}).attr("class", "water") // .style("fill", "whitesmoke")
.attr("d", path);
var countryTooltip = d3.select(".globe").append("div").attr("class", "countryTooltip"),
    countryList = d3.select(".select"); // .append("select")
// .attr("name", "countries");

queue().defer(d3.json, "src/data/world-110m.json").defer(d3.tsv, "src/data/world-110m-country-names.tsv").defer(d3.tsv, "src/data/aggregate-scores.tsv").defer(d3.tsv, "src/data/detail-scores.tsv").await(ready); //Main function

function ready(error, world, countryData, percentData, detailData) {
  var noDataCountries = ["Afghanistan", "Antartica", "Bahamas", "Brunei Darussalam", "Burundi", "Central African Republic", "Cuba", "Cyprus", "Djibouti", "Equatorial Guinea", "Eritrea", "Falkland Islands (Malvinas)", "Fiji", "French Southern Territories", "Gabon", "Gambia", "Greenland", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Iceland", "Iran, Islamic Republic of", "Korea, Democratic People's Republic of", "Kuwait", "Libya", "Luxembourg", "New Caledonia", "Oman", "Palestinian Territory, Occupied", "Papua New Guinea", "Puerto Rico", "Qatar", "Solomon Islands", "Somalia", "South Sudan", "Sudan", "Suriname", "Swaziland", "Syrian Arab Republic", "Taiwan, Province of China", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vanatu", "Western Sahara"];
  var countryPercents = {};
  var percentById = {};
  var countryById = {};
  var countryDetails = {};
  var countries = topojson.feature(world, world.objects.countries).features; //Adding countries to select

  countryData.forEach(function (d) {
    countryById[d.id] = d.name;
    option = countryList.append("option");
    option.text(d.name);
    option.property("value", d.id);
    percentData.forEach(function (d) {
      if (d.percent === "-") {
        countryPercents[d.name] = "-";
      } else {
        countryPercents[d.name] = parseFloat(d.percent) / 100;
      }
    });
    countryData.forEach(function (d) {
      percentById[d.id] = countryPercents[d.name];
    });
    detailData.forEach(function (d) {
      var arr = [];
      arr.push(d.a);
      arr.push(d.b);
      arr.push(d.c);
      arr.push(d.d);
      arr.push(d.e);
      countryDetails[d.name] = arr;
    });
  });
  var config = {
    speed: 0.005,
    verticalTilt: -10,
    horizontalTilt: 0
  };
  var stopRotation = false;
  var lastElapsed = 0;

  var timerGlobeRotation = function timerGlobeRotation(elapsed) {
    projection.rotate([config.speed * (lastElapsed + elapsed) - 120, config.verticalTilt, config.horizontalTilt]);
    svg.selectAll("path").attr("d", path);

    if (stopRotation) {
      lastElapsed += elapsed;
    }

    return stopRotation;
  };

  function enableRotation() {
    d3.timer(timerGlobeRotation);
  }

  function stopGlobe() {
    stopRotation = true; // if (!stopRotation) {
    //   enableRotation();
    // }
  }

  enableRotation(); // setTimeout(stopGlobe, 3000)
  //Drawing countries on the globe

  var world = svg.selectAll("path.land").data(countries).enter().append("path").attr("class", "land").attr("d", path) // .style("fill", )
  .each(function (d, i) {
    // console.log(d)
    if (percentById[d.id] === "-" || d.id === -99) {
      d3.select(this).style("fill", "white");
      console.log("setting color white");
    } else {
      d3.select(this).style("fill", getColorForPercentage(percentById[d.id]));
    }
  }) //Drag event
  .call(d3.behavior.drag().origin(function () {
    var r = projection.rotate();
    return {
      x: r[0] / sens,
      y: -r[1] / sens
    };
  }).on("dragstart", function () {
    stopGlobe();
  }).on("drag", function () {
    var rotate = projection.rotate();
    projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
    svg.selectAll("path").attr("d", path); // svg.selectAll(".water").attr("d", path)

    svg.selectAll(".focused").classed("focused", focused = false); // lastElapsed += d3.event.x * sens

    config.verticalTilt = -d3.event.y * sens;
    config.horizontalTilt = rotate[2];
  }).on("dragend", function () {
    stopGlobe();
  })) //Mouse events
  .on("click", function (d) {
    svg.selectAll(".focused").classed("focused", focused = false);
    d3.select(this).attr("class", "focused");
    var name = countryById[d.id];

    if (noDataCountries.includes(name)) {
      var showContentCont = d3.select("div.show-content-cont");
      showContentCont.selectAll("*").remove();
      showContentCont.append("h1").text(countryById[d.id]).append("p").attr("class", "no-data").text("Data has not been collected for this country in this study");
    } else {
      var arr = [];
      var alpha = ["A", "B", "C", "D", "E"];
      countryDetails[name].forEach(function (val, idx) {
        if (val === "-") {
          arr.push({
            name: "data not present",
            value: 0
          });
        } else {
          arr.push({
            name: alpha[idx],
            value: parseFloat(val) / 100
          });
        }
      });

      var _showContentCont = d3.select("div.show-content-cont");

      _showContentCont.selectAll("*").remove();

      _showContentCont.append("h1").text(countryById[d.id]).append("p").attr("class", "show-content-p").text("The Five Metrics:").append("p").attr("class", "show-content-p").text("A: Proportion of women aged 20-24 years who were married or in a union before age 18").append("p").attr("class", "show-content-p").text("B: Percentage of women (aged 15+ years) who agree that a husband is justified in beating his wife/partner under certain circumstances").append("p").attr("class", "show-content-p").text("C: The extend to which there are legal grounds for abortion").append("p").attr("class", "show-content-p").text("D: Proportion of seats held by women in national parliaments").append("p").attr("class", "show-content-p").text("E: Proportion of ministerial/senior government positions held by women");

      _showContentCont.append("svg").attr("class", "chart");

      buildChart(arr);
    }
  }).on("mouseover", function (d) {
    countryTooltip.text(countryById[d.id]).style("left", d3.event.pageX + 7 + "px").style("top", d3.event.pageY - 15 + "px").style("display", "block").style("opacity", 1);
  }).on("mouseout", function (d) {
    countryTooltip.style("opacity", 0).style("display", "none");
  }).on("mousemove", function (d) {
    countryTooltip.style("left", d3.event.pageX + 7 + "px").style("top", d3.event.pageY - 15 + "px");
  }); //Country focus on option select

  d3.select("select").on("change", function () {
    var rotate = projection.rotate(),
        focusedCountry = country(countries, this),
        p = d3.geo.centroid(focusedCountry);
    var name = countryById[focusedCountry.id];

    if (noDataCountries.includes(name)) {
      var showContentCont = d3.select("div.show-content-cont");
      showContentCont.selectAll("*").remove();
      showContentCont.append("h1").text(countryById[focusedCountry.id]).append("p").attr("class", "no-data").text("Data has not been collected for this country in this study");
    } else {
      var arr = [];
      var alpha = ["A", "B", "C", "D", "E"];
      countryDetails[name].forEach(function (val, idx) {
        if (val === "-") {
          arr.push({
            name: "data not present",
            value: 0
          });
        } else {
          arr.push({
            name: alpha[idx],
            value: parseFloat(val) / 100
          });
        }
      });

      var _showContentCont2 = d3.select("div.show-content-cont");

      _showContentCont2.selectAll("*").remove();

      _showContentCont2.append("h1").text(countryById[focusedCountry.id]).append("p").attr("class", "show-content-p").text("The Five Metrics:").append("p").attr("class", "show-content-p").text("A: Proportion of women aged 20-24 years who were married or in a union before age 18").append("p").attr("class", "show-content-p").text("B: Percentage of women (aged 15+ years) who agree that a husband is justified in beating his wife/partner under certain circumstances").append("p").attr("class", "show-content-p").text("C: The extend to which there are legal grounds for abortion").append("p").attr("class", "show-content-p").text("D: Proportion of seats held by women in national parliaments").append("p").attr("class", "show-content-p").text("E: Proportion of ministerial/senior government positions held by women");

      _showContentCont2.append("svg").attr("class", "chart");

      buildChart(arr);
    }

    svg.selectAll(".focused").classed("focused", focused = false); //Globe rotating

    (function transition() {
      d3.transition().duration(2500).tween("rotate", function () {
        var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
        return function (t) {
          projection.rotate(r(t));
          svg.selectAll("path").attr("d", path).classed("focused", function (d, i) {
            return d.id == focusedCountry.id ? focused = d : false;
          });
        };
      });
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _globe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globe */ "./src/globe.js");
/* harmony import */ var _globe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_globe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart */ "./src/chart.js");



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJ0LmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsidHlwZSIsImQiLCJ2YWx1ZSIsImJ1aWxkQ2hhcnQiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJkMyIsInNjYWxlIiwib3JkaW5hbCIsInJhbmdlUm91bmRCYW5kcyIsInkiLCJsaW5lYXIiLCJyYW5nZSIsInhBeGlzIiwic3ZnIiwiYXhpcyIsIm9yaWVudCIsInlBeGlzIiwidGlja3MiLCJjaGFydCIsInNlbGVjdCIsImF0dHIiLCJhcHBlbmQiLCJ0c3YiLCJlcnJvciIsImRhdGEiLCJkb21haW4iLCJtYXAiLCJuYW1lIiwibWF4IiwiY2FsbCIsInN0eWxlIiwidGV4dCIsInNlbGVjdEFsbCIsImVudGVyIiwicmFuZ2VCYW5kIiwiaGVpZ2h0UmF0aW8iLCJzZW5zIiwiZm9jdXNlZCIsInBlcmNlbnRDb2xvcnMiLCJwY3QiLCJjb2xvciIsInIiLCJnIiwiYiIsImdldENvbG9yRm9yUGVyY2VudGFnZSIsImkiLCJsZW5ndGgiLCJsb3dlciIsInVwcGVyIiwicmFuZ2VQY3QiLCJwY3RMb3dlciIsInBjdFVwcGVyIiwiTWF0aCIsImZsb29yIiwiam9pbiIsImNsaWNrQ29sb3IiLCJwcm9qZWN0aW9uIiwiZ2VvIiwib3J0aG9ncmFwaGljIiwicm90YXRlIiwidHJhbnNsYXRlIiwiY2xpcEFuZ2xlIiwicGF0aCIsImRhdHVtIiwiY291bnRyeVRvb2x0aXAiLCJjb3VudHJ5TGlzdCIsInF1ZXVlIiwiZGVmZXIiLCJqc29uIiwiYXdhaXQiLCJyZWFkeSIsIndvcmxkIiwiY291bnRyeURhdGEiLCJwZXJjZW50RGF0YSIsImRldGFpbERhdGEiLCJub0RhdGFDb3VudHJpZXMiLCJjb3VudHJ5UGVyY2VudHMiLCJwZXJjZW50QnlJZCIsImNvdW50cnlCeUlkIiwiY291bnRyeURldGFpbHMiLCJjb3VudHJpZXMiLCJ0b3BvanNvbiIsImZlYXR1cmUiLCJvYmplY3RzIiwiZmVhdHVyZXMiLCJmb3JFYWNoIiwiaWQiLCJvcHRpb24iLCJwcm9wZXJ0eSIsInBlcmNlbnQiLCJwYXJzZUZsb2F0IiwiYXJyIiwicHVzaCIsImEiLCJjIiwiZSIsImNvbmZpZyIsInNwZWVkIiwidmVydGljYWxUaWx0IiwiaG9yaXpvbnRhbFRpbHQiLCJzdG9wUm90YXRpb24iLCJsYXN0RWxhcHNlZCIsInRpbWVyR2xvYmVSb3RhdGlvbiIsImVsYXBzZWQiLCJlbmFibGVSb3RhdGlvbiIsInRpbWVyIiwic3RvcEdsb2JlIiwiZWFjaCIsImNvbnNvbGUiLCJsb2ciLCJiZWhhdmlvciIsImRyYWciLCJvcmlnaW4iLCJvbiIsImV2ZW50IiwiY2xhc3NlZCIsImluY2x1ZGVzIiwic2hvd0NvbnRlbnRDb250IiwicmVtb3ZlIiwiYWxwaGEiLCJ2YWwiLCJpZHgiLCJwYWdlWCIsInBhZ2VZIiwiZm9jdXNlZENvdW50cnkiLCJjb3VudHJ5IiwicCIsImNlbnRyb2lkIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwidHdlZW4iLCJpbnRlcnBvbGF0ZSIsInQiLCJjbnQiLCJzZWwiLCJsIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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RUQ7O0FBaUZBLFdBQVNtQixPQUFULENBQWlCUSxHQUFqQixFQUFzQkMsR0FBdEIsRUFBMkI7QUFDekIsU0FBSyxJQUFJekYsQ0FBQyxHQUFHLENBQVIsRUFBVzBGLENBQUMsR0FBR0YsR0FBRyxDQUFDdkYsTUFBeEIsRUFBZ0NELENBQUMsR0FBRzBGLENBQXBDLEVBQXVDMUYsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxVQUFJd0YsR0FBRyxDQUFDeEYsQ0FBRCxDQUFILENBQU95QyxFQUFQLElBQWFnRCxHQUFHLENBQUMzSSxLQUFyQixFQUE0QjtBQUMxQixlQUFPMEksR0FBRyxDQUFDeEYsQ0FBRCxDQUFWO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsQzs7Ozs7Ozs7Ozs7O0FDN2REO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHR5cGUoZCkge1xuICBkLnZhbHVlID0gK2QudmFsdWU7IC8vIGNvZXJjZSB0byBudW1iZXJcbiAgcmV0dXJuIGQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDaGFydCgpIHtcbiAgdmFyIG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDMwLCBsZWZ0OiA0MCB9LFxuICAgIHdpZHRoID0gOTYwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgaGVpZ2h0ID0gNTAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgdmFyIHggPSBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2VSb3VuZEJhbmRzKFswLCB3aWR0aF0sIDAuMSk7XG5cbiAgdmFyIHkgPSBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgdmFyIHhBeGlzID0gZDMuc3ZnXG4gICAgLmF4aXMoKVxuICAgIC5zY2FsZSh4KVxuICAgIC5vcmllbnQoXCJib3R0b21cIik7XG5cbiAgdmFyIHlBeGlzID0gZDMuc3ZnXG4gICAgLmF4aXMoKVxuICAgIC5zY2FsZSh5KVxuICAgIC5vcmllbnQoXCJsZWZ0XCIpXG4gICAgLnRpY2tzKDEwLCBcIiVcIik7XG5cbiAgdmFyIGNoYXJ0ID0gZDNcbiAgICAuc2VsZWN0KFwiLmNoYXJ0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICBkMy50c3YoXCJkYXRhLnRzdlwiLCB0eXBlLCBmdW5jdGlvbihlcnJvciwgZGF0YSkge1xuICAgIHguZG9tYWluKFxuICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgfSlcbiAgICApO1xuICAgIHkuZG9tYWluKFtcbiAgICAgIDAsXG4gICAgICBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgIH0pXG4gICAgXSk7XG5cbiAgICBjaGFydFxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAudGV4dChcIkZyZXF1ZW5jeVwiKTtcblxuICAgIGNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKFwiLmJhclwiKVxuICAgICAgLmRhdGEoZGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhclwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHgoZC5uYW1lKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geShkLnZhbHVlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBoZWlnaHQgLSB5KGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgeC5yYW5nZUJhbmQoKSk7XG4gIH0pO1xufVxuIiwiXG5cbmZ1bmN0aW9uIHR5cGUoZCkge1xuICBkLnZhbHVlID0gK2QudmFsdWU7IC8vIGNvZXJjZSB0byBudW1iZXJcbiAgcmV0dXJuIGQ7XG59XG5mdW5jdGlvbiBidWlsZENoYXJ0KGRhdGEpIHtcbiAgdmFyIG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDMwLCBsZWZ0OiA0MCB9LFxuICAgIHdpZHRoID0gNDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgaGVpZ2h0ID0gMjIwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgdmFyIHggPSBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2VSb3VuZEJhbmRzKFswLCB3aWR0aF0sIDAuMSk7XG5cbiAgdmFyIHkgPSBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgdmFyIGhlaWdodFJhdGlvID0gZDMubWF4KGRhdGEpIC8gaGVpZ2h0XG5cbiAgdmFyIHhBeGlzID0gZDMuc3ZnXG4gICAgLmF4aXMoKVxuICAgIC5zY2FsZSh4KVxuICAgIC5vcmllbnQoXCJib3R0b21cIik7XG5cbiAgdmFyIHlBeGlzID0gZDMuc3ZnXG4gICAgLmF4aXMoKVxuICAgIC5zY2FsZSh5KVxuICAgIC5vcmllbnQoXCJsZWZ0XCIpXG4gICAgLnRpY2tzKDEwLCBcIiVcIik7XG5cbiAgdmFyIGNoYXJ0ID0gZDNcbiAgICAuc2VsZWN0KFwiLmNoYXJ0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIHguZG9tYWluKFxuICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgfSlcbiAgICApO1xuICAgIHkuZG9tYWluKFtcbiAgICAgIDAsXG4gICAgICBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgIH0pXG4gICAgXSk7XG5cbiAgICBjaGFydFxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDEwMClcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNzFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAgIC8vIC50ZXh0KFwiRnJlcXVlbmN5XCIpO1xuXG4gICAgY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoXCIuYmFyXCIpXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiYmFyXCIpXG4gICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geChkLm5hbWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5KGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC52YWx1ZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LnJhbmdlQmFuZCgpKTtcbiAgICAgIFxufVxuXG4vL2JhciBjaGFydCBoZWxwIGZyb20gaHR0cHM6Ly9ib3N0Lm9ja3Mub3JnL21pa2UvYmFyLzIvXG52YXIgd2lkdGggPSA4MDAsXG4gIGhlaWdodCA9IDc1MCxcbiAgc2VucyA9IDAuMixcbiAgZm9jdXNlZDtcblxudmFyIHBlcmNlbnRDb2xvcnMgPSBbXG4gIHsgcGN0OiAwLjAsIGNvbG9yOiB7IHI6IDE2OSwgZzogMTY5LCBiOiAxNjkgfSB9LFxuICB7IHBjdDogMC41LCBjb2xvcjogeyByOiAxMjgsIGc6IDEyOCwgYjogMTI4IH0gfSxcbiAgeyBwY3Q6IDEuMCwgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCB9IH1cbl07XG5cbnZhciBnZXRDb2xvckZvclBlcmNlbnRhZ2UgPSBmdW5jdGlvbihwY3QpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBwZXJjZW50Q29sb3JzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGlmIChwY3QgPT09IFwiLVwiKSB7XG4gICAgICByZXR1cm4gXCJ3aGl0ZVwiO1xuICAgIH1cbiAgICBpZiAocGN0IDwgcGVyY2VudENvbG9yc1tpXS5wY3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB2YXIgbG93ZXIgPSBwZXJjZW50Q29sb3JzW2kgLSAxXTtcbiAgdmFyIHVwcGVyID0gcGVyY2VudENvbG9yc1tpXTtcbiAgdmFyIHJhbmdlID0gdXBwZXIucGN0IC0gbG93ZXIucGN0O1xuICB2YXIgcmFuZ2VQY3QgPSAocGN0IC0gbG93ZXIucGN0KSAvIHJhbmdlO1xuICB2YXIgcGN0TG93ZXIgPSAxIC0gcmFuZ2VQY3Q7XG4gIHZhciBwY3RVcHBlciA9IHJhbmdlUGN0O1xuICB2YXIgY29sb3IgPSB7XG4gICAgcjogTWF0aC5mbG9vcihsb3dlci5jb2xvci5yICogcGN0TG93ZXIgKyB1cHBlci5jb2xvci5yICogcGN0VXBwZXIpLFxuICAgIGc6IE1hdGguZmxvb3IobG93ZXIuY29sb3IuZyAqIHBjdExvd2VyICsgdXBwZXIuY29sb3IuZyAqIHBjdFVwcGVyKSxcbiAgICBiOiBNYXRoLmZsb29yKGxvd2VyLmNvbG9yLmIgKiBwY3RMb3dlciArIHVwcGVyLmNvbG9yLmIgKiBwY3RVcHBlcilcbiAgfTtcbiAgcmV0dXJuIFwicmdiKFwiICsgW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdLmpvaW4oXCIsXCIpICsgXCIpXCI7XG4gIC8vIG9yIG91dHB1dCBhcyBoZXggaWYgcHJlZmVycmVkXG59O1xuXG4vL2h0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcxMjg2NzUvZnJvbS1ncmVlbi10by1yZWQtY29sb3ItZGVwZW5kLW9uLXBlcmNlbnRhZ2Vcbi8vIGNvbG9yIHBpY2tpbmcgY29kZSB0YWtlbiBmcm9tIGFib3ZlIGxpbmtcbmNvbnN0IGNsaWNrQ29sb3IgPSBnZXRDb2xvckZvclBlcmNlbnRhZ2UoMC4xKTtcbi8vU2V0dGluZyBwcm9qZWN0aW9uXG5cbnZhciBwcm9qZWN0aW9uID0gZDMuZ2VvXG4gIC5vcnRob2dyYXBoaWMoKVxuICAuc2NhbGUoMzUwKVxuICAucm90YXRlKFswLCAwXSlcbiAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSlcbiAgLmNsaXBBbmdsZSg5MCk7XG5cbnZhciBwYXRoID0gZDMuZ2VvLnBhdGgoKS5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4vL1NWRyBjb250YWluZXJcblxudmFyIHN2ZyA9IGQzXG4gIC5zZWxlY3QoXCIuZ2xvYmVcIilcbiAgLy8gLmFwcGVuZChcInN2Z1wiKVxuICAvLyAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAvLyAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cbi8vQWRkaW5nIHdhdGVyXG5cbnN2Z1xuICAuYXBwZW5kKFwicGF0aFwiKVxuICAuZGF0dW0oeyB0eXBlOiBcIlNwaGVyZVwiIH0pXG4gIC5hdHRyKFwiY2xhc3NcIiwgXCJ3YXRlclwiKVxuICAvLyAuc3R5bGUoXCJmaWxsXCIsIFwid2hpdGVzbW9rZVwiKVxuICAuYXR0cihcImRcIiwgcGF0aCk7XG5cbnZhciBjb3VudHJ5VG9vbHRpcCA9IGQzXG4gICAgLnNlbGVjdChcIi5nbG9iZVwiKVxuICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwiY291bnRyeVRvb2x0aXBcIiksXG4gIGNvdW50cnlMaXN0ID0gZDNcbiAgICAuc2VsZWN0KFwiLnNlbGVjdFwiKVxuICAgIC8vIC5hcHBlbmQoXCJzZWxlY3RcIilcbiAgICAvLyAuYXR0cihcIm5hbWVcIiwgXCJjb3VudHJpZXNcIik7XG5cbnF1ZXVlKClcbiAgLmRlZmVyKGQzLmpzb24sIFwic3JjL2RhdGEvd29ybGQtMTEwbS5qc29uXCIpXG4gIC5kZWZlcihkMy50c3YsIFwic3JjL2RhdGEvd29ybGQtMTEwbS1jb3VudHJ5LW5hbWVzLnRzdlwiKVxuICAuZGVmZXIoZDMudHN2LCBcInNyYy9kYXRhL2FnZ3JlZ2F0ZS1zY29yZXMudHN2XCIpXG4gIC5kZWZlcihkMy50c3YsIFwic3JjL2RhdGEvZGV0YWlsLXNjb3Jlcy50c3ZcIilcbiAgLmF3YWl0KHJlYWR5KTtcblxuLy9NYWluIGZ1bmN0aW9uXG5cbmZ1bmN0aW9uIHJlYWR5KGVycm9yLCB3b3JsZCwgY291bnRyeURhdGEsIHBlcmNlbnREYXRhLCBkZXRhaWxEYXRhKSB7XG4gIGNvbnN0IG5vRGF0YUNvdW50cmllcyA9IFtcIkFmZ2hhbmlzdGFuXCIsIFwiQW50YXJ0aWNhXCIsIFwiQmFoYW1hc1wiLCBcIkJydW5laSBEYXJ1c3NhbGFtXCIsXCJCdXJ1bmRpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIFwiQ3ViYVwiLFwiQ3lwcnVzXCIsXCJEamlib3V0aVwiLFwiRXF1YXRvcmlhbCBHdWluZWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFcml0cmVhXCIsXCJGYWxrbGFuZCBJc2xhbmRzIChNYWx2aW5hcylcIixcIkZpamlcIixcIkZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdhYm9uXCIsXCJHYW1iaWFcIixcIkdyZWVubGFuZFwiLFwiR3VpbmVhXCIsXCJHdWluZWEtQmlzc2F1XCIsXCJHdXlhbmFcIixcIkhhaXRpXCIsXCJJY2VsYW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBvZlwiLFwiS29yZWEsIERlbW9jcmF0aWMgUGVvcGxlJ3MgUmVwdWJsaWMgb2ZcIixcIkt1d2FpdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxpYnlhXCIsXCJMdXhlbWJvdXJnXCIsXCJOZXcgQ2FsZWRvbmlhXCIsXCJPbWFuXCIsXCJQYWxlc3RpbmlhbiBUZXJyaXRvcnksIE9jY3VwaWVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGFwdWEgTmV3IEd1aW5lYVwiLFwiUHVlcnRvIFJpY29cIixcIlFhdGFyXCIsXCJTb2xvbW9uIElzbGFuZHNcIixcIlNvbWFsaWFcIixcIlNvdXRoIFN1ZGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiU3VkYW5cIixcIlN1cmluYW1lXCIsXCJTd2F6aWxhbmRcIixcIlN5cmlhbiBBcmFiIFJlcHVibGljXCIsXCJUYWl3YW4sIFByb3ZpbmNlIG9mIENoaW5hXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGltb3ItTGVzdGVcIixcIlR1cmttZW5pc3RhblwiLFwiVW5pdGVkIEFyYWIgRW1pcmF0ZXNcIixcIlV6YmVraXN0YW5cIixcIlZhbmF0dVwiLFwiV2VzdGVybiBTYWhhcmFcIl07XG4gIHZhciBjb3VudHJ5UGVyY2VudHMgPSB7fTtcbiAgdmFyIHBlcmNlbnRCeUlkID0ge307XG4gIHZhciBjb3VudHJ5QnlJZCA9IHt9O1xuICB2YXIgY291bnRyeURldGFpbHMgPSB7fTtcbiAgICB2YXIgY291bnRyaWVzID0gdG9wb2pzb24uZmVhdHVyZSh3b3JsZCwgd29ybGQub2JqZWN0cy5jb3VudHJpZXMpLmZlYXR1cmVzO1xuXG4gIC8vQWRkaW5nIGNvdW50cmllcyB0byBzZWxlY3RcblxuICBjb3VudHJ5RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICBjb3VudHJ5QnlJZFtkLmlkXSA9IGQubmFtZTtcbiAgICBvcHRpb24gPSBjb3VudHJ5TGlzdC5hcHBlbmQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnRleHQoZC5uYW1lKTtcbiAgICBvcHRpb24ucHJvcGVydHkoXCJ2YWx1ZVwiLCBkLmlkKTtcblxuICAgIHBlcmNlbnREYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKGQucGVyY2VudCA9PT0gXCItXCIpIHtcbiAgICAgICAgY291bnRyeVBlcmNlbnRzW2QubmFtZV0gPSBcIi1cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50cnlQZXJjZW50c1tkLm5hbWVdID0gcGFyc2VGbG9hdChkLnBlcmNlbnQpIC8gMTAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY291bnRyeURhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgICBwZXJjZW50QnlJZFtkLmlkXSA9IGNvdW50cnlQZXJjZW50c1tkLm5hbWVdO1xuICAgIH0pO1xuXG4gICAgZGV0YWlsRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgIGFyci5wdXNoKGQuYSlcbiAgICAgIGFyci5wdXNoKGQuYilcbiAgICAgIGFyci5wdXNoKGQuYylcbiAgICAgIGFyci5wdXNoKGQuZClcbiAgICAgIGFyci5wdXNoKGQuZSlcbiAgICAgIGNvdW50cnlEZXRhaWxzW2QubmFtZV0gPSBhcnI7XG4gICAgfSlcblxuICBcbiAgfSk7XG5cbiAgbGV0IGNvbmZpZyA9IHtcbiAgICBzcGVlZDogMC4wMDUsXG4gICAgdmVydGljYWxUaWx0OiAtMTAsXG4gICAgaG9yaXpvbnRhbFRpbHQ6IDBcbiAgfTtcblxuXG4gIFxuICBsZXQgc3RvcFJvdGF0aW9uID0gZmFsc2U7XG4gIGxldCBsYXN0RWxhcHNlZCA9IDBcblxuICBjb25zdCB0aW1lckdsb2JlUm90YXRpb24gPSAoZWxhcHNlZCkgPT4ge1xuICAgXG4gICAgcHJvamVjdGlvbi5yb3RhdGUoW1xuICAgICAgY29uZmlnLnNwZWVkICogKGxhc3RFbGFwc2VkICsgZWxhcHNlZCkgLSAxMjAsXG4gICAgICBjb25maWcudmVydGljYWxUaWx0LFxuICAgICAgY29uZmlnLmhvcml6b250YWxUaWx0XG4gICAgXSk7XG4gICAgc3ZnLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgaWYgKHN0b3BSb3RhdGlvbikge1xuICAgICAgbGFzdEVsYXBzZWQgKz0gZWxhcHNlZFxuICAgIH1cbiAgICByZXR1cm4gc3RvcFJvdGF0aW9uXG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGVuYWJsZVJvdGF0aW9uKCkge1xuICAgIGQzLnRpbWVyKHRpbWVyR2xvYmVSb3RhdGlvbilcbiAgfVxuICBmdW5jdGlvbiBzdG9wR2xvYmUoKSB7XG4gICAgc3RvcFJvdGF0aW9uID0gdHJ1ZVxuICAgIC8vIGlmICghc3RvcFJvdGF0aW9uKSB7XG4gICAgLy8gICBlbmFibGVSb3RhdGlvbigpO1xuICAgIC8vIH1cbiAgfVxuICBcbiAgZW5hYmxlUm90YXRpb24oKTtcblxuICAvLyBzZXRUaW1lb3V0KHN0b3BHbG9iZSwgMzAwMClcblxuXG4gIC8vRHJhd2luZyBjb3VudHJpZXMgb24gdGhlIGdsb2JlXG4gIFxuICB2YXIgd29ybGQgPSBzdmdcbiAgICAuc2VsZWN0QWxsKFwicGF0aC5sYW5kXCIpXG4gICAgLmRhdGEoY291bnRyaWVzKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibGFuZFwiKVxuICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuXG4gICAgLy8gLnN0eWxlKFwiZmlsbFwiLCApXG5cbiAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkKVxuICAgICAgaWYgKHBlcmNlbnRCeUlkW2QuaWRdID09PSBcIi1cIiB8fCBkLmlkID09PSAtOTkpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKFwiZmlsbFwiLCBcIndoaXRlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgY29sb3Igd2hpdGVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXG4gICAgICAgICAgXCJmaWxsXCIsXG4gICAgICAgICAgZ2V0Q29sb3JGb3JQZXJjZW50YWdlKHBlcmNlbnRCeUlkW2QuaWRdKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pXG4gICAgLy9EcmFnIGV2ZW50XG5cbiAgICAuY2FsbChcbiAgICAgIGQzLmJlaGF2aW9yXG4gICAgICAgIC5kcmFnKClcbiAgICAgICAgLm9yaWdpbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgciA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHsgeDogclswXSAvIHNlbnMsIHk6IC1yWzFdIC8gc2VucyB9O1xuICAgICAgICB9KVxuICAgICAgICAub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RvcEdsb2JlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgcHJvamVjdGlvbi5yb3RhdGUoW1xuICAgICAgICAgICAgZDMuZXZlbnQueCAqIHNlbnMsXG4gICAgICAgICAgICAtZDMuZXZlbnQueSAqIHNlbnMsXG4gICAgICAgICAgICByb3RhdGVbMl1cbiAgICAgICAgICBdKTtcbiAgICAgICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAvLyBzdmcuc2VsZWN0QWxsKFwiLndhdGVyXCIpLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5mb2N1c2VkXCIpLmNsYXNzZWQoXCJmb2N1c2VkXCIsIChmb2N1c2VkID0gZmFsc2UpKTtcblxuICAgICAgICAgIC8vIGxhc3RFbGFwc2VkICs9IGQzLmV2ZW50LnggKiBzZW5zXG4gICAgICAgICAgY29uZmlnLnZlcnRpY2FsVGlsdCA9IC1kMy5ldmVudC55ICogc2VucztcbiAgICAgICAgICBjb25maWcuaG9yaXpvbnRhbFRpbHQgPSByb3RhdGVbMl07XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImRyYWdlbmRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RvcEdsb2JlKCk7XG4gICAgICAgIH0pXG4gICAgKVxuXG4gICAgLy9Nb3VzZSBldmVudHNcblxuICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5mb2N1c2VkXCIpLmNsYXNzZWQoXCJmb2N1c2VkXCIsIChmb2N1c2VkID0gZmFsc2UpKTtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoXCJjbGFzc1wiLCBcImZvY3VzZWRcIik7XG4gICAgICAgIGxldCBuYW1lID0gY291bnRyeUJ5SWRbZC5pZF07XG4gICAgICAgIGlmIChub0RhdGFDb3VudHJpZXMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zdCBzaG93Q29udGVudENvbnQgPSBkMy5zZWxlY3QoXCJkaXYuc2hvdy1jb250ZW50LWNvbnRcIik7XG4gICAgICAgICAgc2hvd0NvbnRlbnRDb250LnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gICAgICAgICAgIHNob3dDb250ZW50Q29udFxuICAgICAgICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuICAgICAgICAgICAgIC50ZXh0KGNvdW50cnlCeUlkW2QuaWRdKVxuICAgICAgICAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIm5vLWRhdGFcIilcbiAgICAgICAgICAgICAudGV4dChcIkRhdGEgaGFzIG5vdCBiZWVuIGNvbGxlY3RlZCBmb3IgdGhpcyBjb3VudHJ5IGluIHRoaXMgc3R1ZHlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgICAgbGV0IGFscGhhID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIl1cbiAgICAgICAgY291bnRyeURldGFpbHNbbmFtZV0uZm9yRWFjaCgodmFsLCBpZHgpID0+IHtcbiAgICAgICAgICBpZiAodmFsID09PSBcIi1cIikge1xuICAgICAgICAgICAgYXJyLnB1c2goe25hbWU6IFwiZGF0YSBub3QgcHJlc2VudFwiLCB2YWx1ZTogMH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnIucHVzaCh7bmFtZTogYWxwaGFbaWR4XSwgdmFsdWU6IHBhcnNlRmxvYXQodmFsKS8xMDB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzaG93Q29udGVudENvbnQgPSBkMy5zZWxlY3QoXCJkaXYuc2hvdy1jb250ZW50LWNvbnRcIik7XG4gICAgICAgIHNob3dDb250ZW50Q29udFxuICAgICAgICAgIC5zZWxlY3RBbGwoXCIqXCIpXG4gICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgIHNob3dDb250ZW50Q29udFxuICAgICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuICAgICAgICAgIC50ZXh0KGNvdW50cnlCeUlkW2QuaWRdKVxuICAgICAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNob3ctY29udGVudC1wXCIpXG4gICAgICAgICAgLnRleHQoXCJUaGUgRml2ZSBNZXRyaWNzOlwiKVxuICAgICAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNob3ctY29udGVudC1wXCIpXG4gICAgICAgICAgLnRleHQoXCJBOiBQcm9wb3J0aW9uIG9mIHdvbWVuIGFnZWQgMjAtMjQgeWVhcnMgd2hvIHdlcmUgbWFycmllZCBvciBpbiBhIHVuaW9uIGJlZm9yZSBhZ2UgMThcIilcbiAgICAgICAgICAuYXBwZW5kKFwicFwiKVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzaG93LWNvbnRlbnQtcFwiKVxuICAgICAgICAgIC50ZXh0KFwiQjogUGVyY2VudGFnZSBvZiB3b21lbiAoYWdlZCAxNSsgeWVhcnMpIHdobyBhZ3JlZSB0aGF0IGEgaHVzYmFuZCBpcyBqdXN0aWZpZWQgaW4gYmVhdGluZyBoaXMgd2lmZS9wYXJ0bmVyIHVuZGVyIGNlcnRhaW4gY2lyY3Vtc3RhbmNlc1wiKVxuICAgICAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNob3ctY29udGVudC1wXCIpXG4gICAgICAgICAgLnRleHQoXCJDOiBUaGUgZXh0ZW5kIHRvIHdoaWNoIHRoZXJlIGFyZSBsZWdhbCBncm91bmRzIGZvciBhYm9ydGlvblwiKVxuICAgICAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNob3ctY29udGVudC1wXCIpXG4gICAgICAgICAgLnRleHQoXCJEOiBQcm9wb3J0aW9uIG9mIHNlYXRzIGhlbGQgYnkgd29tZW4gaW4gbmF0aW9uYWwgcGFybGlhbWVudHNcIilcbiAgICAgICAgICAuYXBwZW5kKFwicFwiKVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzaG93LWNvbnRlbnQtcFwiKVxuICAgICAgICAgIC50ZXh0KFwiRTogUHJvcG9ydGlvbiBvZiBtaW5pc3RlcmlhbC9zZW5pb3IgZ292ZXJubWVudCBwb3NpdGlvbnMgaGVsZCBieSB3b21lblwiKTtcbiAgICAgICAgc2hvd0NvbnRlbnRDb250XG4gICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJjaGFydFwiKVxuICAgICAgICBidWlsZENoYXJ0KGFycik7XG4gICAgfX0pXG4gIFxuXG4gICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIGNvdW50cnlUb29sdGlwXG4gICAgICAgIC50ZXh0KGNvdW50cnlCeUlkW2QuaWRdKVxuICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgNyArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwidG9wXCIsIGQzLmV2ZW50LnBhZ2VZIC0gMTUgKyBcInB4XCIpXG4gICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgIH0pXG4gICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgY291bnRyeVRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIDApLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfSlcbiAgICAub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgY291bnRyeVRvb2x0aXBcbiAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBkMy5ldmVudC5wYWdlWCArIDcgKyBcInB4XCIpXG4gICAgICAgIC5zdHlsZShcInRvcFwiLCBkMy5ldmVudC5wYWdlWSAtIDE1ICsgXCJweFwiKTtcbiAgICB9KTtcblxuICAvL0NvdW50cnkgZm9jdXMgb24gb3B0aW9uIHNlbGVjdFxuXG4gIGQzLnNlbGVjdChcInNlbGVjdFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHsgXG4gICAgdmFyIHJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCksXG4gICAgZm9jdXNlZENvdW50cnkgPSBjb3VudHJ5KGNvdW50cmllcywgdGhpcyksXG4gICAgcCA9IGQzLmdlby5jZW50cm9pZChmb2N1c2VkQ291bnRyeSk7XG5cbiAgICBsZXQgbmFtZSA9IGNvdW50cnlCeUlkW2ZvY3VzZWRDb3VudHJ5LmlkXTtcbiAgICBpZiAobm9EYXRhQ291bnRyaWVzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgY29uc3Qgc2hvd0NvbnRlbnRDb250ID0gZDMuc2VsZWN0KFwiZGl2LnNob3ctY29udGVudC1jb250XCIpO1xuICAgICAgICAgIHNob3dDb250ZW50Q29udC5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICBzaG93Q29udGVudENvbnRcbiAgICAgICAgICAgICAuYXBwZW5kKFwiaDFcIilcbiAgICAgICAgICAgICAudGV4dChjb3VudHJ5QnlJZFtmb2N1c2VkQ291bnRyeS5pZF0pXG4gICAgICAgICAgICAgLmFwcGVuZChcInBcIilcbiAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibm8tZGF0YVwiKVxuICAgICAgICAgICAgIC50ZXh0KFwiRGF0YSBoYXMgbm90IGJlZW4gY29sbGVjdGVkIGZvciB0aGlzIGNvdW50cnkgaW4gdGhpcyBzdHVkeVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICBsZXQgYXJyID0gW107XG4gICAgbGV0IGFscGhhID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIl07XG4gICAgY291bnRyeURldGFpbHNbbmFtZV0uZm9yRWFjaCgodmFsLCBpZHgpID0+IHtcbiAgICAgIGlmICh2YWwgPT09IFwiLVwiKSB7XG4gICAgICAgIGFyci5wdXNoKHsgbmFtZTogXCJkYXRhIG5vdCBwcmVzZW50XCIsIHZhbHVlOiAwIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2goeyBuYW1lOiBhbHBoYVtpZHhdLCB2YWx1ZTogcGFyc2VGbG9hdCh2YWwpIC8gMTAwIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNob3dDb250ZW50Q29udCA9IGQzLnNlbGVjdChcImRpdi5zaG93LWNvbnRlbnQtY29udFwiKTtcbiAgICBzaG93Q29udGVudENvbnQuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICBzaG93Q29udGVudENvbnRcbiAgICAgIC5hcHBlbmQoXCJoMVwiKVxuICAgICAgLnRleHQoY291bnRyeUJ5SWRbZm9jdXNlZENvdW50cnkuaWRdKVxuICAgICAgLmFwcGVuZChcInBcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzaG93LWNvbnRlbnQtcFwiKVxuICAgICAgLnRleHQoXCJUaGUgRml2ZSBNZXRyaWNzOlwiKVxuICAgICAgLmFwcGVuZChcInBcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzaG93LWNvbnRlbnQtcFwiKVxuICAgICAgLnRleHQoXG4gICAgICAgIFwiQTogUHJvcG9ydGlvbiBvZiB3b21lbiBhZ2VkIDIwLTI0IHllYXJzIHdobyB3ZXJlIG1hcnJpZWQgb3IgaW4gYSB1bmlvbiBiZWZvcmUgYWdlIDE4XCJcbiAgICAgIClcbiAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic2hvdy1jb250ZW50LXBcIilcbiAgICAgIC50ZXh0KFxuICAgICAgICBcIkI6IFBlcmNlbnRhZ2Ugb2Ygd29tZW4gKGFnZWQgMTUrIHllYXJzKSB3aG8gYWdyZWUgdGhhdCBhIGh1c2JhbmQgaXMganVzdGlmaWVkIGluIGJlYXRpbmcgaGlzIHdpZmUvcGFydG5lciB1bmRlciBjZXJ0YWluIGNpcmN1bXN0YW5jZXNcIlxuICAgICAgKVxuICAgICAgLmFwcGVuZChcInBcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzaG93LWNvbnRlbnQtcFwiKVxuICAgICAgLnRleHQoXCJDOiBUaGUgZXh0ZW5kIHRvIHdoaWNoIHRoZXJlIGFyZSBsZWdhbCBncm91bmRzIGZvciBhYm9ydGlvblwiKVxuICAgICAgLmFwcGVuZChcInBcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzaG93LWNvbnRlbnQtcFwiKVxuICAgICAgLnRleHQoXCJEOiBQcm9wb3J0aW9uIG9mIHNlYXRzIGhlbGQgYnkgd29tZW4gaW4gbmF0aW9uYWwgcGFybGlhbWVudHNcIilcbiAgICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic2hvdy1jb250ZW50LXBcIilcbiAgICAgIC50ZXh0KFxuICAgICAgICBcIkU6IFByb3BvcnRpb24gb2YgbWluaXN0ZXJpYWwvc2VuaW9yIGdvdmVybm1lbnQgcG9zaXRpb25zIGhlbGQgYnkgd29tZW5cIlxuICAgICAgKTtcbiAgICAgIHNob3dDb250ZW50Q29udC5hcHBlbmQoXCJzdmdcIikuYXR0cihcImNsYXNzXCIsIFwiY2hhcnRcIik7XG4gICAgICBidWlsZENoYXJ0KGFycik7XG4gICAgfVxuICAgIHN2Zy5zZWxlY3RBbGwoXCIuZm9jdXNlZFwiKS5jbGFzc2VkKFwiZm9jdXNlZFwiLCAoZm9jdXNlZCA9IGZhbHNlKSk7XG5cbiAgICAvL0dsb2JlIHJvdGF0aW5nXG5cbiAgICAoZnVuY3Rpb24gdHJhbnNpdGlvbigpIHtcbiAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMjUwMClcbiAgICAgICAgLnR3ZWVuKFwicm90YXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByID0gZDMuaW50ZXJwb2xhdGUocHJvamVjdGlvbi5yb3RhdGUoKSwgWy1wWzBdLCAtcFsxXV0pO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyKHQpKTtcbiAgICAgICAgICAgIHN2Z1xuICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgICAgLmNsYXNzZWQoXCJmb2N1c2VkXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pZCA9PSBmb2N1c2VkQ291bnRyeS5pZCA/IChmb2N1c2VkID0gZCkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgc3RvcEdsb2JlKCk7XG4gICAgICAgIFxuICAgIH0pKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNvdW50cnkoY250LCBzZWwpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNudC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjbnRbaV0uaWQgPT0gc2VsLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBjbnRbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbiIsImltcG9ydCBnbG9iZSBmcm9tICcuL2dsb2JlJ1xuaW1wb3J0IGNoYXJ0IGZyb20gJy4vY2hhcnQnIl0sInNvdXJjZVJvb3QiOiIifQ==