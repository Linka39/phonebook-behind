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

    /**
     * 添加信息
     * @param phoneBook
     * @return
     */
    Integer add(PhoneBook phoneBook);

    /**
     * 根据id查通讯录信息
     * @param id
     * @return
     */
    PhoneBook findById(Integer id);

    /**
     * 修改通讯录信息
     * @param phoneBook
     * @return
     */
    Integer update(PhoneBook phoneBook);

    /**
     * 删除信息
     * @param id
     * @return
     */
    Integer delete(Integer id);
}
