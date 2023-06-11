package com.corp.mapapp.cacheloc.service;

import com.corp.mapapp.cacheloc.client.LocationAPI;
import com.corp.mapapp.cacheloc.config.AppConfig;
import com.corp.mapapp.cacheloc.model.Location;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.replicatedmap.ReplicatedMap;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.Comparator;
import java.util.List;

@ApplicationScoped
public class CacheService {

    @Inject
    @RestClient
    LocationAPI locationAPI;

    @Inject
    AppConfig appConfig;

    @Inject
    HazelcastInstance hazelcastInstance;

    private void add(Location location) {
        ReplicatedMap<Integer, Location> locationMap = hazelcastInstance.getReplicatedMap(appConfig.mapName());
        locationMap.putIfAbsent(location.getId(), location);
    }

    public Multi<Location> all() {
        ReplicatedMap<Integer, Location> locationMap = hazelcastInstance.getReplicatedMap(appConfig.mapName());
        if (locationMap.isEmpty()) {
            locationAPI.getLocations("name").forEach(this::add);
        }

        List<Location> locations = locationMap.values().stream()
                .sorted(Comparator.comparing(Location::getName))
                .toList();

        return Multi.createFrom().iterable(locations);
    }
}
