import { Lancamento } from "../entity/Lancamento";
import { getManager } from "typeorm";

export class LancamentoController{

    async salvar(lancamento: Lancamento){
        const LancamentoSalvo = await getManager().save(lancamento);
        return LancamentoSalvo;
    }

    async atualizar(id: number, valor: number, descricao: string, data: Date){
        let lancamento = await getManager().findOne(Lancamento, id);
        
        lancamento.valor = valor;
        lancamento.descricao = descricao;
        lancamento.data = data;

        if(lancamento){
            const atualizar = await getManager().save(lancamento);
            return atualizar
        }else{
            return false
        }

    }

    async recuperarPorId(id: number){
        const lancamento = await getManager().findOne(Lancamento, id);
        
        return lancamento;
    }


    async delete(id: number){
        const lancamento = await getManager().findOne(Lancamento, id);

        if(!lancamento){
            return false;
        }else{
            const deletar = await getManager().remove(lancamento);
            return deletar;
        }

    }


}