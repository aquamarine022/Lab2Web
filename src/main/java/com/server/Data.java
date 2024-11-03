package com.server;

import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Stateful
@SessionScoped
@Named("data")
public class Data implements Serializable {
    private final List<PointBean> data = new ArrayList<>();

    public Data(){}

    public List<PointBean> getData() {
        return data;
    }

    public void addRPoint(PointBean point) {
        data.add(point);
    }
}
