package com.corp.mapapp.married.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "married")
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