package com.server;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ResultsBean implements Serializable {
    private List<Row> rows;

    public ResultsBean() {
        rows = new ArrayList<>();
    }

    public void addRow(Row row) {
        rows.add(row);
    }
    public List<Row> getRows() {
        return rows;
    }
}
