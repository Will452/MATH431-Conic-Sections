const elt = document.getElementById('calculator');
const desmos2Dcalc = Desmos.GraphingCalculator(elt);

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