const desmosCalcDiv = document.getElementById('desmos2Dcalc');
desmosOptions = {
	"expressionsCollapsed": true
}
const desmos2Dcalc = Desmos.GraphingCalculator(desmosCalcDiv, desmosOptions);

// globals, store state for both GeoGebra and Desmos
let m = 0;
let A = 0;
let B = 0;
let C = 0;
let D = 0;

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
	updateDesmos2DFromGlobalState();
	printGlobalState();
}

var applet = new GGBApplet(params, true);
window.addEventListener("load", function() {
	applet.inject('ggb-element');
});

function printGlobalState() {
	console.log(`global state: m:${m} A:${A} B:${B} C:${C} D:${D}`);
}

function updateGlobalStateFromGeoGebra() {
	m = ggbApplet.getValue("m");
	A = ggbApplet.getValue("a");
	B = ggbApplet.getValue("b");
	C = ggbApplet.getValue("c");
	D = ggbApplet.getValue("d");
}

function updateDesmos2DFromGlobalState() {
	// set coefficients
	// formula from from www.onemathematicalcat.org
	// x2(c2m2−a2)+xy(−2ab)+y2(c2m2−b2)+x(2ad)+y(2bd)−d2=0
	xx = C * C * m * m - A * A;
	xy = -2 * A * B;
	yy = C * C * m * m - B * B;
	x = 2 * A * D;
	y = 2 * B * D;
	c = -D * D;

	// conic section
	conic_function_str = `0>=
	 ${xx}x^2 +
	 ${xy}xy +
	 ${yy}y^2 +
	 ${x}x +
	 ${y}y +
	 ${c}`

	desmos2Dcalc.setExpression({ id: 'graph1', latex: conic_function_str });

	console.log('updated 2d graph');
}

function ggListener(objName) {
	updateGlobalStateFromGeoGebra();
	updateDesmos2DFromGlobalState();
}
