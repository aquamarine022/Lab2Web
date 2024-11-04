package com.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

public class AreaCheckServlet extends HttpServlet {

    @EJB
    private Data data;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PointBean pointBean = new PointBean();
        pointBean.setTime(LocalDateTime.now());
        boolean redirect;
        try {
            pointBean.setX(Double.parseDouble(req.getParameter("X")));
            pointBean.setY(Double.parseDouble(req.getParameter("Y")));
            pointBean.setR(Double.parseDouble(req.getParameter("R")));
            redirect = Boolean.parseBoolean(req.getParameter("redirect"));
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }


        data.addRPoint(pointBean);
        req.getSession().setAttribute("data", data);
        if (redirect) {
            resp.sendRedirect(req.getContextPath() + "/results.jsp");
        } else {
            PrintWriter out = resp.getWriter();
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.findAndRegisterModules();
            String jsonResponse = objectMapper.writeValueAsString(pointBean);
            out.print(jsonResponse);
            out.flush();
        }
    }

    private boolean isHit(PointBean pointBean) {
        double x = pointBean.getX();
        double y = pointBean.getY();
        double r = pointBean.getR();
        if (x <= 0 && y <= 0) {
            return x >= -r && y >= -r;
        }

        if (x >= 0 && y <= 0) {
            return x <= r / 2 && y >= -r / 2 && y >= x - r/2;
        }

        if (x >= 0 && y >= 0) {
            return x <= r / 2 && y <= r / 2 && (Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(r, 2) < 0);
        }

        return false;
    }
}
