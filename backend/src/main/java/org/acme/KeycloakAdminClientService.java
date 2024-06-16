import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class KeycloakAdminClientService {

    private Keycloak keycloak;

    public UserRepresentation getUserById(String userId) {
        return keycloak.realm("iit").users().get(userId).toRepresentation();
    }

    public List<UserRepresentation> getAllUsers() {
        return keycloak.realm("iit").users().list();
    }
}
