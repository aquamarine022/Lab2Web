import {draw_point, draw_graph, get_click_coordinates, clear_blank} from "./graph.js";

window.addEventListener("load", load_points);

const message_type = Object.freeze({
    OK: 1,
    EMPTY_FIELDS: 2,
    SOME_SERVER_ERROR: 3,
    CHOOSE_R: 4,
    Y_ERROR: 5,
    R_ERROR: 6
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
        clear_blank()
        selected_r = e.value;
        if(selected_r>=1 && selected_r <=4){
            draw_graph(Number(selected_r));
        }
        else {
            show_user_message(message_type.R_ERROR)
        }
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
    const x = selected_x.value;
    const y = formData.get("y");
    const r = formData.get("r");
    const hit = await check_point(x, y, r, true);
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
        case message_type.Y_ERROR:
            error_field.textContent = "Y должно быть больше -5 и меньше 5"
            break;
        case message_type.R_ERROR:
            error_field.textContent = "R должно быть больше 1 и меньше 4"
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
    if(y< -5 || y > 5) return message_type.Y_ERROR
    if(r<1 || r>4) return message_type.R_ERROR
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


let selected_x = null;
$('input[type="checkbox"]').on('change', function() {
    // Снимаем отметку со всех других чекбоксов
    $('input[type="checkbox"]').not(this).prop('checked', false);
    selected_x = this;
});





