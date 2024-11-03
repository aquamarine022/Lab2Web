<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Lab1</title>
</head>
<body>
<section class="main_content">
    <div class="back">
        <a href=<%=request.getContextPath()%>>
            <button>Назад к форме</button>
        </a>
    </div>
    <jsp:include page="resultTable.jsp"/>
</section>
<script type="text/javascript" src="static/js/index.js"></script>

</body>
</html>