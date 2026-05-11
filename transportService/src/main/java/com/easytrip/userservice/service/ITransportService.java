package com.easytrip.userservice.service;

import com.easytrip.userservice.models.Transport;
import java.util.List;

public interface ITransportService {

    List<Transport> getAllTransports();

    Transport getTransportById(String id);

    Transport createTransport(Transport transport);

    Transport updateTransport(String id, Transport updated);

    void deleteTransport(String id);

    List<Transport> getTransportsByUserId(Long userId); // 🆕
}
