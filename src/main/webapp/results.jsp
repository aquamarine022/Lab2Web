<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.server.Row" %>

<!DOCTYPE html>
<html lang="ru-RU">

<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №2</title>
    <script src="static/js/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="static/stylesheets/stylesheet.css">
    <link rel="icon" type="image/jpg" href="static/imgs/favicon.ico">
</head>

<body>
<div class="content-container">
    <header class="header">
        <div class="header-container">
            <div>Брель Мария P3207</div>
            <div></div>
            <div>409322</div>
        </div>
    </header>
    <main class="main">
        <div class="main__left-column">
            <div class="main__block">
                <a class="link-to-form" href="/server/index">Вернуться к форме</a>
            </div>
        </div>
        <div>
            <div class="result-title">Результат</div>
            <div class="results">
                <table id="resultTable" class="resTable">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>ОДЗ</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="row" items="${resultsBean.rows}">
                        <tr>
                            <td>{row.x}</td>
                            <td>{row.y}</td>
                            <td>{row.r}</td>
                            <td>{row.result ? "Yes" : "Nope"}</td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</div>
</body>

</html>
