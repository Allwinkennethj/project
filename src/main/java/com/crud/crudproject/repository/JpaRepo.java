package com.crud.crudproject.repository;

import com.crud.crudproject.model.Registration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaRepo extends JpaRepository<Registration,String> {

    default Optional<Registration> findByMobile(String mobileNum) {
        return null;
    }

    @Query(value = "SELECT * FROM user ORDER BY last_date DESC LIMIT 10", nativeQuery = true)
    List<Registration> findFirst10Entries();

    @Query(value = "SELECT * FROM user WHERE loginuser= :loginuser ORDER BY last_date DESC", nativeQuery = true)
    List<Registration> findAllByModifiedDate(Pageable pageable, @Param("loginuser") String loginuser);

    @Query(value = "SELECT COUNT(*) FROM user WHERE loginuser= :loginuser", nativeQuery = true)
    long countValues(@Param("loginuser") String loginuser);

}



