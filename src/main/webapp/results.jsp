<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Lab2</title>
    <link rel="stylesheet" href="static/stylesheets/stylesheet.css">
    <link rel="stylesheet" href="static/stylesheets/header.css">
    <link rel="stylesheet" href="static/stylesheets/footer.css">
    <link rel="stylesheet" href="static/stylesheets/form.css">
    <link rel="stylesheet" href="static/stylesheets/table.css">
</head>
<body>
<header>
    <pre class="head_pre">Брель Мария<br>P3207<br>409322</pre>
</header>
<section class="main_content" style="display: flex; justify-content: center; flex-direction: column;">

    <jsp:include page="resultTable.jsp"/>
        <a href=<%=request.getContextPath()%> >
            <button class="back">Назад к форме</button>
        </a>
</section>
<script type="text/javascript" src="static/js/index.js"></script>
<footer>
    <a href="https://github.com/aquamarine022/Lab2Web">
        <img src="static/imgs/catty.avif">
    </a>
</footer>
</body>
</html>