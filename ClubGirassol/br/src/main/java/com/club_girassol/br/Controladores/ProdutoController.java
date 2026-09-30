package com.club_girassol.br.Controladores;

import com.club_girassol.br.Entidades.Cliente;
import com.club_girassol.br.Entidades.Produto;
import com.club_girassol.br.Services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    private ResponseEntity<List<Produto>> listarProdutos(){
        return ResponseEntity.ok().body(produtoService.listarProdutos());
    }
    @GetMapping("/{id}")
    private ResponseEntity<Produto>buscarProdutoPorId(@PathVariable Long id){
        Optional<Produto> produtoPorId = produtoService.buscarProdutoPorId(id);
        if(produtoPorId.isPresent()){
            return ResponseEntity.ok(produtoPorId.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    private ResponseEntity<Produto> criarProduto(@RequestBody Produto produto){
        Produto produtoNovo = produtoService.criarProduto(produto);
        return ResponseEntity.status(201).body(produtoNovo);
    }
    @PutMapping("/{id}")
    private ResponseEntity<Produto>atualizarProduto(@PathVariable Long id,@RequestBody Produto produto){
        Produto  produtoAtualizado = produtoService.atualizarProduto(id, produto);
        return ResponseEntity.status(200).body(produtoAtualizado);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deletarProduto(@PathVariable Long id){
        produtoService.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }
}
