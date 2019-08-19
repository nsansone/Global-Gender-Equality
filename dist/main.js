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

/***/ "./src/globe.js":
/*!**********************!*\
  !*** ./src/globe.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var width = 800,
    height = 1000,
    sens = 0.2,
    focused;
var percentColors = [{
  pct: 0.0,
  color: {
    r: 176,
    g: 224,
    b: 230
  }
}, {
  pct: 0.5,
  color: {
    r: 0xff,
    g: 0xff,
    b: 0
  }
}, {
  pct: 1.0,
  color: {
    r: 0x00,
    g: 0xff,
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

var svg = d3.select(".globe").append("svg").attr("width", width).attr("height", height); //Adding water

svg.append("path").datum({
  type: "Sphere"
}).attr("class", "water").style("fill", "pink").attr("d", path);
var countryTooltip = d3.select(".globe").append("div").attr("class", "countryTooltip"),
    countryList = d3.select(".globe").append("select").attr("name", "countries");
queue().defer(d3.json, "src/data/world-110m.json").defer(d3.tsv, "src/data/world-110m-country-names.tsv").defer(d3.tsv, "src/data/aggregate-scores.tsv").await(ready); //Main function

function ready(error, world, countryData, percentData) {
  var countryPercents = {};
  var percentById = {};
  var countryById = {},
      countries = topojson.feature(world, world.objects.countries).features; //Adding countries to select

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
  });
  var config = {
    speed: 0.005,
    verticalTilt: -30,
    horizontalTilt: 0
  }; // function enableRotation() {
  //   d3.timer(function(elapsed) {
  //     projection.rotate([
  //       config.speed * elapsed - 120,
  //       config.verticalTilt,
  //       config.horizontalTilt
  //     ]);
  //     svg.selectAll("path").attr("d", path);
  //   });
  // }

  var rotate = [0.001, 0],
      velocity = [0.013, 0],
      time = Date.now();
  var timer; //make timer global.

  function rotateGlobe() {
    timer = d3.timer(function () {
      var dt = Date.now() - time;
      projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
    });
  }

  function stopGlobe() {
    timer.stop();
  }

  rotateGlobe(); // function disableRotation() {
  //   d3.timer(function(elapsed) {
  //     projection.rotate([
  //       config.speed * elapsed - 120,
  //       config.verticalTilt,
  //       config.horizontalTilt
  //     ]);
  //     svg.selectAll("path").attr("d", path);
  //   });
  // }
  // enableRotation();
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
  }).on("drag", function () {
    var rotate = projection.rotate();
    projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
    svg.selectAll("path").attr("d", path); // svg.selectAll(".water").attr("d", path)

    svg.selectAll(".focused").classed("focused", focused = false);
  })) //Mouse events
  .on("click", function (d) {
    console.log(d);
    console.log(countryById[d.id]);
    var showContent = d3.select("div.show-content");
    showContent.selectAll("*").remove();
    showContent.append("h1").text(countryById[d.id]);
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
    })();
  });

  function country(cnt, sel) {
    for (var i = 0, l = cnt.length; i < l; i++) {
      if (cnt[i].id == sel.value) {
        return cnt[i];
      }
    }
  }
} // var rotationDelay = 3000;
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ3aWR0aCIsImhlaWdodCIsInNlbnMiLCJmb2N1c2VkIiwicGVyY2VudENvbG9ycyIsInBjdCIsImNvbG9yIiwiciIsImciLCJiIiwiZ2V0Q29sb3JGb3JQZXJjZW50YWdlIiwiaSIsImxlbmd0aCIsImxvd2VyIiwidXBwZXIiLCJyYW5nZSIsInJhbmdlUGN0IiwicGN0TG93ZXIiLCJwY3RVcHBlciIsIk1hdGgiLCJmbG9vciIsImpvaW4iLCJjbGlja0NvbG9yIiwicHJvamVjdGlvbiIsImQzIiwiZ2VvIiwib3J0aG9ncmFwaGljIiwic2NhbGUiLCJyb3RhdGUiLCJ0cmFuc2xhdGUiLCJjbGlwQW5nbGUiLCJwYXRoIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImRhdHVtIiwidHlwZSIsInN0eWxlIiwiY291bnRyeVRvb2x0aXAiLCJjb3VudHJ5TGlzdCIsInF1ZXVlIiwiZGVmZXIiLCJqc29uIiwidHN2IiwiYXdhaXQiLCJyZWFkeSIsImVycm9yIiwid29ybGQiLCJjb3VudHJ5RGF0YSIsInBlcmNlbnREYXRhIiwiY291bnRyeVBlcmNlbnRzIiwicGVyY2VudEJ5SWQiLCJjb3VudHJ5QnlJZCIsImNvdW50cmllcyIsInRvcG9qc29uIiwiZmVhdHVyZSIsIm9iamVjdHMiLCJmZWF0dXJlcyIsImZvckVhY2giLCJkIiwiaWQiLCJuYW1lIiwib3B0aW9uIiwidGV4dCIsInByb3BlcnR5IiwicGVyY2VudCIsInBhcnNlRmxvYXQiLCJjb25maWciLCJzcGVlZCIsInZlcnRpY2FsVGlsdCIsImhvcml6b250YWxUaWx0IiwidmVsb2NpdHkiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVyIiwicm90YXRlR2xvYmUiLCJkdCIsInN0b3BHbG9iZSIsInN0b3AiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZW50ZXIiLCJlYWNoIiwiY29uc29sZSIsImxvZyIsImNhbGwiLCJiZWhhdmlvciIsImRyYWciLCJvcmlnaW4iLCJ4IiwieSIsIm9uIiwiZXZlbnQiLCJjbGFzc2VkIiwic2hvd0NvbnRlbnQiLCJyZW1vdmUiLCJwYWdlWCIsInBhZ2VZIiwiZm9jdXNlZENvdW50cnkiLCJjb3VudHJ5IiwicCIsImNlbnRyb2lkIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwidHdlZW4iLCJpbnRlcnBvbGF0ZSIsInQiLCJjbnQiLCJzZWwiLCJsIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2pGQSxJQUFJQSxLQUFLLEdBQUcsR0FBWjtBQUFBLElBQ0VDLE1BQU0sR0FBRyxJQURYO0FBQUEsSUFFRUMsSUFBSSxHQUFHLEdBRlQ7QUFBQSxJQUdFQyxPQUhGO0FBS0EsSUFBSUMsYUFBYSxHQUFHLENBQ2xCO0FBQUVDLEtBQUcsRUFBRSxH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Ozs7Ozs7Ozs7O0FDdlRBO0FBQUE7QUFBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbnZhciB3aWR0aCA9IDgwMCxcbiAgaGVpZ2h0ID0gMTAwMCxcbiAgc2VucyA9IDAuMixcbiAgZm9jdXNlZDtcblxudmFyIHBlcmNlbnRDb2xvcnMgPSBbXG4gIHsgcGN0OiAwLjAsIGNvbG9yOiB7IHI6IDE3NiwgZzogMjI0LCBiOiAyMzAgfSB9LFxuICB7IHBjdDogMC41LCBjb2xvcjogeyByOiAweGZmLCBnOiAweGZmLCBiOiAwIH0gfSxcbiAgeyBwY3Q6IDEuMCwgY29sb3I6IHsgcjogMHgwMCwgZzogMHhmZiwgYjogMCB9IH1cbl07XG5cbnZhciBnZXRDb2xvckZvclBlcmNlbnRhZ2UgPSBmdW5jdGlvbihwY3QpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBwZXJjZW50Q29sb3JzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGlmIChwY3QgPT09IFwiLVwiKSB7XG4gICAgICByZXR1cm4gXCJ3aGl0ZVwiO1xuICAgIH1cbiAgICBpZiAocGN0IDwgcGVyY2VudENvbG9yc1tpXS5wY3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB2YXIgbG93ZXIgPSBwZXJjZW50Q29sb3JzW2kgLSAxXTtcbiAgdmFyIHVwcGVyID0gcGVyY2VudENvbG9yc1tpXTtcbiAgdmFyIHJhbmdlID0gdXBwZXIucGN0IC0gbG93ZXIucGN0O1xuICB2YXIgcmFuZ2VQY3QgPSAocGN0IC0gbG93ZXIucGN0KSAvIHJhbmdlO1xuICB2YXIgcGN0TG93ZXIgPSAxIC0gcmFuZ2VQY3Q7XG4gIHZhciBwY3RVcHBlciA9IHJhbmdlUGN0O1xuICB2YXIgY29sb3IgPSB7XG4gICAgcjogTWF0aC5mbG9vcihsb3dlci5jb2xvci5yICogcGN0TG93ZXIgKyB1cHBlci5jb2xvci5yICogcGN0VXBwZXIpLFxuICAgIGc6IE1hdGguZmxvb3IobG93ZXIuY29sb3IuZyAqIHBjdExvd2VyICsgdXBwZXIuY29sb3IuZyAqIHBjdFVwcGVyKSxcbiAgICBiOiBNYXRoLmZsb29yKGxvd2VyLmNvbG9yLmIgKiBwY3RMb3dlciArIHVwcGVyLmNvbG9yLmIgKiBwY3RVcHBlcilcbiAgfTtcbiAgcmV0dXJuIFwicmdiKFwiICsgW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdLmpvaW4oXCIsXCIpICsgXCIpXCI7XG4gIC8vIG9yIG91dHB1dCBhcyBoZXggaWYgcHJlZmVycmVkXG59O1xuXG4vL2h0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcxMjg2NzUvZnJvbS1ncmVlbi10by1yZWQtY29sb3ItZGVwZW5kLW9uLXBlcmNlbnRhZ2Vcbi8vIGNvbG9yIHBpY2tpbmcgY29kZSB0YWtlbiBmcm9tIGFib3ZlIGxpbmtcbmNvbnN0IGNsaWNrQ29sb3IgPSBnZXRDb2xvckZvclBlcmNlbnRhZ2UoMC4xKTtcbi8vU2V0dGluZyBwcm9qZWN0aW9uXG5cbnZhciBwcm9qZWN0aW9uID0gZDMuZ2VvXG4gIC5vcnRob2dyYXBoaWMoKVxuICAuc2NhbGUoMzUwKVxuICAucm90YXRlKFswLCAwXSlcbiAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSlcbiAgLmNsaXBBbmdsZSg5MCk7XG5cbnZhciBwYXRoID0gZDMuZ2VvLnBhdGgoKS5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4vL1NWRyBjb250YWluZXJcblxudmFyIHN2ZyA9IGQzXG4gIC5zZWxlY3QoXCIuZ2xvYmVcIilcbiAgLmFwcGVuZChcInN2Z1wiKVxuICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4vL0FkZGluZyB3YXRlclxuXG5zdmdcbiAgLmFwcGVuZChcInBhdGhcIilcbiAgLmRhdHVtKHsgdHlwZTogXCJTcGhlcmVcIiB9KVxuICAuYXR0cihcImNsYXNzXCIsIFwid2F0ZXJcIilcbiAgLnN0eWxlKFwiZmlsbFwiLCBcInBpbmtcIilcbiAgLmF0dHIoXCJkXCIsIHBhdGgpO1xuXG52YXIgY291bnRyeVRvb2x0aXAgPSBkM1xuICAgIC5zZWxlY3QoXCIuZ2xvYmVcIilcbiAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImNvdW50cnlUb29sdGlwXCIpLFxuICBjb3VudHJ5TGlzdCA9IGQzXG4gICAgLnNlbGVjdChcIi5nbG9iZVwiKVxuICAgIC5hcHBlbmQoXCJzZWxlY3RcIilcbiAgICAuYXR0cihcIm5hbWVcIiwgXCJjb3VudHJpZXNcIik7XG5cbnF1ZXVlKClcbiAgLmRlZmVyKGQzLmpzb24sIFwic3JjL2RhdGEvd29ybGQtMTEwbS5qc29uXCIpXG4gIC5kZWZlcihkMy50c3YsIFwic3JjL2RhdGEvd29ybGQtMTEwbS1jb3VudHJ5LW5hbWVzLnRzdlwiKVxuICAuZGVmZXIoZDMudHN2LCBcInNyYy9kYXRhL2FnZ3JlZ2F0ZS1zY29yZXMudHN2XCIpXG4gIC5hd2FpdChyZWFkeSk7XG5cbi8vTWFpbiBmdW5jdGlvblxuXG5mdW5jdGlvbiByZWFkeShlcnJvciwgd29ybGQsIGNvdW50cnlEYXRhLCBwZXJjZW50RGF0YSkge1xuICB2YXIgY291bnRyeVBlcmNlbnRzID0ge307XG4gIHZhciBwZXJjZW50QnlJZCA9IHt9O1xuICB2YXIgY291bnRyeUJ5SWQgPSB7fSxcbiAgICBjb3VudHJpZXMgPSB0b3BvanNvbi5mZWF0dXJlKHdvcmxkLCB3b3JsZC5vYmplY3RzLmNvdW50cmllcykuZmVhdHVyZXM7XG5cbiAgLy9BZGRpbmcgY291bnRyaWVzIHRvIHNlbGVjdFxuXG4gIGNvdW50cnlEYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgIGNvdW50cnlCeUlkW2QuaWRdID0gZC5uYW1lO1xuICAgIG9wdGlvbiA9IGNvdW50cnlMaXN0LmFwcGVuZChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udGV4dChkLm5hbWUpO1xuICAgIG9wdGlvbi5wcm9wZXJ0eShcInZhbHVlXCIsIGQuaWQpO1xuXG4gICAgcGVyY2VudERhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgICBpZiAoZC5wZXJjZW50ID09PSBcIi1cIikge1xuICAgICAgICBjb3VudHJ5UGVyY2VudHNbZC5uYW1lXSA9IFwiLVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRyeVBlcmNlbnRzW2QubmFtZV0gPSBwYXJzZUZsb2F0KGQucGVyY2VudCkgLyAxMDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb3VudHJ5RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgIHBlcmNlbnRCeUlkW2QuaWRdID0gY291bnRyeVBlcmNlbnRzW2QubmFtZV07XG4gICAgfSk7XG5cbiAgXG4gIH0pO1xuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBzcGVlZDogMC4wMDUsXG4gICAgdmVydGljYWxUaWx0OiAtMzAsXG4gICAgaG9yaXpvbnRhbFRpbHQ6IDBcbiAgfTtcblxuICAvLyBmdW5jdGlvbiBlbmFibGVSb3RhdGlvbigpIHtcbiAgLy8gICBkMy50aW1lcihmdW5jdGlvbihlbGFwc2VkKSB7XG4gIC8vICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbXG4gIC8vICAgICAgIGNvbmZpZy5zcGVlZCAqIGVsYXBzZWQgLSAxMjAsXG4gIC8vICAgICAgIGNvbmZpZy52ZXJ0aWNhbFRpbHQsXG4gIC8vICAgICAgIGNvbmZpZy5ob3Jpem9udGFsVGlsdFxuICAvLyAgICAgXSk7XG4gIC8vICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIHZhciByb3RhdGUgPSBbMC4wMDEsIDBdLFxuICAgIHZlbG9jaXR5ID0gWzAuMDEzLCAwXSxcbiAgICB0aW1lID0gRGF0ZS5ub3coKTtcbiAgdmFyIHRpbWVyOyAvL21ha2UgdGltZXIgZ2xvYmFsLlxuICBmdW5jdGlvbiByb3RhdGVHbG9iZSgpIHtcbiAgICB0aW1lciA9IGQzLnRpbWVyKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGR0ID0gRGF0ZS5ub3coKSAtIHRpbWU7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbXG4gICAgICAgIHJvdGF0ZVswXSArIHZlbG9jaXR5WzBdICogZHQsXG4gICAgICAgIHJvdGF0ZVsxXSArIHZlbG9jaXR5WzFdICogZHRcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEdsb2JlKCkge1xuICAgIHRpbWVyLnN0b3AoKTtcbiAgfVxuXG4gIHJvdGF0ZUdsb2JlKCk7XG4gIFxuICAvLyBmdW5jdGlvbiBkaXNhYmxlUm90YXRpb24oKSB7XG4gIC8vICAgZDMudGltZXIoZnVuY3Rpb24oZWxhcHNlZCkge1xuICAvLyAgICAgcHJvamVjdGlvbi5yb3RhdGUoW1xuICAvLyAgICAgICBjb25maWcuc3BlZWQgKiBlbGFwc2VkIC0gMTIwLFxuICAvLyAgICAgICBjb25maWcudmVydGljYWxUaWx0LFxuICAvLyAgICAgICBjb25maWcuaG9yaXpvbnRhbFRpbHRcbiAgLy8gICAgIF0pO1xuICAvLyAgICAgc3ZnLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgXG4gIC8vIGVuYWJsZVJvdGF0aW9uKCk7XG5cblxuICAvL0RyYXdpbmcgY291bnRyaWVzIG9uIHRoZSBnbG9iZVxuXG4gIHZhciB3b3JsZCA9IHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJwYXRoLmxhbmRcIilcbiAgICAuZGF0YShjb3VudHJpZXMpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYW5kXCIpXG4gICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgLy8gLnN0eWxlKFwiZmlsbFwiLCApXG5cbiAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkKVxuICAgICAgaWYgKHBlcmNlbnRCeUlkW2QuaWRdID09PSBcIi1cIiB8fCBkLmlkID09PSAtOTkpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKFwiZmlsbFwiLCBcIndoaXRlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgY29sb3Igd2hpdGVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXCJmaWxsXCIsIGdldENvbG9yRm9yUGVyY2VudGFnZShwZXJjZW50QnlJZFtkLmlkXSkpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLy9EcmFnIGV2ZW50XG5cbiAgICAuY2FsbChcbiAgICAgIGQzLmJlaGF2aW9yXG4gICAgICAgIC5kcmFnKClcbiAgICAgICAgLm9yaWdpbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgciA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHsgeDogclswXSAvIHNlbnMsIHk6IC1yWzFdIC8gc2VucyB9O1xuICAgICAgICB9KVxuICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuICAgICAgICAgIHByb2plY3Rpb24ucm90YXRlKFtkMy5ldmVudC54ICogc2VucywgLWQzLmV2ZW50LnkgKiBzZW5zLCByb3RhdGVbMl1dKTtcbiAgICAgICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAvLyBzdmcuc2VsZWN0QWxsKFwiLndhdGVyXCIpLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5mb2N1c2VkXCIpLmNsYXNzZWQoXCJmb2N1c2VkXCIsIChmb2N1c2VkID0gZmFsc2UpKTtcbiAgICAgICAgfSlcbiAgICApXG5cblxuXG4gICAgLy9Nb3VzZSBldmVudHNcblxuICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICBjb25zb2xlLmxvZyhjb3VudHJ5QnlJZFtkLmlkXSk7XG4gICAgICBjb25zdCBzaG93Q29udGVudCA9IGQzLnNlbGVjdChcImRpdi5zaG93LWNvbnRlbnRcIilcbiAgICAgIHNob3dDb250ZW50LnNlbGVjdEFsbChcIipcIikucmVtb3ZlKClcbiAgICAgIHNob3dDb250ZW50LmFwcGVuZChcImgxXCIpLnRleHQoY291bnRyeUJ5SWRbZC5pZF0pO1xuICAgIH0pXG5cbiAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgY291bnRyeVRvb2x0aXBcbiAgICAgICAgLnRleHQoY291bnRyeUJ5SWRbZC5pZF0pXG4gICAgICAgIC5zdHlsZShcImxlZnRcIiwgZDMuZXZlbnQucGFnZVggKyA3ICsgXCJweFwiKVxuICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgLSAxNSArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gICAgfSlcbiAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICBjb3VudHJ5VG9vbHRpcC5zdHlsZShcIm9wYWNpdHlcIiwgMCkuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9KVxuICAgIC5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICBjb3VudHJ5VG9vbHRpcFxuICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgNyArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwidG9wXCIsIGQzLmV2ZW50LnBhZ2VZIC0gMTUgKyBcInB4XCIpO1xuICAgIH0pO1xuXG4gIC8vQ291bnRyeSBmb2N1cyBvbiBvcHRpb24gc2VsZWN0XG5cbiAgZDMuc2VsZWN0KFwic2VsZWN0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpLFxuICAgICAgZm9jdXNlZENvdW50cnkgPSBjb3VudHJ5KGNvdW50cmllcywgdGhpcyksXG4gICAgICBwID0gZDMuZ2VvLmNlbnRyb2lkKGZvY3VzZWRDb3VudHJ5KTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIuZm9jdXNlZFwiKS5jbGFzc2VkKFwiZm9jdXNlZFwiLCAoZm9jdXNlZCA9IGZhbHNlKSk7XG5cbiAgICAvL0dsb2JlIHJvdGF0aW5nXG5cbiAgICAoZnVuY3Rpb24gdHJhbnNpdGlvbigpIHtcbiAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMjUwMClcbiAgICAgICAgLnR3ZWVuKFwicm90YXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByID0gZDMuaW50ZXJwb2xhdGUocHJvamVjdGlvbi5yb3RhdGUoKSwgWy1wWzBdLCAtcFsxXV0pO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyKHQpKTtcbiAgICAgICAgICAgIHN2Z1xuICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgICAgLmNsYXNzZWQoXCJmb2N1c2VkXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pZCA9PSBmb2N1c2VkQ291bnRyeS5pZCA/IChmb2N1c2VkID0gZCkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY291bnRyeShjbnQsIHNlbCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY250Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNudFtpXS5pZCA9PSBzZWwudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNudFtpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gdmFyIHJvdGF0aW9uRGVsYXkgPSAzMDAwO1xuLy8gdmFyIHYwOyAvLyBNb3VzZSBwb3NpdGlvbiBpbiBDYXJ0ZXNpYW4gY29vcmRpbmF0ZXMgYXQgc3RhcnQgb2YgZHJhZyBnZXN0dXJlLlxuLy8gdmFyIHIwOyAvLyBQcm9qZWN0aW9uIHJvdGF0aW9uIGFzIEV1bGVyIGFuZ2xlcyBhdCBzdGFydC5cbi8vIHZhciBxMDsgLy8gUHJvamVjdGlvbiByb3RhdGlvbiBhcyB2ZXJzb3IgYXQgc3RhcnQuXG4vLyB2YXIgbGFzdFRpbWUgPSBkMy5ub3coKTtcbi8vIHZhciBkZWdQZXJNcyA9IGRlZ1BlclNlYyAvIDEwMDA7XG4vLyB2YXIgYXV0b3JvdGF0ZSwgbm93LCBkaWZmLCByb3RhdGlvbjtcblxuLy8gdmFyIGRlZ1BlclNlYyA9IDY7XG4vLyB2YXIgYW5nbGVzID0geyB4OiAtMjAsIHk6IDQwLCB6OiAwIH07XG4vLyBmdW5jdGlvbiBzZXRBbmdsZXMoKSB7XG4vLyAgIHZhciByb3RhdGlvbiA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4vLyAgIHJvdGF0aW9uWzBdID0gYW5nbGVzLnk7XG4vLyAgIHJvdGF0aW9uWzFdID0gYW5nbGVzLng7XG4vLyAgIHJvdGF0aW9uWzJdID0gYW5nbGVzLno7XG4vLyAgIHByb2plY3Rpb24ucm90YXRlKHJvdGF0aW9uKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gc3RhcnRSb3RhdGlvbihkZWxheSkge1xuLy8gICBhdXRvcm90YXRlLnJlc3RhcnQocm90YXRlLCBkZWxheSB8fCAwKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gc3RvcFJvdGF0aW9uKCkge1xuLy8gICBhdXRvcm90YXRlLnN0b3AoKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gZHJhZ2VuZGVkKCkge1xuLy8gICBzdGFydFJvdGF0aW9uKHJvdGF0aW9uRGVsYXkpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiByb3RhdGUoZWxhcHNlZCkge1xuLy8gICBub3cgPSBkMy5ub3coKTtcbi8vICAgZGlmZiA9IG5vdyAtIGxhc3RUaW1lO1xuLy8gICBpZiAoZGlmZiA8IGVsYXBzZWQpIHtcbi8vICAgICByb3RhdGlvbiA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4vLyAgICAgcm90YXRpb25bMF0gKz0gZGlmZiAqIGRlZ1Blck1zO1xuLy8gICAgIHByb2plY3Rpb24ucm90YXRlKHJvdGF0aW9uKTtcbi8vICAgfVxuLy8gICBsYXN0VGltZSA9IG5vdztcbi8vIH1cbi8vIHNldEFuZ2xlcygpO1xuLy8gYXV0b3JvdGF0ZSA9IGQzLnRpbWVyKHJvdGF0ZSk7XG4iLCJpbXBvcnQgZ2xvYmUgZnJvbSAnLi9nbG9iZSciXSwic291cmNlUm9vdCI6IiJ9