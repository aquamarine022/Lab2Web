import {draw_point, draw_batman, get_click_coordinates} from "./graph.js";

window.addEventListener("load", load_points);

const message_type = Object.freeze({
    OK: 1,
    EMPTY_FIELDS: 2,
    SOME_SERVER_ERROR: 3,
    CHOOSE_R: 4
});

let selected_r = null;
document.getElementById('calculator').addEventListener('click', async function (evt) {
    if (selected_r == null) {
        show_user_message(message_type.CHOOSE_R);
        return;
    }
    let point = get_click_coordinates(evt.clientX, evt.clientY);
    const hit = await check_point(point.x, point.y, selected_r, false);
    if(hit == null) return;
    draw_point(point, hit ? 'green' : 'red');
});

document.getElementsByName("r").forEach(e => {
    e.addEventListener("change", () => {
        selected_r = e.value;
        draw_batman(Number(selected_r));
    });
});

$('input[type="checkbox"]').on('change', function() {
    // Снимаем отметку со всех других чекбоксов
    $('input[type="checkbox"]').not(this).prop('checked', false);
});

document.getElementById("form").addEventListener("submit", async () =>{
    await submit_form(event);
});

let prev_point;

async function submit_form(event) {
    event.preventDefault();
    //Извлекаем данные формы
    const formData = new FormData(event.target);
    const checkbox = document.querySelector('input[name="x"]');
    const x = checkbox && checkbox.checked ? checkbox.value : null;
    const y = formData.get("y");
    const r = formData.get("r");
    const hit = await check_point(x, y, r, false);
    if(hit == null) return;

}

async function check_point(x, y, r, redirect) {
    let result = validate_data(x, y, r);
    show_user_message(result);
    if (result !== message_type.OK) return;

    const queryParams = new URLSearchParams();
    queryParams.append("X", x);
    queryParams.append("Y", y);
    queryParams.append("R", r);
    queryParams.append("redirect", redirect);
    try {
        const response = await fetch(`controller?${queryParams.toString()}`);
        if (response.redirected ^ redirect) {
            show_user_message(message_type.SOME_SERVER_ERROR);
            return;
        }
        if (redirect){
            window.location.href = response.url;
            return;
        }

        const data = await response.json();
        add_data_to_history(
            data.x,
            data.y,
            data.r,
            data.hit
                   );
        return data.hit;
    } catch (e) {
        show_user_message(message_type.SOME_SERVER_ERROR);
    }
}

function add_data_to_history(x, y, r, hit, execution_time, real_time) {
    let table_ref = document.querySelector("#resTable tbody");
    let newRow = table_ref.insertRow(0);
    [
        x.toFixed(2).toString(),
        y.toFixed(2).toString(),
        r.toFixed(2).toString(),
        hit ? "Попал" : "Промазал",
    ].forEach(value => newRow.insertCell().textContent = value);
}

function show_user_message(message) {
    let error_field = document.getElementById("error_field");
    error_field.style.visibility = "visible";
    switch (message) {
        case message_type.EMPTY_FIELDS:
            error_field.textContent = "Пожалуйста, заполните все поля!";
            break;
        case message_type.SOME_SERVER_ERROR:
            error_field.textContent = "Упс... Произошла ошибка при работе с сервером. Пожалуйста, повторите попытку позже.";
            break;
        case message_type.CHOOSE_R:
            error_field.textContent = "Невозможно определить координаты точки! Пожалуйста, выберете R!";
            break;
        default:
            error_field.style.visibility = "hidden";
            error_field.textContent = "";
            break;
    }
}

// Функция валидации данных формы
function validate_data(x, y, r) {
    if (x == null || y == null || r == null || y === "" || r === "") return message_type.EMPTY_FIELDS;
    return message_type.OK;
}

function load_points() {
    fetch(`controller?data`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data == null) return;
            data.data.forEach(point => {
                draw_point(point, point.hit ? 'green' : 'red');
            });
        })
        .catch(() => {
            show_user_message(message_type.SOME_SERVER_ERROR);
        });
}






function saveData(x,y,r){
    localStorage.setItem("x",x);
    localStorage.setItem("y",y);
    localStorage.setItem("r",r);
}

function loadData(){
    if(localStorage.getItem("x")){
        $("input[name='x']").val(localStorage.getItem(x));
    }
    if(localStorage.getItem("y")){
        $("input[name='y']").val(localStorage.getItem(y));
    }
    if(localStorage.getItem("r")){
        $("input[name='r']").val(localStorage.getItem(r));
    }
}

function checkData(x,y,r){
    let resp = {
        isValid: true,
        reason: "Все кул"
    }
    if(isNaN(+x) || isNaN(+y)||isNaN(+r)){
        resp.isValid = false;
        resp.reason ="Невалидненько"
    }
    if(+y < -5){
        resp.isValid = false;
        resp.reason = "y must be more then -5"
    }
    if(+y > 5){
        resp.isValid = false;
        resp.reason = "y must be less then 5"
    }
    if(+r < 1){
        resp.isValid = false;
        resp.reason = "r must be more then 1"
    }
    if(+y > 4){
        resp.isValid = false;
        resp.reason = "y must be less then 4"
    }
    return resp;
}

function drawPoint(z,y,r, result){
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x*170 / r+200);
    circle.setAttribute("cy", -y*170 / r+200);
    circle.setAttribute("r", 4);
    circle.style.stroke = "blue";
    circle.style["stroke-width"] = "1px";
    circle.style.fill = result? "green" : "red";
    $("#graph").append(circle);

}
$('input[type="checkbox"]').on('change', function() {
    // Снимаем отметку со всех других чекбоксов
    $('input[type="checkbox"]').not(this).prop('checked', false);
});

$("#form").submit(function (e){
    let json = {
        "x": $("input[name='x']:checked").val(),
        "y": $("input[name='y']").val(),
        "r": $("input[name='r']").val()
    };
    let res = checkData(json.x, json.y, json.r)
    if(!res.isValid){
        e.preventDefault();
        alert(res.reason);
        return;
    }
    saveData(+json.x, +json.y, +json.r)
});

$("#graph").on("click", function (e){
    let rVal = $("input[name='r']").val();

    if(rVal == null){
        alert("Unreal to check");
        return;
    }

    let calcX = (e.pageX - $(this).offset().left - $(this).width()/2)/150*rVal;
    let calcY = ($(this).height()/2 - (e.pageY-$(this).offset().top))/150*rVal;

    let res = checkData(calcX, calcY, rVal)
    if(!res.isValid){
        alert(res.reason);
        return;
    }

})




