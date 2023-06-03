package com.corp.mapapp.married.service;

import com.corp.mapapp.married.client.MarriedAPI;
import com.corp.mapapp.married.config.AppConfiguration;
import com.corp.mapapp.married.model.Married;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class MarriedService {

    @Inject
    @RestClient
    MarriedAPI marriedAPI;

    @Inject
    AppConfiguration appConfiguration;

    public Uni<Married> getMarried(String location, boolean pagingInHeader,
                                     String format, String startYear, String endYear,
                                     String variants) {
        String indicator = appConfiguration.dataportal().indicator();

        return marriedAPI.getMarried(indicator, location, startYear, endYear,
                variants, pagingInHeader, format).onItem().transform(r -> r.getData().get(0));

    }
}
