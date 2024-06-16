package org.acme;

import java.util.List;
import org.acme.Project;

public interface UserService {
    List<Project> findProjectsByUserId(String userId);
}
