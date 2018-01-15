package net.kingsilk.qh.oauth.core.wap.conf;

import io.swagger.jaxrs.config.*;
import org.glassfish.jersey.server.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.context.*;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.*;

import javax.ws.rs.container.*;
import javax.ws.rs.core.*;
import java.util.*;

@Configuration
public class JerseyConf {

    @Autowired
    ApplicationContext ctx;


    @Bean
    ResourceConfig resourceConfig(
            BeanConfig swaggerBeanConfig,
            Environment environment
    ) {


        ResourceConfig resourceConfig = new ResourceConfig();

        // 强制 响应的contentType中追加 charset
        // http://stackoverflow.com/questions/5514087/jersey-rest-default-character-encoding/20569571
        resourceConfig.register(new ContainerResponseFilter() {
            @Override
            public void filter(ContainerRequestContext request, ContainerResponseContext response) {
                MediaType type = response.getMediaType();
                if (type != null) {
                    String contentType = type.toString();
                    if (!contentType.contains("charset")) {
                        contentType = contentType + ";charset=utf-8";
                        response.getHeaders().putSingle("Content-Type", contentType);
                    }
                }
            }
        });

        resourceConfig.register(org.glassfish.jersey.media.multipart.MultiPartFeature.class);

        resourceConfig.register(io.swagger.jaxrs.listing.AcceptHeaderApiListingResource.class);
        resourceConfig.register(io.swagger.jaxrs.listing.ApiListingResource.class);
        resourceConfig.register(io.swagger.jaxrs.listing.SwaggerSerializers.class);

        // 根据文档，需要手动一一将RESTful controller 添加至此。
        // http://docs.spring.io/spring-boot/docs/1.5.1.RELEASE/reference/htmlsingle/#boot-features-jersey

        // 统一要求：全部注册实现类，而非接口类
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.user.UserResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.user.addr.AddrResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.user.UserResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.login.phone.PhoneLoginResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.login.pwd.PwdLoginResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.login.wxMp.WxMpLoginResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.login.wxComMp.WxComMpLoginResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.login.phone.PhoneLoginResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.s.oauth.OAuthResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.sms.SmsVerifyCodeResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.user.org.OrgResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.user.org.orgStaff.OrgStaffResource.class);
        resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.user.org.addr.AddrResource.class);
        // resourceConfig.register(Test1Resource.class);
        //resourceConfig.register(BrandComResource.class);
        // resourceConfig.register(MyExceptionMapper.class);

        // 测试类的资源，prod 环境不能使用
        boolean isProd = Arrays.stream(environment.getActiveProfiles())
                .anyMatch(profile -> "prod".equals(profile));
        if (!isProd) {
            resourceConfig.register(net.kingsilk.qh.oauth.core.wap.resource.test.TestZllResource.class);
        }

        resourceConfig.property(ServerProperties.RESPONSE_SET_STATUS_OVER_SEND_ERROR, true);
        resourceConfig.property(ServerProperties.PROCESSING_RESPONSE_ERRORS_ENABLED, true);
        return resourceConfig;
    }
}
