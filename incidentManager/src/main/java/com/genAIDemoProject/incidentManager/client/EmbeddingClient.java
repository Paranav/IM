package com.genAIDemoProject.incidentManager.client;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmbeddingClient {
    private final RestTemplate rest;

    public EmbeddingClient() {
        this.rest = new RestTemplate();
    }

    public float[] getEmbedding(String text) {
        Map<String,String> body = Map.of("text", text);
        Map resp = rest.postForObject("http://localhost:8000/embed", body, Map.class);
        List<Double> emb = (List<Double>) ((Map) resp).get("embedding");
        float[] vec = new float[emb.size()];
        for (int i = 0; i < emb.size(); i++) vec[i] = emb.get(i).floatValue();
        return vec;
    }
}
