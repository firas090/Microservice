    package tn.esprit.examen.repositories;


    import org.springframework.data.mongodb.repository.MongoRepository;
    import tn.esprit.examen.entities.Agence;

    public interface AgenceRepository  extends MongoRepository<Agence,String> {
    }