package net.kingsilk.qh.agency.api.brandApp.staff.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import net.kingsilk.qh.agency.api.common.dto.StaffGroupModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by tpx on 17-3-20.
 */
@ApiModel(value = "StaffInfoResp")
public class StaffInfoResp {

    @ApiParam(value = "id")
    private String id;
    /**
     * 账户
     */
    @ApiParam(value = "用户id")
    private String userId;
    //    /**
//     * 真实姓名。 第一次创建时从 UserDetails 中复制得来
//     */
    @ApiParam(value = "用户姓名")
    private String realName;
    @ApiParam(value = "用户手机")
    private String phone;
    //    /**
//     * 花名
//     */
//    @ApiParam(value = "用户花名")
//    private String nickName;
//    /**
//     * 身份证号码
//     */
//    @ApiParam(value = "用户身份证")
//    private String idNumber;
//    /**
//     * 如果是前端自己申请的资质,则需要上传图片验证。后台直接编辑可以不需要。
//     * 图片作为审核使用
//     * 第一张:身份证正面,第二张身份证反面,第三张学生证。 学生资质申请的时候拍摄图片的顺序
//     */
//    @ApiParam(value = "用户头像")
//    private String avatar;
    @ApiParam(value = "用户组")
    private List<StaffGroupModel> staffGroupList = new ArrayList<StaffGroupModel>();
    /**
     * 是否已经禁用。
     * <p>
     * true - 已经禁用。
     */
    @ApiParam(value = "是否禁用")
    private boolean disabled;
    /**
     * 备注
     */
    @ApiParam(value = "备注")
    private String memo;
    @ApiParam(value = "删除")
    private boolean deleted;
    @ApiParam(value = "最后修改时间")
    private Date lastModifiedDate;
    @ApiParam(value = "创建时间")
    private Date dateCreated;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<StaffGroupModel> getStaffGroupList() {
        return staffGroupList;
    }

    public void setStaffGroupList(List<StaffGroupModel> staffGroupList) {
        this.staffGroupList = staffGroupList;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
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
}
