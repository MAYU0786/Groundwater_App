// ControllerGWL.java
package com.example.groundwater.GWL_Predictor;

import java.io.IOException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // optional, needed for frontend
public class ControllerGWL {

    private final PredictionService predictionService;

    public ControllerGWL(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/gwl")
    public String predictGWl(@RequestBody GWL_Features features) throws IOException, InterruptedException {
        return predictionService.predictGWL(features);
    }
}
