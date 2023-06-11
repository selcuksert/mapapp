package com.corp.mapapp.cacheloc;

import com.corp.mapapp.cacheloc.model.Location;
import com.corp.mapapp.cacheloc.service.CacheService;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/locations")
public class CacheLocResource {

    @Inject
    CacheService cacheService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Blocking
    public Multi<Location> list() {
        return cacheService.all();
    }

}
