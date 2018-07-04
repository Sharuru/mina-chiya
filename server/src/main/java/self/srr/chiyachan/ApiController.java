package self.srr.chiyachan;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

//TODO: using interceptor to print the log

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
    public String forwardRequest(HttpServletRequest request, @RequestHeader HttpHeaders rawHeaders, @RequestBody String rawJsonStr) throws IOException {

        log.info("===== NEW REQUEST START");

        ResponseModel model = new ResponseModel();
        ObjectMapper mapper = new ObjectMapper();
        String bizResponseStr = "";

        String requestEndpoint = request.getHeader("CHIYA-ENDPOINT");

        log.info("Request endpoint: " + requestEndpoint);

        if (StringUtils.isEmpty(requestEndpoint) || !requestEndpoint.equalsIgnoreCase(appProperties.getAllowedEndpoint())) {
            model.setCode("-1");
            model.setMessage("Request endpoint is not allowed.");

            log.info("Request endpoint: " + requestEndpoint + " is not allowed.");

        } else {
            String endpointTarget = request.getRequestURI();
            String trueEndpoint = requestEndpoint + endpointTarget.substring(endpointTarget.indexOf(BOUND_URL) + BOUND_URL.length());

            log.info("Forward request to: " + trueEndpoint);
            log.info("With params: " + rawJsonStr.replaceAll("([\\r\\n])", ""));

            RestTemplate restTemplate = new RestTemplate();

            HttpEntity<String> entity = new HttpEntity<>(rawJsonStr, rawHeaders);

            bizResponseStr = restTemplate.postForObject(trueEndpoint, entity, String.class);

            log.info("Get response: " + bizResponseStr);
        }

        ObjectNode baseNode = (ObjectNode) mapper.readTree(mapper.writeValueAsString(model));
        ObjectNode bizNode = (ObjectNode) mapper.readTree(bizResponseStr);

        JsonNode merged = baseNode.set("content", bizNode);

        log.info("===== NEW REQUEST END");
        return mapper.writeValueAsString(merged);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public String defaultExceptionHandler(Exception ex) throws JsonProcessingException {
        log.info("===== EXCEPTION DETECTED START");
        log.error(String.valueOf(ex));
        ObjectMapper mapper = new ObjectMapper();
        ResponseModel model = new ResponseModel();
        model.setCode("-1");
        model.setMessage("Exception happened: " + ex.getMessage());
        log.info("===== EXCEPTION DETECTED END");
        return mapper.writeValueAsString(model);
    }
}
