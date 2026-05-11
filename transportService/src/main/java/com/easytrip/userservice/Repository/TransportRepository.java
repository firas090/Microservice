package com.easytrip.userservice.Repository;

import com.easytrip.userservice.models.Transport;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TransportRepository extends MongoRepository<Transport, String> {
    List<Transport> findByUserId(Long userId);
}
