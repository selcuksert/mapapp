package com.corp.mapapp.fertility;

import com.corp.mapapp.fertility.model.Fertility;
import com.corp.mapapp.fertility.service.FertilityService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestQuery;

@Path("/fertility")
public class FertilityResource {

    @Inject
    FertilityService fertilityService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Fertility> married(@RestQuery String location,
                                  @RestQuery String format, @RestQuery String startYear, @RestQuery String endYear,
                                  @RestQuery String variants) {
        return fertilityService.getFertility(
                location,
                false,
                format,
                startYear,
                endYear,
                variants);
    }
}
