package com.club_girassol.br.Services;

import com.club_girassol.br.Entidades.Cliente;
import com.club_girassol.br.Repositores.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarClientePorId(Long id){
        return clienteRepository.findById(id);
    }

    public Cliente criarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Cliente atualizarCliente(Long id, Cliente clienteNovo){
        Cliente clienteAntigo = clienteRepository.findById(id).
                orElseThrow(()-> new RuntimeException("Cliente não encontrado"));
        if(clienteNovo.getNome() != null){
            clienteAntigo.setNome(clienteNovo.getNome());
        }
        if(clienteNovo.getEndereco() != null){
            clienteAntigo.setEndereco(clienteNovo.getEndereco());
        }
        if(clienteNovo.getCpf() != null){
            clienteAntigo.setCpf(clienteNovo.getCpf());
        }
        if(clienteNovo.getTelefone() != null){
            clienteAntigo.setTelefone(clienteNovo.getTelefone());
        }
        if(clienteNovo.getEmail() != null){
            clienteAntigo.setEmail(clienteNovo.getEmail());
        }
        return clienteRepository.save(clienteAntigo);
    }
    public void deletarCliente(Long id){
        clienteRepository.deleteById(id);
    }
}
