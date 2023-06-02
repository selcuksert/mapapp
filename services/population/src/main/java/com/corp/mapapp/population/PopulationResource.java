package com.corp.mapapp.population;

import com.corp.mapapp.population.model.Population;
import com.corp.mapapp.population.service.PopulationService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestQuery;

@Path("/population")
public class PopulationResource {

    @Inject
    PopulationService populationService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Population> population(@RestQuery String location,
                                      @RestQuery String format, @RestQuery String startYear, @RestQuery String endYear,
                                      @RestQuery String variants, @RestQuery String sexes) {
        return populationService.getPopulation(
                location,
                false,
                format,
                startYear,
                endYear,
                variants,
                sexes);
    }
}
