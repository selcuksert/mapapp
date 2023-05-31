package com.corp.mapapp.location.model;

import lombok.Data;

@Data
public class Location {
    private int id;
    private String name;
    private String iso3;
    private String iso2;
    private double longitude;
    private double latitude;
}
