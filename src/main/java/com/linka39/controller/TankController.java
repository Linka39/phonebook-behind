package com.linka39.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 静态资源访问测试
 */
@Controller
public class TankController {
    @RequestMapping("/tankGame")
    /*public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView mav = new ModelAndView("static/tankGame/Tank.html");
        return mav;
    }*/
    public String tankUrl(HttpServletRequest request, HttpServletResponse response){
        return "/static/tankGame/Tank.html";
    }
}
