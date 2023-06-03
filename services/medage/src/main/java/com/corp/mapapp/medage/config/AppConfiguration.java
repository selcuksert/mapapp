package com.corp.mapapp.medage.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "medage")
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