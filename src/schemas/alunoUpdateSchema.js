const z = require("zod");

const alunoUpdateSchema = z.object({
    nome: z.string().trim().min(3, "Nome muito curto.").optional(),
    email: z.string().trim().email("E-mail Inválido.").optional()
}).refine(
    (data) => data.nome !== undefined || data.email !== undefined,
    { message: "Informe ao menos um campo (nome ou email) para atualizar." }
);

module.exports = alunoUpdateSchema;
