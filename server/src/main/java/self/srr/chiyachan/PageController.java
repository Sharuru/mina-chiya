package self.srr.chiyachan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class PageController {

    @Autowired
    BuildProperties buildProperties;

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("version", buildProperties.getVersion().toUpperCase());
        return "index";
    }
}
