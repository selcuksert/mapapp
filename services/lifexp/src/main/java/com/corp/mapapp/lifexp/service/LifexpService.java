package com.corp.mapapp.lifexp.service;

import com.corp.mapapp.lifexp.client.LifexpAPI;
import com.corp.mapapp.lifexp.model.LifeExpectation;
import com.corp.mapapp.lifexp.model.LifeExpectations;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;

@ApplicationScoped
public class LifexpService {

    @Inject
    @RestClient
    LifexpAPI lifexpAPI;

    public Multi<LifeExpectation> getLifeExpectation(String indicator, String location, boolean pagingInHeader,
                                                     String format, String startYear, String endYear,
                                                     String variants, String sexes) {
        Multi<LifeExpectations> multi = Multi.createBy()
                .repeating()
                .uni(AtomicInteger::new, page ->
                        lifexpAPI.getLifeExpectation(
                                indicator,
                                location,
                                page.incrementAndGet(),
                                pagingInHeader,
                                format,
                                startYear,
                                endYear,
                                variants,
                                sexes
                        ))
                .until(Objects::isNull).onFailure().recoverWithCompletion();

        return multi.onItem()
                .transformToMultiAndConcatenate(l ->
                        Multi.createFrom().iterable(l.getData()));
    }
}
