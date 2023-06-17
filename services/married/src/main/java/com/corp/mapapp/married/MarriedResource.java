package com.corp.mapapp.married;

import com.corp.mapapp.married.model.Married;
import com.corp.mapapp.married.service.MarriedService;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestQuery;

@Path("/married")
public class MarriedResource {
    @Inject
    MarriedService marriedService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"admin", "user"})
    public Uni<Married> married(@RestQuery String location,
                                @RestQuery String format, @RestQuery String startYear, @RestQuery String endYear,
                                @RestQuery String variants) {
        return marriedService.getMarried(
                location,
                false,
                format,
                startYear,
                endYear,
                variants);
    }
}
