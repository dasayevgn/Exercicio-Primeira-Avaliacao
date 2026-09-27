const alunoService = require("../services/AlunoService");

class AlunoController{

    async findMany(request, response){
        let {page, pageSize, orderBy, order} = request.query;
        page = Number(page) || 1;
        pageSize = Number(pageSize) || 10;

        const {alunos, total} = await alunoService.findMany(page, pageSize, orderBy, order);
        return response.status(200).json({alunos, total});
    }

    async findById(request, response){
        try{
            const {id} = request.params;
            const aluno = await alunoService.findById(id);
            return response.status(200).json(aluno);
        }catch(e){
            return response.status(e.statusCode).json({message: e.message});
        }
    }
