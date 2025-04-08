package com.example.groundwater.GWL_Predictor;

import lombok.Data;

@Data
public class GWL_Features {

    private double rainfall;
    private double maxTemperature;
    private double minTemperature;
    private double morningHumidity;
    private double eveningHumidity;
    private double postMonsoon;
    private double preMonsoon;

    public double getPostMonsoon() {
        return postMonsoon;
    }

    public void setPostMonsoon(int postMonsoon) {
        this.postMonsoon = postMonsoon;
    }

    public double getPreMonsoon() {
        return preMonsoon;
    }

    public void setPreMonsoon(int preMonsoon) {
        this.preMonsoon = preMonsoon;
    }

    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }

    public double getMaxTemperature() {
        return maxTemperature;
    }

    public void setMaxTemperature(double maxTemperature) {
        this.maxTemperature = maxTemperature;
    }

    public double getMinTemperature() {
        return minTemperature;
    }

    public void setMinTemperature(double minTemperature) {
        this.minTemperature = minTemperature;
    }

    public double getMorningHumidity() {
        return morningHumidity;
    }

    public void setMorningHumidity(double morningHumidity) {
        this.morningHumidity = morningHumidity;
    }

    public double getEveningHumidity() {
        return eveningHumidity;
    }

    public void setEveningHumidity(double eveningHumidity) {
        this.eveningHumidity = eveningHumidity;
    }

    public GWL_Features(double rainfall, double maxTemperature, double minTemperature, double morningHumidity,
                        double eveningHumidity) {
        super();
        this.rainfall = rainfall;
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.morningHumidity = morningHumidity;
        this.eveningHumidity = eveningHumidity;
    }



}

