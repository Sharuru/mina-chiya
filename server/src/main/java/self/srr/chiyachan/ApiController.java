package self.srr.chiyachan;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequestMapping(value = ApiController.BOUND_URL)
public class ApiController {

    static final String BOUND_URL = "/api";

    private final AppProperties appProperties;

    @Autowired
    public ApiController(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @ResponseBody
    @RequestMapping(value = "**", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String forwardRequest(HttpServletRequest request, @RequestHeader HttpHeaders rawHeaders, @RequestBody String rawJsonStr) {


        String baseUrl = request.getHeader("CHIYA-TARGET");
        if (StringUtils.isEmpty(baseUrl) || !baseUrl.equalsIgnoreCase(appProperties.getBaseUrl())) {
            log.info("Base url: " + baseUrl + " is not allowed.");
            return "{\"Chiya\" : \"?\"}";
        } else {
            String rawUrl = request.getRequestURI();
            String trueUrl = baseUrl + rawUrl.substring(rawUrl.indexOf(BOUND_URL) + BOUND_URL.length());

            log.info("===== REQUEST BEGIN");
            log.info("To: " + rawUrl);
            log.info("Forward to: " + trueUrl);
            log.info("With: " + rawJsonStr.replaceAll("([\\r\\n])", ""));
            log.info("===== REQUEST END");

            RestTemplate restTemplate = new RestTemplate();

            HttpEntity<String> entity = new HttpEntity<>(rawJsonStr, rawHeaders);

            return restTemplate.postForObject(
                    trueUrl,
                    entity,
                    String.class);
        }
    }
}
