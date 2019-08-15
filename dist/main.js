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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ3aWR0aCIsImhlaWdodCIsInNlbnMiLCJmb2N1c2VkIiwicGVyY2VudENvbG9ycyIsInBjdCIsImNvbG9yIiwiciIsImciLCJiIiwiZ2V0Q29sb3JGb3JQZXJjZW50YWdlIiwiaSIsImxlbmd0aCIsImxvd2VyIiwidXBwZXIiLCJyYW5nZSIsInJhbmdlUGN0IiwicGN0TG93ZXIiLCJwY3RVcHBlciIsIk1hdGgiLCJmbG9vciIsImpvaW4iLCJjbGlja0NvbG9yIiwicHJvamVjdGlvbiIsImQzIiwiZ2VvIiwib3J0aG9ncmFwaGljIiwic2NhbGUiLCJyb3RhdGUiLCJ0cmFuc2xhdGUiLCJjbGlwQW5nbGUiLCJwYXRoIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImRhdHVtIiwidHlwZSIsInN0eWxlIiwiY291bnRyeVRvb2x0aXAiLCJjb3VudHJ5TGlzdCIsInF1ZXVlIiwiZGVmZXIiLCJqc29uIiwidHN2IiwiYXdhaXQiLCJyZWFkeSIsImVycm9yIiwid29ybGQiLCJjb3VudHJ5RGF0YSIsInBlcmNlbnREYXRhIiwiY291bnRyeVBlcmNlbnRzIiwicGVyY2VudEJ5SWQiLCJjb3VudHJ5QnlJZCIsImNvdW50cmllcyIsInRvcG9qc29uIiwiZmVhdHVyZSIsIm9iamVjdHMiLCJmZWF0dXJlcyIsImZvckVhY2giLCJkIiwiaWQiLCJuYW1lIiwib3B0aW9uIiwidGV4dCIsInByb3BlcnR5IiwicGVyY2VudCIsInBhcnNlRmxvYXQiLCJjb25maWciLCJzcGVlZCIsInZlcnRpY2FsVGlsdCIsImhvcml6b250YWxUaWx0Iiwic2VsZWN0QWxsIiwiZGF0YSIsImVudGVyIiwiZWFjaCIsImNvbnNvbGUiLCJsb2ciLCJjYWxsIiwiYmVoYXZpb3IiLCJkcmFnIiwib3JpZ2luIiwieCIsInkiLCJvbiIsImV2ZW50IiwiY2xhc3NlZCIsInNob3dDb250ZW50IiwicmVtb3ZlIiwicGFnZVgiLCJwYWdlWSIsImZvY3VzZWRDb3VudHJ5IiwiY291bnRyeSIsInAiLCJjZW50cm9pZCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInR3ZWVuIiwiaW50ZXJwb2xhdGUiLCJ0IiwiY250Iiwic2VsIiwibCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNqRkEsSUFBSUEsS0FBSyxHQUFHLEdBQVo7QUFBQSxJQUNFQyxNQUFNLEdBQUcsSUFEWDtBQUFBLElBRUVDLElBQUksR0FBRyxHQUZUO0FBQUEsSUFHRUMsT0FIRjtBQUtBLElBQUlDLGFBQWEsR0FBRyxDQUNsQjtBQUFFQyxLQUFHLEVBQUUsR0FBUDtBQUFZQyxPQUFLLEVBQUU7QUFBRUMsS0FBQyxFQUFFLEdBQUw7QUFBVUMsS0FBQyxFQUFFLEdBQWI7QUFBa0JDLEtBQUMsRUFB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SUFBYXdDLEdBQUcsQ0FBQ0UsS0FBckIsRUFBNEI7QUFDMUIsZUFBT0gsR0FBRyxDQUFDekYsQ0FBRCxDQUFWO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7QUNuU0E7QUFBQTtBQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxudmFyIHdpZHRoID0gODAwLFxuICBoZWlnaHQgPSAxMDAwLFxuICBzZW5zID0gMC4yLFxuICBmb2N1c2VkO1xuXG52YXIgcGVyY2VudENvbG9ycyA9IFtcbiAgeyBwY3Q6IDAuMCwgY29sb3I6IHsgcjogMTc2LCBnOiAyMjQsIGI6IDIzMCB9IH0sXG4gIHsgcGN0OiAwLjUsIGNvbG9yOiB7IHI6IDB4ZmYsIGc6IDB4ZmYsIGI6IDAgfSB9LFxuICB7IHBjdDogMS4wLCBjb2xvcjogeyByOiAweDAwLCBnOiAweGZmLCBiOiAwIH0gfVxuXTtcblxudmFyIGdldENvbG9yRm9yUGVyY2VudGFnZSA9IGZ1bmN0aW9uKHBjdCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IHBlcmNlbnRDb2xvcnMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgaWYgKHBjdCA9PT0gXCItXCIpIHtcbiAgICAgIHJldHVybiBcIndoaXRlXCI7XG4gICAgfVxuICAgIGlmIChwY3QgPCBwZXJjZW50Q29sb3JzW2ldLnBjdCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHZhciBsb3dlciA9IHBlcmNlbnRDb2xvcnNbaSAtIDFdO1xuICB2YXIgdXBwZXIgPSBwZXJjZW50Q29sb3JzW2ldO1xuICB2YXIgcmFuZ2UgPSB1cHBlci5wY3QgLSBsb3dlci5wY3Q7XG4gIHZhciByYW5nZVBjdCA9IChwY3QgLSBsb3dlci5wY3QpIC8gcmFuZ2U7XG4gIHZhciBwY3RMb3dlciA9IDEgLSByYW5nZVBjdDtcbiAgdmFyIHBjdFVwcGVyID0gcmFuZ2VQY3Q7XG4gIHZhciBjb2xvciA9IHtcbiAgICByOiBNYXRoLmZsb29yKGxvd2VyLmNvbG9yLnIgKiBwY3RMb3dlciArIHVwcGVyLmNvbG9yLnIgKiBwY3RVcHBlciksXG4gICAgZzogTWF0aC5mbG9vcihsb3dlci5jb2xvci5nICogcGN0TG93ZXIgKyB1cHBlci5jb2xvci5nICogcGN0VXBwZXIpLFxuICAgIGI6IE1hdGguZmxvb3IobG93ZXIuY29sb3IuYiAqIHBjdExvd2VyICsgdXBwZXIuY29sb3IuYiAqIHBjdFVwcGVyKVxuICB9O1xuICByZXR1cm4gXCJyZ2IoXCIgKyBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl0uam9pbihcIixcIikgKyBcIilcIjtcbiAgLy8gb3Igb3V0cHV0IGFzIGhleCBpZiBwcmVmZXJyZWRcbn07XG5cbi8vaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzEyODY3NS9mcm9tLWdyZWVuLXRvLXJlZC1jb2xvci1kZXBlbmQtb24tcGVyY2VudGFnZVxuLy8gY29sb3IgcGlja2luZyBjb2RlIHRha2VuIGZyb20gYWJvdmUgbGlua1xuY29uc3QgY2xpY2tDb2xvciA9IGdldENvbG9yRm9yUGVyY2VudGFnZSgwLjEpO1xuLy9TZXR0aW5nIHByb2plY3Rpb25cblxudmFyIHByb2plY3Rpb24gPSBkMy5nZW9cbiAgLm9ydGhvZ3JhcGhpYygpXG4gIC5zY2FsZSgzNTApXG4gIC5yb3RhdGUoWzAsIDBdKVxuICAudHJhbnNsYXRlKFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdKVxuICAuY2xpcEFuZ2xlKDkwKTtcblxudmFyIHBhdGggPSBkMy5nZW8ucGF0aCgpLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cbi8vU1ZHIGNvbnRhaW5lclxuXG52YXIgc3ZnID0gZDNcbiAgLnNlbGVjdChcIi5nbG9iZVwiKVxuICAuYXBwZW5kKFwic3ZnXCIpXG4gIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbi8vQWRkaW5nIHdhdGVyXG5cbnN2Z1xuICAuYXBwZW5kKFwicGF0aFwiKVxuICAuZGF0dW0oeyB0eXBlOiBcIlNwaGVyZVwiIH0pXG4gIC5hdHRyKFwiY2xhc3NcIiwgXCJ3YXRlclwiKVxuICAuc3R5bGUoXCJmaWxsXCIsIFwicGlua1wiKVxuICAuYXR0cihcImRcIiwgcGF0aCk7XG5cbnZhciBjb3VudHJ5VG9vbHRpcCA9IGQzXG4gICAgLnNlbGVjdChcIi5nbG9iZVwiKVxuICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwiY291bnRyeVRvb2x0aXBcIiksXG4gIGNvdW50cnlMaXN0ID0gZDNcbiAgICAuc2VsZWN0KFwiLmdsb2JlXCIpXG4gICAgLmFwcGVuZChcInNlbGVjdFwiKVxuICAgIC5hdHRyKFwibmFtZVwiLCBcImNvdW50cmllc1wiKTtcblxucXVldWUoKVxuICAuZGVmZXIoZDMuanNvbiwgXCJzcmMvZGF0YS93b3JsZC0xMTBtLmpzb25cIilcbiAgLmRlZmVyKGQzLnRzdiwgXCJzcmMvZGF0YS93b3JsZC0xMTBtLWNvdW50cnktbmFtZXMudHN2XCIpXG4gIC5kZWZlcihkMy50c3YsIFwic3JjL2RhdGEvYWdncmVnYXRlLXNjb3Jlcy50c3ZcIilcbiAgLmF3YWl0KHJlYWR5KTtcblxuLy9NYWluIGZ1bmN0aW9uXG5cbmZ1bmN0aW9uIHJlYWR5KGVycm9yLCB3b3JsZCwgY291bnRyeURhdGEsIHBlcmNlbnREYXRhKSB7XG4gIHZhciBjb3VudHJ5UGVyY2VudHMgPSB7fTtcbiAgdmFyIHBlcmNlbnRCeUlkID0ge307XG4gIHZhciBjb3VudHJ5QnlJZCA9IHt9LFxuICAgIGNvdW50cmllcyA9IHRvcG9qc29uLmZlYXR1cmUod29ybGQsIHdvcmxkLm9iamVjdHMuY291bnRyaWVzKS5mZWF0dXJlcztcblxuICAvL0FkZGluZyBjb3VudHJpZXMgdG8gc2VsZWN0XG5cbiAgY291bnRyeURhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgY291bnRyeUJ5SWRbZC5pZF0gPSBkLm5hbWU7XG4gICAgb3B0aW9uID0gY291bnRyeUxpc3QuYXBwZW5kKFwib3B0aW9uXCIpO1xuICAgIG9wdGlvbi50ZXh0KGQubmFtZSk7XG4gICAgb3B0aW9uLnByb3BlcnR5KFwidmFsdWVcIiwgZC5pZCk7XG5cbiAgICBwZXJjZW50RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgIGlmIChkLnBlcmNlbnQgPT09IFwiLVwiKSB7XG4gICAgICAgIGNvdW50cnlQZXJjZW50c1tkLm5hbWVdID0gXCItXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudHJ5UGVyY2VudHNbZC5uYW1lXSA9IHBhcnNlRmxvYXQoZC5wZXJjZW50KSAvIDEwMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvdW50cnlEYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgcGVyY2VudEJ5SWRbZC5pZF0gPSBjb3VudHJ5UGVyY2VudHNbZC5uYW1lXTtcbiAgICB9KTtcblxuICBcbiAgfSk7XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgIHNwZWVkOiAwLjAwNSxcbiAgICB2ZXJ0aWNhbFRpbHQ6IC0zMCxcbiAgICBob3Jpem9udGFsVGlsdDogMFxuICB9O1xuXG4gIC8vIGZ1bmN0aW9uIGVuYWJsZVJvdGF0aW9uKCkge1xuICAvLyAgIGQzLnRpbWVyKGZ1bmN0aW9uKGVsYXBzZWQpIHtcbiAgLy8gICAgIHByb2plY3Rpb24ucm90YXRlKFtcbiAgLy8gICAgICAgY29uZmlnLnNwZWVkICogZWxhcHNlZCAtIDEyMCxcbiAgLy8gICAgICAgY29uZmlnLnZlcnRpY2FsVGlsdCxcbiAgLy8gICAgICAgY29uZmlnLmhvcml6b250YWxUaWx0XG4gIC8vICAgICBdKTtcbiAgLy8gICAgIHN2Zy5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAvLyAgIH0pO1xuICAvLyB9XG4gIFxuICAvLyBmdW5jdGlvbiBkaXNhYmxlUm90YXRpb24oKSB7XG4gIC8vICAgZDMudGltZXIoZnVuY3Rpb24oZWxhcHNlZCkge1xuICAvLyAgICAgcHJvamVjdGlvbi5yb3RhdGUoW1xuICAvLyAgICAgICBjb25maWcuc3BlZWQgKiBlbGFwc2VkIC0gMTIwLFxuICAvLyAgICAgICBjb25maWcudmVydGljYWxUaWx0LFxuICAvLyAgICAgICBjb25maWcuaG9yaXpvbnRhbFRpbHRcbiAgLy8gICAgIF0pO1xuICAvLyAgICAgc3ZnLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgXG4gIC8vIGVuYWJsZVJvdGF0aW9uKCk7XG5cblxuICAvL0RyYXdpbmcgY291bnRyaWVzIG9uIHRoZSBnbG9iZVxuXG4gIHZhciB3b3JsZCA9IHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJwYXRoLmxhbmRcIilcbiAgICAuZGF0YShjb3VudHJpZXMpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYW5kXCIpXG4gICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgLy8gLnN0eWxlKFwiZmlsbFwiLCApXG5cbiAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkKVxuICAgICAgaWYgKHBlcmNlbnRCeUlkW2QuaWRdID09PSBcIi1cIiB8fCBkLmlkID09PSAtOTkpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKFwiZmlsbFwiLCBcIndoaXRlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgY29sb3Igd2hpdGVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXCJmaWxsXCIsIGdldENvbG9yRm9yUGVyY2VudGFnZShwZXJjZW50QnlJZFtkLmlkXSkpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLy9EcmFnIGV2ZW50XG5cbiAgICAuY2FsbChcbiAgICAgIGQzLmJlaGF2aW9yXG4gICAgICAgIC5kcmFnKClcbiAgICAgICAgLm9yaWdpbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgciA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHsgeDogclswXSAvIHNlbnMsIHk6IC1yWzFdIC8gc2VucyB9O1xuICAgICAgICB9KVxuICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuICAgICAgICAgIHByb2plY3Rpb24ucm90YXRlKFtkMy5ldmVudC54ICogc2VucywgLWQzLmV2ZW50LnkgKiBzZW5zLCByb3RhdGVbMl1dKTtcbiAgICAgICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAvLyBzdmcuc2VsZWN0QWxsKFwiLndhdGVyXCIpLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5mb2N1c2VkXCIpLmNsYXNzZWQoXCJmb2N1c2VkXCIsIChmb2N1c2VkID0gZmFsc2UpKTtcbiAgICAgICAgfSlcbiAgICApXG5cblxuXG4gICAgLy9Nb3VzZSBldmVudHNcblxuICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICBjb25zb2xlLmxvZyhjb3VudHJ5QnlJZFtkLmlkXSk7XG4gICAgICBjb25zdCBzaG93Q29udGVudCA9IGQzLnNlbGVjdChcImRpdi5zaG93LWNvbnRlbnRcIilcbiAgICAgIHNob3dDb250ZW50LnNlbGVjdEFsbChcIipcIikucmVtb3ZlKClcbiAgICAgIHNob3dDb250ZW50LmFwcGVuZChcImgxXCIpLnRleHQoY291bnRyeUJ5SWRbZC5pZF0pO1xuICAgIH0pXG5cbiAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgY291bnRyeVRvb2x0aXBcbiAgICAgICAgLnRleHQoY291bnRyeUJ5SWRbZC5pZF0pXG4gICAgICAgIC5zdHlsZShcImxlZnRcIiwgZDMuZXZlbnQucGFnZVggKyA3ICsgXCJweFwiKVxuICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgLSAxNSArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gICAgfSlcbiAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICBjb3VudHJ5VG9vbHRpcC5zdHlsZShcIm9wYWNpdHlcIiwgMCkuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9KVxuICAgIC5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICBjb3VudHJ5VG9vbHRpcFxuICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgNyArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwidG9wXCIsIGQzLmV2ZW50LnBhZ2VZIC0gMTUgKyBcInB4XCIpO1xuICAgIH0pO1xuXG4gIC8vQ291bnRyeSBmb2N1cyBvbiBvcHRpb24gc2VsZWN0XG5cbiAgZDMuc2VsZWN0KFwic2VsZWN0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpLFxuICAgICAgZm9jdXNlZENvdW50cnkgPSBjb3VudHJ5KGNvdW50cmllcywgdGhpcyksXG4gICAgICBwID0gZDMuZ2VvLmNlbnRyb2lkKGZvY3VzZWRDb3VudHJ5KTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIuZm9jdXNlZFwiKS5jbGFzc2VkKFwiZm9jdXNlZFwiLCAoZm9jdXNlZCA9IGZhbHNlKSk7XG5cbiAgICAvL0dsb2JlIHJvdGF0aW5nXG5cbiAgICAoZnVuY3Rpb24gdHJhbnNpdGlvbigpIHtcbiAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMjUwMClcbiAgICAgICAgLnR3ZWVuKFwicm90YXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByID0gZDMuaW50ZXJwb2xhdGUocHJvamVjdGlvbi5yb3RhdGUoKSwgWy1wWzBdLCAtcFsxXV0pO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyKHQpKTtcbiAgICAgICAgICAgIHN2Z1xuICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgICAgLmNsYXNzZWQoXCJmb2N1c2VkXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pZCA9PSBmb2N1c2VkQ291bnRyeS5pZCA/IChmb2N1c2VkID0gZCkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY291bnRyeShjbnQsIHNlbCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY250Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNudFtpXS5pZCA9PSBzZWwudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNudFtpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gdmFyIHJvdGF0aW9uRGVsYXkgPSAzMDAwO1xuLy8gdmFyIHYwOyAvLyBNb3VzZSBwb3NpdGlvbiBpbiBDYXJ0ZXNpYW4gY29vcmRpbmF0ZXMgYXQgc3RhcnQgb2YgZHJhZyBnZXN0dXJlLlxuLy8gdmFyIHIwOyAvLyBQcm9qZWN0aW9uIHJvdGF0aW9uIGFzIEV1bGVyIGFuZ2xlcyBhdCBzdGFydC5cbi8vIHZhciBxMDsgLy8gUHJvamVjdGlvbiByb3RhdGlvbiBhcyB2ZXJzb3IgYXQgc3RhcnQuXG4vLyB2YXIgbGFzdFRpbWUgPSBkMy5ub3coKTtcbi8vIHZhciBkZWdQZXJNcyA9IGRlZ1BlclNlYyAvIDEwMDA7XG4vLyB2YXIgYXV0b3JvdGF0ZSwgbm93LCBkaWZmLCByb3RhdGlvbjtcblxuLy8gdmFyIGRlZ1BlclNlYyA9IDY7XG4vLyB2YXIgYW5nbGVzID0geyB4OiAtMjAsIHk6IDQwLCB6OiAwIH07XG4vLyBmdW5jdGlvbiBzZXRBbmdsZXMoKSB7XG4vLyAgIHZhciByb3RhdGlvbiA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4vLyAgIHJvdGF0aW9uWzBdID0gYW5nbGVzLnk7XG4vLyAgIHJvdGF0aW9uWzFdID0gYW5nbGVzLng7XG4vLyAgIHJvdGF0aW9uWzJdID0gYW5nbGVzLno7XG4vLyAgIHByb2plY3Rpb24ucm90YXRlKHJvdGF0aW9uKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gc3RhcnRSb3RhdGlvbihkZWxheSkge1xuLy8gICBhdXRvcm90YXRlLnJlc3RhcnQocm90YXRlLCBkZWxheSB8fCAwKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gc3RvcFJvdGF0aW9uKCkge1xuLy8gICBhdXRvcm90YXRlLnN0b3AoKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gZHJhZ2VuZGVkKCkge1xuLy8gICBzdGFydFJvdGF0aW9uKHJvdGF0aW9uRGVsYXkpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiByb3RhdGUoZWxhcHNlZCkge1xuLy8gICBub3cgPSBkMy5ub3coKTtcbi8vICAgZGlmZiA9IG5vdyAtIGxhc3RUaW1lO1xuLy8gICBpZiAoZGlmZiA8IGVsYXBzZWQpIHtcbi8vICAgICByb3RhdGlvbiA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4vLyAgICAgcm90YXRpb25bMF0gKz0gZGlmZiAqIGRlZ1Blck1zO1xuLy8gICAgIHByb2plY3Rpb24ucm90YXRlKHJvdGF0aW9uKTtcbi8vICAgfVxuLy8gICBsYXN0VGltZSA9IG5vdztcbi8vIH1cbi8vIHNldEFuZ2xlcygpO1xuLy8gYXV0b3JvdGF0ZSA9IGQzLnRpbWVyKHJvdGF0ZSk7XG4iLCJpbXBvcnQgZ2xvYmUgZnJvbSAnLi9nbG9iZSciXSwic291cmNlUm9vdCI6IiJ9