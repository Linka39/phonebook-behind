package com.linka39.controller;


import com.linka39.util.DateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * 图片上传控制器
 */
@RestController
@RequestMapping("/")
public class ImagController {
    //通过配置文件注入
    @Value("${imageFilePath}")
    private String imageFilePath;

    /**
     * 上传图片
     * @param file
     * @return
     * @throws Exception
     */
    @RequestMapping("/uploadImage")
    public Map<String,Object> uploadImage(MultipartFile file) throws Exception{
        Map<String,Object> map=new HashMap<>();
        if(!file.isEmpty()){
            String fileName=file.getOriginalFilename();
            String suffixName=fileName.substring(fileName.lastIndexOf("."));//图片后缀
            String newFileName= DateUtil.getCurrentDateStr()+suffixName;
            //将数据流转换为文件
            FileUtils.copyInputStreamToFile(file.getInputStream(),new File(imageFilePath+newFileName));

            map.put("code",0);
            map.put("msg","上传成功");
            Map<String,Object> map2=new HashMap<>();
            map2.put("title",newFileName);
            map2.put("src","/image/"+newFileName);
            map.put("data",map2);
        }
        return map;
    }


}
