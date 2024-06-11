package org.acme;

import org.acme.ImageEntity;

public class Image {
    private Long id;
    private String filename;
    private String url;

    public Image() {}

    public Image(Long id, String filename, String url) {
        this.id = id;
        this.filename = filename;
        this.url = url;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return this.filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ImageEntity toEntity() {
        return new ImageEntity();
    }
}
