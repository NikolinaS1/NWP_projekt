package org.acme;

import org.jboss.resteasy.annotations.providers.multipart.PartType;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import java.io.InputStream;

public class ImageForm {
    @FormParam("file")
    @PartType("application/octet-stream")
    public InputStream file;

    @FormParam("fileName")
    @PartType("text/plain")
    public String fileName;
}
