package com.corp.mapapp.medage;

import com.corp.mapapp.medage.model.MedianAge;
import com.corp.mapapp.medage.service.MedAgeService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestQuery;

@Path("/medage")
public class MedAgeResource {

    @Inject
    MedAgeService medAgeService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<MedianAge> population(@RestQuery String location,
                                     @RestQuery String format, @RestQuery String startYear, @RestQuery String endYear,
                                     @RestQuery String variants, @RestQuery String sexes) {
        return medAgeService.getMedianAge(
                location,
                false,
                format,
                startYear,
                endYear,
                variants,
                sexes);
    }
}
