package com.corp.mapapp.location.model;

import lombok.Data;

import java.util.List;

@Data
public class Locations {
    private int pageNumber;
    private int pageSize;
    private String previousPage;
    private String nextPage;
    private int pages;
    private int total;
    private List<Location> data;
}
