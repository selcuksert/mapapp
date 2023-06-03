package com.corp.mapapp.medage.model;

import lombok.Data;

@Data
public class MedianAge {
    private String location;
    private String iso3;
    private String iso2;
    private String indicatorDisplayName;
    private String sex;
    private Double value;
}
