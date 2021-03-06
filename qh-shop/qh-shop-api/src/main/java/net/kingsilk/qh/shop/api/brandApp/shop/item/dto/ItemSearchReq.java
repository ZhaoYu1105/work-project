package net.kingsilk.qh.shop.api.brandApp.shop.item.dto;

import io.swagger.annotations.ApiParam;
import net.kingsilk.qh.shop.api.UniPageReq;

import javax.ws.rs.QueryParam;

public class ItemSearchReq extends UniPageReq {


    @ApiParam(value = "类型", required = false)
    @QueryParam(value = "type")
    private String type;
    private String sortBy = "dateCreated";
    @ApiParam(value = "商品分类", required = false)
    @QueryParam(value = "categoryId")
    private String categoryId;

    @ApiParam(value = "关键字", required = false)
    @QueryParam(value = "keyWord")
    private String keyWord;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }
}
