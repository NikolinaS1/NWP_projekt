package org.acme;

import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;

@Path("/gallery")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)
public class GalleryResource {

    private static final String UPLOAD_DIR = "uploads/";

    @Inject
    ImageRepository imageRepository;

    @POST
    @Transactional
    public Response uploadImage(@MultipartForm ImageForm form) {
        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            String filename = System.currentTimeMillis() + "-" + form.fileName;
            Files.copy(form.file, Paths.get(UPLOAD_DIR + filename));

            ImageEntity image = new ImageEntity();
            image.setFilename(filename);
            image.setUrl("/uploads/" + filename); 
            imageRepository.persist(image);

            return Response.ok(image).build();
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/image/{imageName}")
    @Produces({"image/jpeg", "image/png"})
    public Response getImage(@PathParam("imageName") String imageName) {
        File imageFile = new File(UPLOAD_DIR + imageName);
        if (!imageFile.exists()) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity("Image not found")
                           .build();
        }

        try {
            java.nio.file.Path path = imageFile.toPath();
            String mimeType = Files.probeContentType(path);
            return Response.ok(Files.readAllBytes(path))
                           .type(mimeType)
                           .build();
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Failed to read image: " + e.getMessage())
                           .build();
        }
    }

    @GET
    @Path("/images")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllImages() {
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists() || !dir.isDirectory()) {
            return Response.status(Response.Status.NOT_FOUND)
                        .entity("Upload directory not found")
                        .build();
        }

        File[] files = dir.listFiles((dir1, name) -> name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png"));
        if (files == null || files.length == 0) {
            return Response.status(Response.Status.NOT_FOUND)
                        .entity("No images found")
                        .build();
        }

        List<String> imageNames = new ArrayList<>();
        for (File file : files) {
            imageNames.add(file.getName());
        }

        return Response.ok(imageNames)
                    .build();
    }
}
