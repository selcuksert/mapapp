package com.corp.mapapp.married.client;

import com.corp.mapapp.married.model.Response;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "dataportal")
public interface MarriedAPI {
    @GET
    @Path("/indicators/{indicator}/locations/{location}")
    Uni<Response> getMarried(@PathParam("indicator") String indicator,
                             @PathParam("location") String location,
                             @QueryParam("startYear") String startYear,
                             @QueryParam("endYear") String endYear,
                             @QueryParam("variants") String variants,
                             @QueryParam("pagingInHeader") boolean pagingInHeader,
                             @QueryParam("format") String format);
}
