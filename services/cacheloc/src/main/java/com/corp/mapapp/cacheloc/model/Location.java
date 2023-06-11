package com.corp.mapapp.cacheloc.model;

import lombok.Data;

@Data
public class Location {
    private int id;
    private String name;
    private String iso3;
    private String iso2;
    private Double longitude;
    private Double latitude;
}
