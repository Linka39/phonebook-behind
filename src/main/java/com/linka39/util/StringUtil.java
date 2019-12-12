package com.linka39.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 字符串工具类
 * @author
 *
 */
public class StringUtil {

    /**
     * 判断是否是空
     * @param str
     * @return
     */
    public static boolean isEmpty(String str){
        if(str==null||"".equals(str.trim())){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 判断是否不是空
     * @param str
     * @return
     */
    public static boolean isNotEmpty(String str){
        if((str!=null)&&!"".equals(str.trim())){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 格式化模糊查询
     * @param str
     * @return
     */
    public static String formatLike(String str){
        if(isNotEmpty(str)){
            return "%"+str+"%";
        }else{
            return null;
        }
    }

    /**
     * 过滤掉集合里的空格
     * @param list
     * @return
     */
    public static List<String> filterWhite(List<String> list){
        List<String> resultList=new ArrayList<String>();
        for(String l:list){
            if(isNotEmpty(l)){
                resultList.add(l);
            }
        }
        return resultList;
    }

    /**
     * 去除html标签
     */
    public static String stripHtml(String content) {
        // <p>段落替换为换行
        content = content.replaceAll("<p .*?>", "\r\n");
        // <br><br/>替换为换行
        content = content.replaceAll("<br\\s*/?>", "\r\n");
        // 去掉其它的<>之间的东西
        content = content.replaceAll("\\<.*?>", "");
        // 去掉空格
        content = content.replaceAll(" ", "");
        return content;
    }

    /**
     * 生成六位随机数
     * @return
     */
    public static String genSixRandomNum(){
        Random random = new Random();
        String result="";
        for (int i=0;i<6;i++)
        {
            result+=random.nextInt(10);
        }
        return result;
    }



}
