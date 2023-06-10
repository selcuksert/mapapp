package com.corp.mapapp.cacheloc.config;

import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientConnectionStrategyConfig;
import com.hazelcast.client.config.ConnectionRetryConfig;
import com.hazelcast.core.HazelcastInstance;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

@ApplicationScoped
public class HazelcastConfig {

    @Inject
    AppConfig appConfig;

    @Produces
    public HazelcastInstance hazelcastInstance() {
        ClientConfig clientConfig = new ClientConfig();
        String[] members = appConfig.hazelcast().members().toArray(new String[0]);
        clientConfig.getNetworkConfig().addAddress(members);
        clientConfig.setClusterName(appConfig.hazelcast().clusterName());
        ClientConnectionStrategyConfig connectionStrategyConfig = clientConfig.getConnectionStrategyConfig();
        ConnectionRetryConfig connectionRetryConfig = connectionStrategyConfig.getConnectionRetryConfig();
        connectionRetryConfig.setInitialBackoffMillis(appConfig.hazelcast().retryConfig().initialBackoffMillis())
                .setMaxBackoffMillis(appConfig.hazelcast().retryConfig().maxBackoffMillis())
                .setMultiplier(appConfig.hazelcast().retryConfig().multiplier())
                .setClusterConnectTimeoutMillis(appConfig.hazelcast().retryConfig().clusterConnectTimeoutMillis())
                .setJitter(appConfig.hazelcast().retryConfig().jitter());
        connectionStrategyConfig.setAsyncStart(false)
                .setReconnectMode(ClientConnectionStrategyConfig.ReconnectMode.ASYNC);

        return HazelcastClient.newHazelcastClient(clientConfig);
    }
}
