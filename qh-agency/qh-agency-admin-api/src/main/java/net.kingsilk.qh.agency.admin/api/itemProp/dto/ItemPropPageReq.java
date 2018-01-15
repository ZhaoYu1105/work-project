package net.kingsilk.qh.agency.admin.api.itemProp.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import net.kingsilk.qh.agency.admin.api.common.dto.BasePageReq;

import javax.ws.rs.QueryParam;

/**
 * Created by tpx on 17-3-16.
 */
@ApiModel(value = "商品属性分页请求信息")
public class ItemPropPageReq extends BasePageReq {


    @ApiParam(value = "属性名称")
    @QueryParam(value = "name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}