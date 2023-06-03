package com.corp.mapapp.medage;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class MedAgeResourceTest {

    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/api/medage")
          .then()
             .statusCode(200)
             .body(is("Hello from RESTEasy Reactive"));
    }

}