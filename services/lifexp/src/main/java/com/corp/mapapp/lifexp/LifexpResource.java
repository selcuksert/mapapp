package com.corp.mapapp.lifexp;

import com.corp.mapapp.lifexp.model.LifeExpectation;
import com.corp.mapapp.lifexp.service.LifexpService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestQuery;

@Path("/lifexp")
public class LifexpResource {

    @Inject
    LifexpService lifexpService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<LifeExpectation> lifeExpectations(@RestQuery String location,
                                                 @RestQuery String format, @RestQuery String startYear, @RestQuery String endYear,
                                                 @RestQuery String variants, @RestQuery String sexes) {
        return lifexpService.getLifeExpectation(
                location,
                false,
                format,
                startYear,
                endYear,
                variants,
                sexes);
    }
}
