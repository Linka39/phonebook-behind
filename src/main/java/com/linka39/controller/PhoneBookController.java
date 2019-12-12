package com.linka39.controller;

import com.linka39.entity.R;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 电话簿Controller类
 */
@RestController
@RequestMapping("/phoneBook")
public class PhoneBookController {
    /**
     * 查询所有电话簿信息
     * @return
     * @throws Exception
     */
    @RequestMapping("/loadAll")
    public R loadAll() throws Exception{
        return R.ok("电话簿信息");
    }
}
