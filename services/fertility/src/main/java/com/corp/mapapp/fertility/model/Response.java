package com.corp.mapapp.fertility.model;

import lombok.Data;

import java.util.List;

@Data
public class Response {
    private int pageNumber;
    private int pageSize;
    private String previousPage;
    private String nextPage;
    private int pages;
    private int total;
    private List<Fertility> data;
}
