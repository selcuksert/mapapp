package com.corp.mapapp.lifexp.service;

import com.corp.mapapp.lifexp.client.LifexpAPI;
import com.corp.mapapp.lifexp.config.AppConfiguration;
import com.corp.mapapp.lifexp.model.LifeExpectation;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class LifexpService {

    @Inject
    @RestClient
    LifexpAPI lifexpAPI;

    @Inject
    AppConfiguration appConfiguration;

    public Uni<LifeExpectation> getLifeExpectation(String location, boolean pagingInHeader,
                                                   String format, String startYear, String endYear,
                                                   String variants, String sexes) {
        String indicator = appConfiguration.dataportal().indicator();

        return lifexpAPI.getLifeExpectation(
                indicator,
                location,
                pagingInHeader,
                format,
                startYear,
                endYear,
                variants,
                sexes
        ).onItem().transform(r -> r.getData().get(0));
    }
}
