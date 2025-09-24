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

console.log(
  "--- INÍCIO DA EXECUÇÃO DO SISTEMA DE GERENCIAMENTO DA CLÍNICA ---"
);

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
  const cardiologia = new Especializacao(
    idContador++,
    "Cardiologia",
    "Cuida do coração."
  );
  const dermatologia = new Especializacao(
    idContador++,
    "Dermatologia",
    "Cuida da pele."
  );
  especializacoes.push(cardiologia, dermatologia);

  // Endereços e Clínicas
  const endereco1 = new Endereco(
    idContador++,
    "Rua das Flores, 123",
    "Centro",
    "Cidade A",
    "12345-000"
  );
  const clinica1 = new Clinica(idContador++, "Clínica Bem-Estar", endereco1);
  enderecos.push(endereco1);
  clinicas.push(clinica1);

  // Médicos
  const medico1 = new Medico(
    idContador++,
    "Dr. Carlos",
    "111.111.111-11",
    "CRM-1234"
  );
  medico1.adicionarEspecializacao(cardiologia);
  const medico2 = new Medico(
    idContador++,
    "Dra. Ana",
    "222.222.222-22",
    "CRM-5678"
  );
  medico2.adicionarEspecializacao(dermatologia);
  medicos.push(medico1, medico2);

  // Pacientes
  const paciente1 = new Paciente(
    idContador++,
    "João Silva",
    "333.333.333-33",
    "9999-8888"
  );
  const paciente2 = new Paciente(
    idContador++,
    "Maria Souza",
    "444.444.444-44",
    "7777-6666"
  );
  const paciente3 = new Paciente(
    idContador++,
    "Pedro Costa",
    "555.555.555-55",
    null
  ); // Exemplo de telefone nulo
  pacientes.push(paciente1, paciente2, paciente3);

  // Consultas
  const consulta1 = new Consulta(
    idContador++,
    medico1,
    paciente1,
    "2025-10-05",
    "10:00",
    clinica1
  );
  const consulta2 = new Consulta(
    idContador++,
    medico2,
    paciente2,
    "2025-10-06",
    "14:30",
    clinica1
  );
  consultas.push(consulta1, consulta2);

  console.log("✔ Dados iniciais carregados em memória.");
};

// --- 4. FUNCIONALIDADES DO SISTEMA ---
//

// Cadastrar novo registro (usando Arrow Function)
const cadastrarPaciente = (nome, cpf, telefone) => {
  const novoPaciente = new Paciente(idContador++, nome, cpf, telefone);
  pacientes.push(novoPaciente);
  console.log(`\n✔ Paciente "${nome}" cadastrado com sucesso!`);
  return novoPaciente;
};

// Listar registros (usando Template Literals)
const listarPacientes = () => {
  console.log("\n--- LISTA DE PACIENTES ---");
  pacientes.forEach((p) => {
    console.log(
      `ID: ${p.id} | Nome: ${p.nome} | CPF: ${p.cpf} | Telefone: ${p.telefone}`
    );
  });
  console.log("--------------------------");
};

const listarConsultas = () => {
  console.log("\n--- LISTA DE CONSULTAS ---");
  consultas.forEach((c) => {
    // Desestruturação de Objetos
    const { paciente, medico, data, hora, clinica } = c;
    const { nome: nomePaciente } = paciente;
    const { nome: nomeMedico } = medico;
    const { nome: nomeClinica } = clinica;

    // Uso de Template Literals
    console.log(
      `Data: ${data} às ${hora} | Paciente: ${nomePaciente} | Médico: ${nomeMedico} | Clínica: ${nomeClinica}`
    );
  });
  console.log("----------------------------");
};

// Remover paciente pelo Id
const removerPaciente = (id) => {
  const tamanhoInicial = pacientes.length;
  pacientes = pacientes.filter((p) => p.id !== id);
  if (pacientes.length < tamanhoInicial) {
    console.log(`\n✔ Paciente com ID ${id} foi removido.`);
  } else {
    console.log(`\n✖ Paciente com ID ${id} não encontrado.`);
  }
  console.log("----------------------------");
};

// Atualizar todos os dados do paciente
const atualizarPacienteCompleto = (id, novoNome, novoCpf, novoTelefone) => {
  const paciente = pacientes.find((p) => p.id === id);
  if (paciente) {
    paciente.nome = novoNome;
    paciente.cpf = novoCpf;
    paciente.telefone = novoTelefone;
    console.log(`\n✔ Dados do paciente ${novoNome} (ID: ${id}) atualizados.`);
  } else {
    console.log(`\n✖ Paciente com ID ${id} não encontrado para atualização.`);
  }
  console.log("----------------------------");
};

// Atualizar campos específicos do paciente
const atualizarCampoPaciente = (id, campo, valor) => {
  const paciente = pacientes.find((p) => p.id === id);
  if (paciente) {
    if (paciente.hasOwnProperty(campo)) {
      paciente[campo] = valor;
      console.log(
        `\n✔ O campo "${campo}" do paciente com ID ${id} foi atualizado para "${valor}".`
      );
    } else {
      console.log(`\n✖ O campo "${campo}" não existe para o paciente.`);
    }
  } else {
    console.log(`\n✖ Paciente com ID ${id} não encontrado.`);
  }
  console.log("----------------------------");
};

// --- 5. CHECKLIST DE CONCEITOS JAVASCRIPT ---
// 

const demonstrarConceitos = () => {
    console.log("\n--- DEMONSTRAÇÃO DOS CONCEITOS DE JAVASCRIPT ---");

    // 1. Variáveis e Tipos de Dados (let e const)
    const PI = 3.14159; // const: valor constante
    let contador = 10;  // let: valor variável
    let nomeClinica = clinicas[0].nome; // String
    let pacienteExemplo = pacientes[0]; // Object
    let listaVazia = []; // Array
    console.log(`1. Uso de 'const' (PI=${PI}), 'let' (contador=${contador}), e tipos: String, Object, Array.`);

    // 2. Null
    const pacienteSemTelefone = pacientes.find(p => p.telefone === null);
    console.log(`2. Paciente com telefone nulo: ${pacienteSemTelefone.nome}.`); // 

    // 3. Conversões de Tipo
    let idString = "10";
    let idNumero = Number(idString); // String para Número
    let numeroString = String(150); // Número para String
    console.log(`3. Conversão de tipo: String "10" para Número ${idNumero}, Número 150 para String "${numeroString}".`);

    // 4. Strings e Template Literals
    // Já demonstrado extensivamente nas funções de listagem.
    console.log(`4. Template Literals já usado nas listagens, ex: \`Nome: \${pacienteExemplo.nome}\`.`);

    // 5. Estruturas Condicionais (if/else) e de Repetição (forEach)
    // Também já demonstrado nas funções de atualização e listagem.
    console.log("5. Estruturas 'if/else' e 'forEach' já usadas nas funções do sistema.");

    // 6. Objetos em Notação Literal
    const novoMedicoLiteral = {
        id: idContador++,
        nome: "Dra. Julia",
        cpf: "999.999.999-99",
        crm: "CRM-9999",
        especializacoes: [especializacoes[0]]
    };
    console.log(`6. Objeto em notação literal criado para a médica: ${novoMedicoLiteral.nome}.`);

    // 7. Arrays
    // Usado extensivamente para armazenar os dados em memória.
    console.log(`7. Arrays são a base do nosso banco de dados em memória (ex: pacientes, medicos).`);

    // 8. Spread Operator (...)
    const pacientesCopia = [...pacientes]; // Copia o array
    const novoPacienteComBonus = { ...cadastrarPaciente("Carlos Andrade", "888.888.888-88", "5555-4444"), status: "Novo" };
    console.log("8. Spread Operator usado para criar uma cópia do array de pacientes e para adicionar um atributo a um novo objeto.");
    console.log("Cópia do primeiro paciente:", pacientesCopia[0]);
    console.log("Novo Paciente com atributo extra:", novoPacienteComBonus);

    // 9. Desestruturação (Destructuring) de Objetos e Arrays
    const [primeiroPaciente, segundoPaciente] = pacientes;
    console.log(`9. Desestruturação de Array: Primeiro paciente é ${primeiroPaciente.nome}.`);
    const { nome, cpf } = segundoPaciente;
    console.log(`   Desestruturação de Objeto: O paciente ${nome} tem o CPF ${cpf}.`);

    // 10. Funções (Arrow Functions)
    // A função cadastrarPaciente e outras foram criadas como Arrow Functions.
    console.log("10. Arrow Functions usadas para definir as funções do sistema (ex: cadastrarPaciente).");

    // 11. Operador de Coalescência Nula (??)
    const telefonePaciente3 = pacientes.find(p => p.nome === "Pedro Costa").telefone ?? "Não informado";
    console.log(`11. Operador '??': Telefone de Pedro Costa é "${telefonePaciente3}".`);

    // 12. Ordenação de objetos em Arrays
    console.log("12. Ordenando pacientes por nome:");
    const pacientesOrdenados = [...pacientes].sort((a, b) => a.nome.localeCompare(b.nome));
    pacientesOrdenados.forEach(p => console.log(`   - ${p.nome}`));

    console.log("--- FIM DA DEMONSTRAÇÃO ---");
};


// --- 6. MENU DO SISTEMA (SIMULAÇÃO DE EXECUÇÃO) ---
// 

const executarSistema = () => {
    // Carregar Lista de registros em memória
    carregarDadosIniciais();

    // Listar registros
    listarPacientes();
    listarConsultas();

    // Cadastrar novo registro
    cadastrarPaciente("Ana Beatriz", "666.666.666-66", "1111-2222");
    listarPacientes(); // Mostra a lista atualizada

    // Remover paciente pelo Id
    // Removendo o paciente "João Silva" que tem o id 5 (pode variar se alterar os dados)
    const idParaRemover = 5; 
    removerPaciente(idParaRemover);
    listarPacientes();

    // Atualizar todos os dados do paciente
    // Atualizando "Maria Souza" (id 6)
    const idParaAtualizarCompleto = 6;
    atualizarPacienteCompleto(idParaAtualizarCompleto, "Maria Souza Santos", "444.444.444-45", "9876-5432");
    listarPacientes();

    // Atualizar campos específicos do paciente
    // Atualizando telefone de "Pedro Costa" (id 7)
    const idParaAtualizarCampo = 7;
    atualizarCampoPaciente(idParaAtualizarCampo, 'telefone', '5555-1234');
    listarPacientes();

    // Executar a demonstração de conceitos
    demonstrarConceitos();

    console.log("\n--- FIM DA EXECUÇÃO DO SISTEMA ---");
};

// Inicia a execução do programa
executarSistema();
