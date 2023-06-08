package com.corp.mapapp.fertility.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "fertility")
public interface AppConfiguration {
    DataportalConfig dataportal();

    interface DataportalConfig {
        /**
         * Indicator ID of UNDP Data Portal API
         *
         * @return DataPortal API indicator
         */
        String indicator();
    }
}