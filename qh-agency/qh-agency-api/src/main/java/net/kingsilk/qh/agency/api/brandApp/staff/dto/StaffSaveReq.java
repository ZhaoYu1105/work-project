package net.kingsilk.qh.agency.api.brandApp.staff.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;

import javax.ws.rs.QueryParam;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@ApiModel(
        description = "商品信息"
)
public class StaffSaveReq {

    /**
     * 账户
     */
    @ApiParam(value = "用户id")
    @QueryParam(value = "userId")
    private String userId;
    /**
     * 真实姓名。 第一次创建时从 UserDetails 中复制得来
     */
    @ApiParam(value = "用户姓名")
    @QueryParam(value = "realName")
    private String realName;

    @ApiParam(value = "用户电话 ")
    @QueryParam(value = "phone")
    private String phone;

    @ApiParam(value = "用户组Id")
    @QueryParam(value = "staffGroupIds")
    private List<String> staffGroupIds = new ArrayList<String>();
    /**
     * 是否已经禁用。
     * <p>
     * true - 已经禁用。
     */
    @ApiParam(value = "是否禁用")
    @QueryParam(value = "disabled")
    private boolean disabled;

    @ApiParam(value = "备注")
    @QueryParam(value = "memo")
    private String memo;


    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getStaffGroupIds() {
        return staffGroupIds;
    }

    public void setStaffGroupIds(List<String> staffGroupIds) {
        this.staffGroupIds = staffGroupIds;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }
}
