/** @format */
("use strict;");

const colorPicker = document.querySelector("#color");
const body = document.querySelector("body");
const hexV = document.querySelector(".hex");
const rgbV = document.querySelector(".rgb");
const hslV = document.querySelector(".hsl");

window.addEventListener("DOMContentLoaded", setup);
// Setup
function setup() {
	hexV.textContent = colorPicker.value;
	rgbV.textContent = "rgb: 255, 255, 255";
	hslV.textContent = "hsl: 0, 0, 100";
	getColors();
}

// Get HEX color value and show
function getColors() {
	let hexColorValue, rgbColorValue;
	colorPicker.addEventListener("input", (e) => {
		let colorPickValue = e.target.value;

		// HEX Value
		hexColorValue = `${colorPickValue}`;
		//RGB Value
		rgbColorValue = hexToRgb(hexColorValue);
		//HSL Value
		hslColorValue = rgbToHsl(rgbColorValue.r, rgbColorValue.g, rgbColorValue.b);

		// Show Values
		hexV.textContent = hexColorValue;
		rgbV.textContent = `rgb: ${rgbColorValue.r}, ${rgbColorValue.g},${rgbColorValue.b}`;
		hslV.textContent = `hsl: ${hslColorValue.h}, ${hslColorValue.s}, ${hslColorValue.l}`;
		//Set body background color
		body.style.backgroundColor = hexColorValue;
	});
}

/*
 * HEX to RGB
 */
function hexToRgb(hexString) {
	r = parseInt(hexString.substring(1, 3), 16);
	g = parseInt(hexString.substring(3, 5), 16);
	b = parseInt(hexString.substring(5, 7), 16);
	// return { r: r, g: g, b: b };
	return { r, g, b };
}

/*
 *  RGB TO HEX
 */
function rgbToHex(rgbObject) {
	let r, g, b;
	r = convertion(rgbObject.r);
	g = convertion(rgbObject.g);
	b = convertion(rgbObject.b);
	rgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);
	return `#${r}${g}${b}`;
}
function convertion(color) {
	let hex = color.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}

/*
 *CSS to RGB
 */
function cssToRGB(css) {
	let r, g, b;
	const rawTxt = css
		.substring(css.indexOf("(") + 1, css.indexOf(")"))
		.trim()
		.split(", ");
	r = parseInt(rawTxt[0].trim());
	g = parseInt(rawTxt[1].trim());
	b = parseInt(rawTxt[2].trim());
	// console.log(`RGB Values are: r:${r}, g:${g}, b:${b}`);
}

/*
 * HSL Convertion
 */
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let h, s, l;

	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);

	if (max === min) {
		h = 0;
	} else if (max === r) {
		h = 60 * (0 + (g - b) / (max - min));
	} else if (max === g) {
		h = 60 * (2 + (b - r) / (max - min));
	} else if (max === b) {
		h = 60 * (4 + (r - g) / (max - min));
	}

	if (h < 0) {
		h = h + 360;
	}

	l = (min + max) / 2;

	if (max === 0 || min === 1) {
		s = 0;
	} else {
		s = (max - l) / Math.min(l, 1 - l);
	}
	// multiply s and l by 100 to get the value in percent, rather than [0,1]
	s *= 100;
	l *= 100;

	// console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

	return { h: Math.floor(h), s: Math.floor(s), l: Math.floor(l) };
}
