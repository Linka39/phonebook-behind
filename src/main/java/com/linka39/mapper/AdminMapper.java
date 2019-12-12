package com.linka39.mapper;


import com.linka39.entity.Admin;

public interface AdminMapper {
    /**
     * 管理员登录
     * @param admin
     * @return
     */
    Admin login(Admin admin);
}
