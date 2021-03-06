package com.linka39.config;

import com.linka39.interceptor.SysInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration标注在类上，相当于把该类作为spring的xml配置文件中的<beans>
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {
    /**
     * 配置服务端跨域访问
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .allowedMethods("GET","HEAD","POST","PUT","DELETE")
                .maxAge(3600);
    }
    /**
     * 配置拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] patterns = new String[]{
                "/login","/*.html","/image"
        };
        registry.addInterceptor(new SysInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }

    /**
     * 映射服务器资源
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**").addResourceLocations("file:E:\\img\\");
        // linux路径    file:/home/userImages/
        registry.addResourceHandler("/image/**").addResourceLocations("file:/home/userImages/");
    }
}
