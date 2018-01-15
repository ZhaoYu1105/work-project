package net.kingsilk.qh.oauth.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

/**
 * 保留该接口，方法统一追加自定义方法
 */
@NoRepositoryBean
public interface BaseRepo<T, ID extends Serializable>
        extends MongoRepository<T, ID>, QueryDslPredicateExecutor<T> {
}
