package com.linka39;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = "com.linka39.mapper")
public class PhonebookApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhonebookApplication.class, args);
    }

}
