package com.linka39.controller;

import com.linka39.entity.PhoneBook;
import com.linka39.entity.R;
import com.linka39.service.PhoneBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 电话簿Controller类
 * @author linka39_小锋
 * @site www.linka39.com
 * @company Java知识分享网
 * @create 2019-09-12 下午 10:30
 */
@RestController
@RequestMapping("/phoneBook")
public class PhoneBookController {

    @Autowired
    private PhoneBookService phoneBookService;

    /**
     * 查询所有电话簿信息
     * @return
     * @throws Exception
     */
    @RequestMapping("/loadAll")
    public R loadAll()throws Exception{
        Map<String,Object> map=new LinkedHashMap<>();
        char []letters={'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'};
        for(int i=0;i<letters.length;i++){
            String letter=String.valueOf(letters[i]);
            List<PhoneBook> phoneBooks = phoneBookService.loadByInitial(letter);
            if(phoneBooks.size()>0){
                map.put(letter,phoneBooks);
            }
        }
        Map<String,Object> resultMap=new HashMap<>();
        resultMap.put("data",map);
        return R.ok(resultMap);
    }
}
