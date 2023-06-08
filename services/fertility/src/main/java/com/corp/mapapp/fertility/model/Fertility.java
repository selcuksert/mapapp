package com.corp.mapapp.fertility.model;

import lombok.Data;

@Data
public class Fertility {
    private String location;
    private String iso3;
    private String iso2;
    private String indicatorDisplayName;
    private Double value;
}
