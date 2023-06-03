package com.corp.mapapp.population.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "population")
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
