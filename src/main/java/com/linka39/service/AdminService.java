package com.linka39.service;

import com.linka39.entity.Admin;

/**
 * 管理员Service接口
 */
public interface AdminService {
    /**
     * 管理员登录
     * @param admin
     * @return
     */
    public Admin login(Admin admin);
}
