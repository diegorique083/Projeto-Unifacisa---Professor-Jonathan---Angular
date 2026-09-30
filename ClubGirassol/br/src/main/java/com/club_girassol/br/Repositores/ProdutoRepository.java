package com.club_girassol.br.Repositores;

import com.club_girassol.br.Entidades.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
