package com.corp.mapapp.lifexp.client;

import com.corp.mapapp.lifexp.model.LifeExpectations;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "dataportal")
public interface LifexpAPI {
    @GET
    @Path("/indicators/{indicator}/locations/{location}")
    Uni<LifeExpectations> getLifeExpectation(@PathParam("indicator") String indicator,
                                             @PathParam("location") String location,
                                             @QueryParam("pageNumber") int pageNumber,
                                             @QueryParam("pagingInHeader") boolean pagingInHeader,
                                             @QueryParam("format") String format,
                                             @QueryParam("startYear") String startYear,
                                             @QueryParam("endYear") String endYear,
                                             @QueryParam("variants") String variants,
                                             @QueryParam("sexes") String sexes);
}
