package com.corp.mapapp.location.service;

import com.corp.mapapp.location.client.LocationAPI;
import com.corp.mapapp.location.model.Location;
import com.corp.mapapp.location.model.Locations;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.Comparator;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;

@ApplicationScoped
public class LocationService {

    @Inject
    @RestClient
    LocationAPI locationAPI;

    public Multi<Location> getLocations(boolean pagingInHeader, String sort, String format) {
        Multi<Locations> multi = Multi.createBy()
                .repeating()
                .uni(AtomicInteger::new, page -> locationAPI.getLocations(page.incrementAndGet(), pagingInHeader, sort, format))
                .until(Objects::isNull).onFailure().recoverWithCompletion();

        // Sort according to location name
        return multi.onItem()
                .transformToMultiAndConcatenate(l -> Multi.createFrom().iterable(l.getData()
                        .stream().sorted(Comparator.comparing(Location::getName)).toList()));
    }
}
