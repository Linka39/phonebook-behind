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

    public List<PhoneBook> loadByInitial(String initial){
        return phoneBookMapper.loadByInitial(initial);
    }

}
