package com.club_girassol.br.Controladores;

import com.club_girassol.br.Entidades.Cliente;
import com.club_girassol.br.Services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    private ResponseEntity<List<Cliente>> listarClientes(){
        return ResponseEntity.ok().body(clienteService.listarClientes());
    }

    @GetMapping("/{id}")
    private ResponseEntity<Cliente>buscarClientePorId(@PathVariable Long id){
        Optional<Cliente> clientePorId = clienteService.buscarClientePorId(id);
        if(clientePorId.isPresent()){
            return ResponseEntity.ok(clientePorId.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    private ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente){
        Cliente clienteNovo = clienteService.criarCliente(cliente);
        return ResponseEntity.status(201).body(clienteNovo);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Cliente>atualizarCliente(@PathVariable Long id,@RequestBody Cliente cliente){
        Cliente  clienteAtualizado = clienteService.atualizarCliente(id, cliente);
        return ResponseEntity.status(200).body(clienteAtualizado);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deletarCliente(@PathVariable Long id){
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }


}
