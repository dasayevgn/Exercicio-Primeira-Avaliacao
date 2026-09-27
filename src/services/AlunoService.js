const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
const EmailDuplicadoError = require("../errors/EmailDuplicadoError");

class AlunoService{

    async findMany(page, pageSize, orderBy, order){
        const camposValidos = ["id", "nome", "email", "createdAt", "updatedAt"];
        const campo = camposValidos.includes(orderBy) ? orderBy : "id";
        const direcao = ["asc", "desc"].includes(order) ? order : "asc";

        const [alunos, total] = await Promise.all([
            prisma.aluno.findMany({
                skip: (page - 1) * pageSize,
                take: Number(pageSize),
                orderBy: { [campo]: direcao }
            }),
            prisma.aluno.count()
        ]);

        return { alunos, total };
    }

    async findById(id){
        const aluno = await prisma.aluno.findUnique({ where: { id } });
        if(!aluno){
            throw new AlunoNaoEncontradoError();
        }
        return aluno;
    }
