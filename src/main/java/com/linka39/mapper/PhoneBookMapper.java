package com.linka39.mapper;

import com.linka39.entity.PhoneBook;

import java.util.List;

/**
 * 电话簿Mapper接口
 */
public interface PhoneBookMapper {
    /**
     * 根据姓名首字母查询电话簿记录
     */
    List<PhoneBook> loadByInitial(String initial);
}
