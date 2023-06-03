package com.corp.mapapp.population.service;

import com.corp.mapapp.population.client.PopulationAPI;
import com.corp.mapapp.population.config.AppConfiguration;
import com.corp.mapapp.population.model.Population;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class PopulationService {

    @Inject
    @RestClient
    PopulationAPI populationAPI;

    @Inject
    AppConfiguration appConfiguration;

    public Uni<Population> getPopulation(String location, boolean pagingInHeader,
                                         String format, String startYear, String endYear,
                                         String variants, String sexes) {
        String indicator = appConfiguration.dataportal().indicator();

        return populationAPI.getPopulation(indicator, location, startYear, endYear,
                variants, sexes, pagingInHeader, format).onItem().transform(r -> r.getData().get(0));

    }
}
