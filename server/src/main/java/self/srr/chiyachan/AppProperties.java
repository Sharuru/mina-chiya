package self.srr.chiyachan;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "chiya")
@EnableConfigurationProperties(AppProperties.class)
public class AppProperties {

    private String allowedEndpoint;
}
