const desmosCalcDiv = document.getElementById('desmos2Dcalc');
desmosOptions = {
	"expressionsCollapsed": true
}
const desmos2Dcalc = Desmos.GraphingCalculator(desmosCalcDiv, desmosOptions);

// globals, store state for both GeoGebra and Desmos
let g_m = 0;
let g_A = 0;
let g_B = 0;
let g_C = 0;
let g_D = 0;

// consts
a = 2;
b = 10;
c = 5;
d = 0;
e = 0;
f = 0;

// conic section
conic_function_str = `y>=
 ${a}x^2 +
 ${b}xy +
 ${c}y^2 +
 ${d}x +
 ${e}y +
 ${f}`

desmos2Dcalc.setExpression({ id: 'graph1', latex: conic_function_str });

// GeoGebra
var params = { "appName": "3d", "width": 800, "height": 600, "showToolBar": false, "showAlgebraInput": false, "showMenuBar": false, "material_id": "resj9ngr" };
params.appletOnLoad = function(api) {
	// init update listeners for ggbApplet1
	ggbApplet.registerObjectUpdateListener("m", "ggListener");
	ggbApplet.registerObjectUpdateListener("a", "ggListener");
	ggbApplet.registerObjectUpdateListener("b", "ggListener");
	ggbApplet.registerObjectUpdateListener("c", "ggListener");
	ggbApplet.registerObjectUpdateListener("d", "ggListener");

	// set initial global state
	updateGlobalStateFromGeoGebra();
	printGlobalState();
}

var applet = new GGBApplet(params, true);
window.addEventListener("load", function() {
	applet.inject('ggb-element');
});

function printGlobalState() {
	console.log(`global state: m:${g_m} A:${g_A} B:${g_B} C:${g_C}`);
}

function updateGlobalStateFromGeoGebra() {
	g_m = ggbApplet.getValue("m");
	g_A = ggbApplet.getValue("a");
	g_B = ggbApplet.getValue("b");
	g_C = ggbApplet.getValue("c");
	g_D = ggbApplet.getValue("d");
}

function updateDesmos2DFromGlobalState() {

}

function ggListener(objName) {
	updateGlobalStateFromGeoGebra();
}