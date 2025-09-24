/*
 * =====================================================================================
 *
 * Filename:  gerenciamentoClinica.js
 *
 * Description:  Solução para a Atividade Prática com a Linguagem Javascript.
 * O objetivo é revisar e aplicar os conceitos da linguagem.
 *
 * =====================================================================================
 */

console.log("--- INÍCIO DA EXECUÇÃO DO SISTEMA DE GERENCIAMENTO DA CLÍNICA ---");

// --- 1. MODELAGEM DAS ENTIDADES ---
// 

// Classe base Pessoa
class Pessoa {
    constructor(id, nome, cpf) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf; // 
    }
}

// Paciente herda de Pessoa
class Paciente extends Pessoa {
    constructor(id, nome, cpf, telefone) {
        super(id, nome, cpf);
        this.telefone = telefone; // 
    }
}

// Médico herda de Pessoa
class Medico extends Pessoa {
    constructor(id, nome, cpf, crm) {
        super(id, nome, cpf);
        this.crm = crm; // 
        this.especializacoes = []; // Um médico pode ter uma ou muitas especializações 
    }

    adicionarEspecializacao(especializacao) {
        this.especializacoes.push(especializacao);
    }
}

class Especializacao {
    constructor(id, nome, descricao) {
        this.id = id;
        this.nome = nome; // 
        this.descricao = descricao; // 
    }
}

class Endereco {
    constructor(id, logradouro, bairro, cidade, cep) {
        this.id = id;
        this.logradouro = logradouro; // 
        this.bairro = bairro; // 
        this.cidade = cidade; // 
        this.cep = cep; // 
    }
}

class Clinica {
    constructor(id, nome, endereco) {
        this.id = id;
        this.nome = nome; // 
        this.endereco = endereco; // 
    }
}

class Consulta {
    constructor(id, medico, paciente, data, hora, clinica) {
        this.id = id;
        this.medico = medico; // 
        this.paciente = paciente; // 
        this.data = data; // 
        this.hora = hora; // 
        this.clinica = clinica; // 
    }
}

// --- 2. BANCO DE DADOS EM MEMÓRIA (ARRAYS) ---
// 

let pacientes = [];
let medicos = [];
let especializacoes = [];
let enderecos = [];
let clinicas = [];
let consultas = [];
let idContador = 1; // Simula um auto-incremento de IDs

// --- 3. DADOS DE EXEMPLO (SEM INPUT DO TECLADO) ---
// 

const carregarDadosIniciais = () => {
    // Especializações
    const cardiologia = new Especializacao(idContador++, "Cardiologia", "Cuida do coração.");
    const dermatologia = new Especializacao(idContador++, "Dermatologia", "Cuida da pele.");
    especializacoes.push(cardiologia, dermatologia);

    // Endereços e Clínicas
    const endereco1 = new Endereco(idContador++, "Rua das Flores, 123", "Centro", "Cidade A", "12345-000");
    const clinica1 = new Clinica(idContador++, "Clínica Bem-Estar", endereco1);
    enderecos.push(endereco1);
    clinicas.push(clinica1);

    // Médicos
    const medico1 = new Medico(idContador++, "Dr. Carlos", "111.111.111-11", "CRM-1234");
    medico1.adicionarEspecializacao(cardiologia);
    const medico2 = new Medico(idContador++, "Dra. Ana", "222.222.222-22", "CRM-5678");
    medico2.adicionarEspecializacao(dermatologia);
    medicos.push(medico1, medico2);

    // Pacientes
    const paciente1 = new Paciente(idContador++, "João Silva", "333.333.333-33", "9999-8888");
    const paciente2 = new Paciente(idContador++, "Maria Souza", "444.444.444-44", "7777-6666");
    const paciente3 = new Paciente(idContador++, "Pedro Costa", "555.555.555-55", null); // Exemplo de telefone nulo
    pacientes.push(paciente1, paciente2, paciente3);

    // Consultas
    const consulta1 = new Consulta(idContador++, medico1, paciente1, "2025-10-05", "10:00", clinica1);
    const consulta2 = new Consulta(idContador++, medico2, paciente2, "2025-10-06", "14:30", clinica1);
    consultas.push(consulta1, consulta2);

    console.log("✔ Dados iniciais carregados em memória.");
};

