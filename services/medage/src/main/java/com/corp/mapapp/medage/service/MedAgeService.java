package com.corp.mapapp.medage.service;

import com.corp.mapapp.medage.client.MedAgeAPI;
import com.corp.mapapp.medage.config.AppConfiguration;
import com.corp.mapapp.medage.model.MedianAge;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class MedAgeService {

    @Inject
    @RestClient
    MedAgeAPI medAgeAPI;

    @Inject
    AppConfiguration appConfiguration;

    public Uni<MedianAge> getMedianAge(String location, boolean pagingInHeader,
                                       String format, String startYear, String endYear,
                                       String variants, String sexes) {
        String indicator = appConfiguration.dataportal().indicator();

        return medAgeAPI.getMedianAge(indicator, location, startYear, endYear,
                variants, sexes, pagingInHeader, format).onItem().transform(r -> r.getData().get(0));

    }
}
