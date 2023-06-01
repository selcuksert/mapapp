package com.corp.mapapp.lifexp;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class LifexpResourceTest {

    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/api/lifexp")
          .then()
             .statusCode(200)
             .body(is("Hello from RESTEasy Reactive"));
    }

}