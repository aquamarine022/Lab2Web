package com.server;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {
    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        ResultsBean resultsBean = (ResultsBean) session.getAttribute("resultsBean");
        if (resultsBean == null) {
            resultsBean = new ResultsBean();
            session.setAttribute("resultsBean", resultsBean);
        }
        try {
            float x = Float.parseFloat(req.getParameter("x"));
            float y = Float.parseFloat(req.getParameter("y"));
            float r = Float.parseFloat(req.getParameter("r"));
            Row row = new Row(x,y,r, Checker.hit(x,y,r));
            resultsBean.addRow(row);
            req.setAttribute("new_row", row);

        }catch (Exception e){
            e.printStackTrace();
        }
        req.getRequestDispatcher("results.jsp").forward(req, resp);

    }
    private static class Checker {
        public static boolean hit(float x, float y, float r) {
            return inRect(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
        }

        private static boolean inRect(float x, float y, float r) {
            return x <= 0 && y <= 0 && x >= -r && y >= -r;
        }

        private static boolean inTriangle(float x, float y, float r) {
            return x >= 0 && y <= 0 && x <= r/2 && y >= r/2 && y <= x - r;
        }

        private static boolean inCircle(float x, float y, float r) {
            return x >= 0 && y >= 0 && x <= r/2 && y <= r/2 && (Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(r, 2) < 0);
        }
    }
}


