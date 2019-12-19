package com.linka39.service;

import com.linka39.entity.PhoneBook;

import java.util.List;

public interface PhoneBookService {
    /**
     * 电话簿service接口
     */
    public List<PhoneBook> loadByInitial(String initial);

    /**
     * 添加通讯记录
     */
    Integer add(PhoneBook phoneBook);
}
