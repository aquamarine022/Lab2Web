<%@ page import="java.text.DecimalFormat" %>
<%@ page import="com.server.PointBean" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="data" scope="session" class="com.server.Data"/>
<div class="results resTableTwo">
    <table id="resTable" class="resTable" >
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Попадание</th>
        </tr>
        </thead>
        <tbody>
        <%
            DecimalFormat df = new DecimalFormat("0.00");
            List<PointBean> arr = data.getData();
            for (int i = arr.size() - 1; i >= 0; i--) {
        %>
        <tr>
            <td><%=df.format(arr.get(i).getX())%>
            </td>
            <td><%=df.format(arr.get(i).getY())%>
            </td>
            <td><%=df.format(arr.get(i).getR())%>
            </td>
            <td><%=arr.get(i).isHit() ? "Попал" : "Промазал"%>
            </td>
        </tr>
        <%}%>
        </tbody>
    </table>
</div>
