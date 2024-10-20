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
</head>
<body>
<header>
  <pre class="head_pre">Брель Мария<br>P3207<br>409322</pre>
</header>
<form method="post" id="form">
<div class="first-row">
  <div class="container">
    <div>

        <p class="cordsText">Выберите x:</p>
        <div class="checkbox-container">
          <input class="custom-checkbox" type="checkbox" name="x" id = "-2" value="-2">
          <label for="-2" class="custom-button">-2</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "-1.5" value="-1.5">
          <label for="-1.5" class="custom-button">-1.5</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "-1" value="-1">
          <label for="-1" class="custom-button">-1</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "-0.5" value="-0.5">
          <label for="-0.5" class="custom-button">-0.5</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "0" value="0">
          <label for="0" class="custom-button">0</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "0.5" value="0.5">
          <label for="0.5" class="custom-button">0.5</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "1" value="1">
          <label for="1" class="custom-button">1</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "1.5" value="1.5">
          <label for="1.5" class="custom-button">1.5</label>
          <input class="custom-checkbox" type="checkbox" name="x" id = "2" value="2">
          <label for="2" class="custom-button">2</label>
        </div>


    </div>
    <div class="form">
      <p>Введите y:</p>
      <input name="y" type="text" placeholder="(от -5 до 5)" maxlength="10">
    </div>
    <div class="form">
      <p>Введите R:</p>
      <input name="r" type="text" placeholder="(от 1 до 4)" maxlength="10">
    </div>
    <div>
      <button class="submit-button" id="submit">Проверить попадание</button>
    </div>
  </div>
  <div>
    <%@include file="static/imgs/graph.svg" %>
  </div>
</div>
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
</form>
<footer>
  <img src="static/imgs/catty.avif">
</footer>
<script src="static/js/jquery-3.7.1.min.js"></script>
<script src="static/js/index.js"></script>
</body>
</html>