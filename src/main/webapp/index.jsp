<%@ page import="java.util.List" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Catlab</title>
    <link rel="stylesheet" href="static/stylesheets/stylesheet.css">
    <link rel="stylesheet" href="static/stylesheets/header.css">
    <link rel="stylesheet" href="static/stylesheets/footer.css">
    <link rel="stylesheet" href="static/stylesheets/form.css">
    <link rel="stylesheet" href="static/stylesheets/table.css">
    <link rel="icon" href="static/imgs/favicon.ico" type="image/x-icon">
    <script src="static/js/jquery-3.7.1.min.js"></script>
    <script type="module" src="static/js/index.js"></script>
    <script src="https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
</head>
<body>
<header>
    <pre class="head_pre">Брель Мария<br>P3207<br>409322</pre>
</header>
    <div class="first-row">
        <p id="error_field"></p>
        <div class="container main_form">
            <form class="form" id="form">
            <div class = "form_input">
                <p class="cordsText">Выберите x:</p>
                <div class="checkbox-container">
                    <input class="custom-checkbox" type="checkbox" name="x" id="-2" value="-2">
                    <label for="-2" class="custom-button">-2</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="-1.5" value="-1.5">
                    <label for="-1.5" class="custom-button">-1.5</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="-1" value="-1">
                    <label for="-1" class="custom-button">-1</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="-0.5" value="-0.5">
                    <label for="-0.5" class="custom-button">-0.5</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="0" value="0">
                    <label for="0" class="custom-button">0</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="0.5" value="0.5">
                    <label for="0.5" class="custom-button">0.5</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="1" value="1">
                    <label for="1" class="custom-button">1</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="1.5" value="1.5">
                    <label for="1.5" class="custom-button">1.5</label>
                    <input class="custom-checkbox" type="checkbox" name="x" id="2" value="2">
                    <label for="2" class="custom-button">2</label>
                </div>

            </div>
            <div class="form_input">
                <input name="y" type="text" style="margin: 5px" min="-5" max="5" placeholder="Введите y:" maxlength="10">
            </div>
            <div class="form_input">
                <input name="r" type="text" style="margin: 5px" placeholder="Введите R:" maxlength="10">
            </div>
            <div class="form_input">
                <input type="submit" class="submit-button" id="submit_button" value="Send">
            </div>
            </form>
        </div>
        <div>
            <div id="calculator" class="graph" style="width: 400px; height: 400px;"></div>
        </div>
    </div>
    <jsp:include page="resultTable.jsp"/>

<footer>
    <img src="static/imgs/catty.avif">
</footer>
</body>
</html>