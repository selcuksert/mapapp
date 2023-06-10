package com.corp.mapapp.cacheloc.service;

import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.replicatedmap.ReplicatedMap;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CacheService {

    @Inject
    HazelcastInstance hazelcastInstance;

    public String add(String key, String value) {
        ReplicatedMap<String, String> locationMap = hazelcastInstance.getReplicatedMap("location");
        return locationMap.putIfAbsent(key, value);
    }

    public String get(String key) {
        ReplicatedMap<String, String> locationMap = hazelcastInstance.getReplicatedMap("location");
        return locationMap.get(key);
    }

}
