package com.server;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null) {
            req.getRequestDispatcher("/check").forward(req, resp);
        } else {
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }
}
