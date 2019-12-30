package com.linka39.service;

import com.linka39.entity.PhoneBook;

import java.util.List;

public interface PhoneBookService {
    /**
     * 电话簿service接口
     */
    public List<PhoneBook> loadByInitial(String initial,String userName);

    /**
     * 添加通讯记录
     */
    Integer add(PhoneBook phoneBook);

    /**
     * 修改通讯记录
     */
    Integer update(PhoneBook phoneBook);

    /**
     * 获取用户信息
     * @param id
     * @return
     */
    PhoneBook findById(Integer id);

    /**
     * 删除信息
     * @param id
     * @return
     */
    Integer delete(Integer id);
}
