package com.portfolio.controller;

import com.portfolio.model.Project;
import com.portfolio.service.ProjectService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Project> createProject(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("url") String url,
            @RequestParam("tags") String tags,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setProjectUrl(url);
        project.setTags(tags);

        if (image != null && !image.isEmpty()) {
            project.setImageData(image.getBytes());
            project.setImageContentType(image.getContentType());
        }

        return ResponseEntity.ok(projectService.createProject(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
