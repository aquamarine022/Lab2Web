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




