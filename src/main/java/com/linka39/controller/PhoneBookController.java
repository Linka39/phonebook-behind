package com.linka39.controller;

import com.linka39.entity.PhoneBook;
import com.linka39.entity.R;
import com.linka39.service.PhoneBookService;
import com.linka39.util.PinYinUtil;
import com.linka39.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 电话簿Controller类
 * @author linka39
 * @site www.linka39.com
 * @create 2019-09-12 下午 10:30
 */
@RestController
@RequestMapping("/phoneBook")
public class PhoneBookController {

    @Autowired
    private PhoneBookService phoneBookService;

    /**
     * 查询所有电话簿信息
     * @return
     * @throws Exception
     */
    @RequestMapping("/loadAll")
    public R loadAll()throws Exception{
        //LinkedHashMap相对有序
        Map<String,Object> map=new LinkedHashMap<>();
        char []letters={'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'};
        for(int i=0;i<letters.length;i++){
            String letter=String.valueOf(letters[i]);
            List<PhoneBook> phoneBooks = phoneBookService.loadByInitial(letter);
            if(phoneBooks.size()>0){
                map.put(letter,phoneBooks);
            }
        }
        Map<String,Object> resultMap=new HashMap<>();
        resultMap.put("data",map);
        return R.ok(resultMap);
    }

    /**
     * 添加或修改通讯记录
     * @param phoneBook
     * @return
     * @throws Exception
     */
    @RequestMapping("/save")
    public R save(@RequestBody PhoneBook phoneBook) throws Exception{
        int resultTotal=0;
        //获取拼音首字母并将其转换为大写
        String initial = String.valueOf(PinYinUtil.getPinYin(phoneBook.getName()).charAt(0)).toUpperCase() ;
        if(StringUtil.isAlpha(initial)){
            phoneBook.setInitial(initial);
        }else {
            phoneBook.setInitial("#");
        }
        //判断添加,修改
        if(phoneBook.getId()==null){
            resultTotal = phoneBookService.add(phoneBook);
        }else {
            resultTotal = phoneBookService.update(phoneBook);
        }
        if(resultTotal>0){
            return R.ok();
        }else {
            return R.error(-1,"保存失败，请联系管理员！");
        }
    }

    /**
     * 根据id查询电话簿信息
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping("/findById")
    public R findById(Integer id)throws Exception{
        PhoneBook phoneBook=phoneBookService.findById(id);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("phoneBook",phoneBook);
        return R.ok(resultMap);
    }

    /**
     * 根据id来删除信息
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping("/delete")
    public R delete(Integer id)throws Exception{
        int resultTotal= phoneBookService.delete(id);
        if(resultTotal>0){
            return R.ok();
        }else{
            return R.error(-1,"删除失败");
        }
    }
}
