package com.corp.mapapp.fertility.service;

import com.corp.mapapp.fertility.client.FertilityAPI;
import com.corp.mapapp.fertility.config.AppConfiguration;
import com.corp.mapapp.fertility.model.Fertility;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class FertilityService {

    @Inject
    @RestClient
    FertilityAPI fertilityAPI;

    @Inject
    AppConfiguration appConfiguration;

    public Uni<Fertility> getFertility(String location, boolean pagingInHeader,
                                       String format, String startYear, String endYear,
                                       String variants) {
        String indicator = appConfiguration.dataportal().indicator();

        return fertilityAPI.getMarried(indicator, location, startYear, endYear,
                variants, pagingInHeader, format).onItem().transform(r -> r.getData().get(0));

    }
}
