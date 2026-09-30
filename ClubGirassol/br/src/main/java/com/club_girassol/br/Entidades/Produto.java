package com.club_girassol.br.Entidades;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Produto {
    @Id @GeneratedValue
    private Long id;
    private String tipo;
    private String tamanho;
    private String cor;
    private String preco;
}
