package net.kingsilk.qh.agency.wap.api.cart.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
public class CartNumResp {


    @ApiModelProperty(value = "商品总数")
    private int totalNum;
    @ApiModelProperty(value = "商品类型数量")
    private int typeNum;

    public int getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(int totalNum) {
        this.totalNum = totalNum;
    }

    public int getTypeNum() {
        return typeNum;
    }

    public void setTypeNum(int typeNum) {
        this.typeNum = typeNum;
    }
}