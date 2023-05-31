package com.corp.mapapp.location;

import com.corp.mapapp.location.model.Location;
import com.corp.mapapp.location.service.LocationService;
import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/location")
public class LocationResource {

    @Inject
    LocationService locationService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Multi<Location> locations() {
        return locationService.getLocations(false, "id", "json");
    }
}
