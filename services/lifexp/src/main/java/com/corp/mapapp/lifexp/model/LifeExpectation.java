package com.corp.mapapp.lifexp.model;

import lombok.Data;

@Data
public class LifeExpectation {
    private String indicatorDisplayName;
    private String timeLabel;
    private Double value;
    private String location;
    private String iso3;
    private String iso2;
    private String variant;
}
