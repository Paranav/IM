package com.genAIDemoProject.incidentManager.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.genAIDemoProject.incidentManager.client.EmbeddingClient;
import com.genAIDemoProject.incidentManager.model.Incident;
import com.genAIDemoProject.incidentManager.repository.IncidentRepository;
import com.genAIDemoProject.incidentManager.service.IncidentService;
import com.genAIDemoProject.incidentManager.util.Utility;

@Service
public class IncidentServiceImpl implements IncidentService {

	@Autowired
	private IncidentRepository incidentRepo;

	@Autowired
	private EmbeddingClient embedClient;

	@Autowired
	private NamedParameterJdbcTemplate jdbc;

	private RestTemplate rest = new RestTemplate();

	@Override
	public Incident saveIncident(Incident incident) {

		return incidentRepo.save(incident);
	}

	@Override
	public List<Incident> getAllIncident() {
		return incidentRepo.findAll();
	}

	public Incident createIncident(String text) {
		float[] emb = embedClient.getEmbedding(text);
		String embStr = Utility.toPgVectorString(emb); // "[0.1, 0.2, ...]"

		String sql = "INSERT INTO incident (text, embedding) VALUES (:text, CAST(:emb AS vector)) RETURNING id";
		MapSqlParameterSource params = new MapSqlParameterSource().addValue("text", text).addValue("emb", embStr);

		Number id = jdbc.queryForObject(sql, params, Integer.class);
		Incident i = new Incident();
		i.setId(id.longValue());
		i.setText(text);
		return i;
	}

	public List<Incident> querySimilar(String query, int limit) {
		float[] qEmb = embedClient.getEmbedding(query);
		String embStr = Utility.toPgVectorString(qEmb);
		return incidentRepo.findSimilarIncident(embStr, limit);
	}

	public String ask(String query) {
		List<Incident> matches = querySimilar(query, 5);
		List<String> texts = matches.stream().map(Incident::getText).collect(Collectors.toList());

		Map<String, Object> body = Map.of("query", query, "incidents", texts);
		Map resp = rest.postForObject("http://localhost:8001/ask", body, Map.class);
		return (String) resp.get("answer");
	}

	@Override
	public void createIncident(List<Incident> incidents) {
		incidents.forEach(i -> createIncident(i.getText()));
	}

	@Override
	public void removeIncident(Long id) {

		incidentRepo.deleteById(id);

	}

}
