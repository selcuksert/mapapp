package com.corp.mapapp.cacheloc.client;

import com.corp.mapapp.cacheloc.model.Location;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;

@RegisterRestClient(configKey = "location")
public interface LocationAPI {
    @GET
    @Path("/locations")
    List<Location> getLocations(@QueryParam("sort") String sort);
}
