package com.linka39.service.impl;

import com.linka39.entity.PhoneBook;
import com.linka39.mapper.PhoneBookMapper;
import com.linka39.service.PhoneBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 电话簿service实现类
 */
@Service("phoneBookService")
public class PhoneBookServiceImpl implements PhoneBookService {
    @Autowired
    private PhoneBookMapper phoneBookMapper;

    public List<PhoneBook> loadByInitial(String initial,String userName){
        return phoneBookMapper.loadByInitial(initial,userName);
    }

    @Override
    public Integer add(PhoneBook phoneBook) {
        return phoneBookMapper.add(phoneBook);
    }

    @Override
    public PhoneBook findById(Integer id) {
        return phoneBookMapper.findById(id);
    }

    @Override
    public Integer update(PhoneBook phoneBook) {
        return phoneBookMapper.update(phoneBook);
    }

    @Override
    public Integer delete(Integer id) {
        return phoneBookMapper.delete(id);
    }
}
