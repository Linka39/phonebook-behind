package com.linka39.controller;

import com.linka39.constant.SystemConstant;
import com.linka39.entity.Admin;
import com.linka39.entity.R;
import com.linka39.service.AdminService;
import com.linka39.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 管理员登录Controller
 */

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private AdminService adminService;

    /**
     * 管理员登录
     * @return
     * @throws Exception
     */
    @RequestMapping("/login1")
    public String login()throws Exception{
        return "login";
    }
    @RequestMapping("/login")
    //RequestBody 自动解析json串
    public R login(@RequestBody Admin admin)throws Exception{
        Admin a = adminService.login(admin);
        R r = new R();
        if(a==null){
            return R.error("用户名或者密码错误");
        }else{
            String token=JwtUtils.createJWT(String.valueOf(a.getId()),a.getUserName(), SystemConstant.JWT_TTL);
            r.put("token",token);
        }
        return r;
    }
}
