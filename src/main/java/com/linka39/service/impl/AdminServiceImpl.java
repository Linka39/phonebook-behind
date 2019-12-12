package com.linka39.service.impl;

import com.linka39.entity.Admin;
import com.linka39.mapper.AdminMapper;
import com.linka39.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("adminService")
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminMapper adminMapper;
    @Override
    public Admin login(Admin admin) {
        return adminMapper.login(admin);
    }
}
