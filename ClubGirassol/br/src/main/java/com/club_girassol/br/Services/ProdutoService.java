package com.club_girassol.br.Services;


import com.club_girassol.br.Entidades.Produto;
import com.club_girassol.br.Repositores.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarProdutoPorId(Long id){
        return produtoRepository.findById(id);
    }

    public Produto criarProduto(Produto produto){
        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(Long id, Produto produtoNovo){
        Produto produtoAntigo = produtoRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        if(produtoNovo.getTipo() != null){
            produtoAntigo.setTipo(produtoNovo.getTipo());
        }
        if(produtoNovo.getTamanho() != null){
            produtoAntigo.setTamanho(produtoNovo.getTamanho());
        }
        if(produtoNovo.getCor() != null){
            produtoAntigo.setCor(produtoNovo.getCor());
        }
        if(produtoNovo.getPreco() != null){
            produtoAntigo.setPreco(produtoNovo.getPreco());
        }
        return produtoRepository.save(produtoAntigo);
    }
    public void deletarProduto(Long id){
        produtoRepository.deleteById(id);
    }
}
