package com.corp.mapapp;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class MarriedResourceTest {

    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/api/married")
          .then()
             .statusCode(200)
             .body(is("Hello from RESTEasy Reactive"));
    }

}