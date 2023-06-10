package com.corp.mapapp.cacheloc;

import com.corp.mapapp.cacheloc.service.CacheService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/cacheloc")
public class CacheLocResource {

    @Inject
    CacheService cacheService;

    @POST
    @Path("/{key}/{value}")
    @Produces(MediaType.TEXT_PLAIN)
    public String add(@PathParam("key") String key, @PathParam("value") String value) {
        return cacheService.add(key, value);
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String get(@QueryParam("key") String key) {
        return cacheService.get(key);
    }
}
