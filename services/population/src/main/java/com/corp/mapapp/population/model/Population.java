package com.corp.mapapp.population.model;

import lombok.Data;

@Data
public class Population {
    private String location;
    private String iso3;
    private String iso2;
    private String indicatorDisplayName;
    private String sex;
    private Double value;
}
