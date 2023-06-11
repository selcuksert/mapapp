package com.corp.mapapp.cacheloc.config;

import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientConnectionStrategyConfig;
import com.hazelcast.client.config.ConnectionRetryConfig;
import com.hazelcast.core.HazelcastInstance;
import io.quarkus.runtime.configuration.ConfigUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import java.util.List;

@ApplicationScoped
public class HazelcastConfig {

    private static final Logger LOG = Logger.getLogger(HazelcastConfig.class);

    @Inject
    AppConfig appConfig;

    @Produces
    public HazelcastInstance hazelcastInstance() {
        ClientConfig clientConfig = new ClientConfig();

        List<String> profiles = ConfigUtils.getProfiles();
        profiles.forEach(profile -> LOG.infov("Active profile: {0}", profile));
        LOG.infov("Hazelcast cluster name: {0}", appConfig.hazelcast().clusterName());

        // Production uses k8s, development uses docker-compose for Hazelcast cluster
        if (ConfigUtils.getProfiles().contains("prod")) {
            clientConfig.getNetworkConfig().getKubernetesConfig().setEnabled(true);
            clientConfig.getNetworkConfig().getKubernetesConfig().setProperty("service-name", "hazelcast-cluster");
        } else {
            String[] members = appConfig.hazelcast().members().toArray(new String[0]);
            clientConfig.getNetworkConfig().addAddress(members);
        }

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
