package com.corp.mapapp.location.client;

import com.corp.mapapp.location.model.Locations;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Path("/locations")
@RegisterRestClient(configKey = "dataportal")
public interface LocationAPI {
    @GET
    Uni<Locations> getLocations(@QueryParam("pageNumber") int pageNumber,
                                @QueryParam("pagingInHeader") boolean pagingInHeader,
                                @QueryParam("sort") String sort,
                                @QueryParam("format") String format);
}
