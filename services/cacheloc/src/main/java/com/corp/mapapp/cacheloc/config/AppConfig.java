package com.corp.mapapp.cacheloc.config;


import io.smallrye.config.ConfigMapping;
import io.smallrye.config.WithDefault;

import java.util.List;

@ConfigMapping(prefix = "cacheloc")
public interface AppConfig {
    Hazelcast hazelcast();

    /**
     * Hazelcast client configuration
     */
    interface Hazelcast {

        /**
         * Name of Hazelcast cluster
         *
         * @return cluster name
         */
        String clusterName();

        /**
         * Member list of nodes that form Hazelcast cluster
         * in ip:port format
         *
         * @return member list
         */
        List<String> members();

        RetryConfig retryConfig();

        /**
         * Retry configuration for Hazelcast client
         *
         * @see <a href="https://docs.hazelcast.com/hazelcast/5.2/clients/java#java-client-connection-strategy">Java Client Connection Strategy</a>
         */
        interface RetryConfig {
            /**
             * Specifies how long to wait (backoff), in milliseconds, after the first failure before retrying.
             *
             * @return initialBackoffMillis
             */
            @WithDefault("1000")
            int initialBackoffMillis();

            /**
             * Specifies the upper limit for the backoff in milliseconds.
             *
             * @return maxBackoffMillis
             */
            @WithDefault("30000")
            int maxBackoffMillis();

            /**
             * Factor to multiply the backoff after a failed retry. Its default value is 1.05.
             *
             * @return multiplier
             */
            @WithDefault("1.05")
            double multiplier();

            /**
             * Timeout value in milliseconds for the client to give up to connect to the current cluster.
             * Its default value is -1, infinite. For the default value, client will not stop
             * trying to connect to the target cluster (infinite timeout).
             * If the failover client is used with the default value of this configuration element,
             * the failover client will try to connect alternative clusters after 120000 ms (2 minutes).
             * For any other value, both the client and the failover client will use this as it is.
             *
             * @return clusterConnectTimeoutMillis
             */
            @WithDefault("-1")
            long clusterConnectTimeoutMillis();

            /**
             * Specifies by how much to randomize backoffs.
             *
             * @return jitter
             */
            @WithDefault("0")
            double jitter();
        }
    }
}
