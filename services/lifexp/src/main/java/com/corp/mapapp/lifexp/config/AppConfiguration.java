package com.corp.mapapp.lifexp.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "lifexp")
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
