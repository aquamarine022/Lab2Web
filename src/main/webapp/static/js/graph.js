const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt, {
    keypad: false,
    expressions: false,
    settingsMenu: false,
    lockViewport: true,
    zoomFit: true,
    pointsOfInterest: false,
    trace: false,
    xAxisStep: 1,
    yAxisStep: 1,
    // showGrid: false
});
let pointIds = [];
export function clear_blank(){
    calculator.setBlank();
}
export function get_click_coordinates(xClick, yClick){
    let calculatorRect = elt.getBoundingClientRect();
    return calculator.pixelsToMath({
        x: xClick - calculatorRect.left,
        y: yClick - calculatorRect.top
    })
}

export function draw_point(point, color){
    calculator.setExpression({
        latex: `(${point.x}, ${point.y})`, // Задание координат точки
        color: color // Цвет точки
    });
}

export function draw_graph(r) {
    let k = r
    calculator.setExpression({
        id: 'k',
        latex: 'k=' + k.toString()
    });
    calculator.setExpression({
        id: 's',
        latex: '\\s(x)=\\sqrt{(\\abs(x*k/7))/(x*k/7)}',
        hidden: true
    });
    calculator.setExpression({
        id: 'graph2',
        latex: 'y>=\\{-k/2<=y<=0\\}\\{0<=x<=k/2:-k/2+x\\}',
        color: 'blue'
    });
    calculator.setExpression({
        id: 'graph3',
        latex: 'x=\\{-k<=x<=0\\}\\{0>=y>=-k:-k\\}',
        color: 'blue'
    });
    calculator.setExpression({
        id: 'graph4',
        latex: 'y>\\{-k<=y<=0\\}\\{0>=x>=-k:-k\\}',
        color: 'blue'
    });
    calculator.setExpression({
        id: 'graph6',
        latex: 'y=\\{0>=x>=-k:-k\\}',
        color: 'blue'
    });
    calculator.setExpression({
        id: 'graph5',
        latex: 'x^2+y^2<=\\{x>=0\\}\\{y>=0: (k/2)^2\\}',
        color: 'blue'
    });

    calculator.setMathBounds({
        left: -r - 1,
        right: r + 1,
        bottom: -r - 1,
        top: r + 1
    });
}