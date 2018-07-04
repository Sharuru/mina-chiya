package self.srr.chiyachan;

import lombok.Data;

@Data
public class ResponseModel {

    private String code = "0";

    private String message = "success";

    private String content = "";

}
