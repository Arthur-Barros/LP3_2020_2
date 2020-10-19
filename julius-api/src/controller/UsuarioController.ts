import { Usuario } from "../entity/Usuario";
import { getManager } from "typeorm";
import { Lancamento } from "../entity/Lancamento";

export class UsuarioController{

    async salvar(usuario: Usuario){
        const usuarioSalvo = await getManager().save(usuario);
        return usuarioSalvo;
    }

    async recuperarTodos(){
        const usuarios = await getManager().find(Usuario);
        return usuarios;
    }

    async recuperarPorId(id: number){
        const usuario = await getManager().findOne(Usuario, id);
        
        return usuario;
    }

    async recuperarLancamentoDoUsuario(id: number){
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ["lancamentos"]
        });
        return usuario.lancamentos;
    }


    async recuperarValorPositivo(id: number){
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ["lancamentos"]
        });
        
        let lancamentoPositvo;
        const todosLancamentos =  usuario.lancamentos;

        if(todosLancamentos){
            todosLancamentos.forEach(lancamento =>{
                if(lancamento.valor > 0){
                    lancamentoPositvo = lancamento;
                }
                
            });
            return lancamentoPositvo;
        }else{
            return false;
        }
        
    }

}