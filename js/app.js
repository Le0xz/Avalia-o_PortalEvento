// Array inicial de eventos na página
let eventos = [
    {
        id: 1,
        titulo: "Concurso de Programaçaõ",
        tipo: "Torneio Técnico",
        data: "2026-09-25",
        local: "São Paulo",
        descricao: "Torneio para socialização barata.",
        status: "Agendado"
    },
    {
        id: 2,
        titulo: "Palestra sobre alguma coisa",
        tipo: "Palestra",
        data: "2026-10-05",
        local: "Auditório Principal (Bahia)",
        descricao: "Palestra surpresa (OBRIGATORIO).",
        status: "Agendado"
    },
    {
        id: 3,
        titulo: "Minicurso de Desenvolvimento Web",
        tipo: "Minicurso",
        data: "2026-10-15",
        local: "Laboratório 1 (São Paulo)",
        descricao: "Minicurso sobre desenvolvimento de aplicações web.",
        status: "Realizado"
    }
];

// Elemento principal onde as telas são renderizadas
const app = document.querySelector("#app");

// Links do menu de navegação
const linksMenu = document.querySelectorAll("[data-view]");

// Eventos de clique do menu para alternar entre as views da SPA
linksMenu.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const view = this.dataset.view;

        if (view === "dashboard") {
            mostrarDashboard();
        } else if (view === "novo") {
            mostrarNovoEvento();
        } else if (view === "eventos") {
            mostrarEventos();
        }
    });
});

/** Formata a data do formato padrão americano (AAAA-MM-DD), para o formato brasileiro (DD/MM/AAAA).
 */
function formatarData(data) {
    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/** Renderiza a tela de Dashboard no elemento (#app), calculando e exibindo estatísticas sobre a quantidade de eventos.
 */
function mostrarDashboard() {
    const total = eventos.length;

    const agendados = eventos.filter(evento => {
        return evento.status === "Agendado";
    }).length;

    const realizados = eventos.filter(evento => {
        return evento.status === "Terminado";
    }).length;

    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-4">

            <div class="col-md-4">
                <div class="card text-center shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Total de eventos no dia</h5>
                        <h2>${total}</h2>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card text-center shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Eventos na agenda</h5>
                        <h2>${agendados}</h2>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card text-center shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Eventos realizados/terminados</h5>
                        <h2>${realizados}</h2>
                    </div>
                </div>
            </div>

        </div>
    `;
}

/** Renderiza o formulário de cadastro de um novo evento e gerencia a submissão dos dados, validação e adição ao array.
 */
function mostrarNovoEvento() {
    app.innerHTML = `
        <h1 class="mb-4">Criar um Novo Evento</h1>

        <div id="mensagem"></div>

        <form id="formEvento">

            <div class="mb-3">
                <label for="Nome do Evento" class="form-label">Nome do Evento</label>
                <input type="text" id="titulo" class="form-control">
            </div>

            <div class="mb-3">
                <label for="Qual tipo de Evento?" class="form-label">Qual tipo de Evento?</label>
                <select id="tipo" class="form-select">
                    <option value="">Selecione</option>
                    <option value="Palestra">Palestra</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Minicurso">Minicurso</option>
                    <option value="Torneios">Torneios Técnicos</option>
                    <option value="Visita Técnica">Visita Técnica</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="Data Planejada" class="form-label">Data Planejada</label>
                <input type="date" id="data" class="form-control">
            </div>

            <div class="mb-3">
                <label for="Local do Evento?" class="form-label">Local do Evento?</label>
                <input type="text" id="local" class="form-control">
            </div>

            <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <textarea id="descricao" class="form-control" rows="4"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">
                Cadastrar
            </button>

        </form>
    `;

    const formulario = document.querySelector("#formEvento");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const titulo = document.querySelector("#titulo").value.trim();
        const tipo = document.querySelector("#tipo").value;
        const data = document.querySelector("#data").value;
        const local = document.querySelector("#local").value.trim();
        const descricao = document.querySelector("#descricao").value.trim();

        const mensagem = document.querySelector("#mensagem");

        if (!titulo || !tipo || !data || !local || !descricao) {
            mensagem.innerHTML = `
                <div class="alert alert-danger">
                    Preencha todos os campos obrigatórios.
                </div>
            `;

            return;
        }

        let novoId = 1;

        if (eventos.length > 0) {
            novoId = Math.max(...eventos.map(evento => evento.id)) + 1;
        }

        const novoEvento = {
            id: novoId,
            titulo: titulo,
            tipo: tipo,
            data: data,
            local: local,
            descricao: descricao,
            status: "Agendado"
        };

        eventos.push(novoEvento);

        formulario.reset();

        mensagem.innerHTML = `
            <div class="alert alert-success">
                Evento cadastrado com sucesso!
            </div>
        `;
    });
}

/** Renderiza a tela de listagem de eventos contendo, os campos de pesquisa por texto e filtro por status.
 */
function mostrarEventos() {
    app.innerHTML = `
        <h1 class="mb-4">Eventos</h1>

        <div class="row mb-4">

            <div class="col-md-8">
                <label for="pesquisa" class="form-label">
                    Pesquisar Evento
                </label>

                <input
                    type="text"
                    id="pesquisa"
                    class="form-control"
                    placeholder="Digite o nome do evento..."
                >
            </div>

            <div class="col-md-4">
                <label for="filtroStatus" class="form-label">
                    Filtrar Status do Evento
                </label>

                <select id="filtroStatus" class="form-select">
                    <option value="Todos">Todos</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Realizado">Terminados</option>
                </select>
            </div>

        </div>

        <div id="listaEventos" class="row g-4"></div>
    `;

    const pesquisa = document.querySelector("#pesquisa");
    const filtroStatus = document.querySelector("#filtroStatus");

    pesquisa.addEventListener("input", atualizarLista);

    filtroStatus.addEventListener("change", atualizarLista);

    atualizarLista();
}

/** Filtra o array de eventos com base no termo digitado e no status selecionado, atualizando a exibição na tela.
 */
function atualizarLista() {
    const lista = document.querySelector("#listaEventos");

    if (!lista) {
        return;
    }

    const textoPesquisa = document
        .querySelector("#pesquisa")
        .value
        .toLowerCase();

    const statusSelecionado = document
        .querySelector("#filtroStatus")
        .value;

    lista.innerHTML = "";

    const eventosFiltrados = eventos.filter(evento => {

        const correspondeTexto = evento.titulo
            .toLowerCase()
            .includes(textoPesquisa);

        const correspondeStatus =
            statusSelecionado === "Todos" ||
            evento.status === statusSelecionado;

        return correspondeTexto && correspondeStatus;
    });

    if (eventosFiltrados.length === 0) {
        lista.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    Nenhum evento encontrado.
                </div>
            </div>
        `;

        return;
    }

    eventosFiltrados.forEach(evento => {
        criarCardEvento(evento, lista);
    });
}

/** Cria dinamicamente via DOM os elementos HTML do card de um evento específico e adiciona os botões de ação (Concluir e Excluir).
 */
function criarCardEvento(evento, lista) {
    const coluna = document.createElement("div");
    coluna.classList.add("col-md-6", "col-lg-4");

    const card = document.createElement("div");
    card.classList.add("card", "shadow-sm", "card-evento");

    const corpo = document.createElement("div");
    corpo.classList.add("card-body");

    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = evento.titulo;

    const tipo = document.createElement("span");
    tipo.classList.add("badge", "bg-primary", "mb-2");
    tipo.textContent = evento.tipo;

    const data = document.createElement("p");
    data.classList.add("mb-1");
    data.textContent = `Data: ${formatarData(evento.data)}`;

    const local = document.createElement("p");
    local.classList.add("mb-1");
    local.textContent = `Local: ${evento.local}`;

    const status = document.createElement("span");

    status.classList.add("badge", "status-badge");

    if (evento.status === "Agendado") {
        status.classList.add("bg-warning", "text-dark");
    } else {
        status.classList.add("bg-success");
    }

    status.textContent = evento.status;

    const descricao = document.createElement("p");
    descricao.classList.add("descricao", "mt-3");
    descricao.textContent = evento.descricao;

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    if (evento.status === "Agendado") {
        const botaoRealizar = document.createElement("button");

        botaoRealizar.classList.add(
            "btn",
            "btn-success",
            "btn-sm",
            "me-2"
        );

        botaoRealizar.textContent = "Evento Terminado";

        botaoRealizar.addEventListener("click", function () {
            EventoTerminado(evento.id);
        });

        acoes.appendChild(botaoRealizar);
    }

    const botaoExcluir = document.createElement("button");

    botaoExcluir.classList.add(
        "btn",
        "btn-danger",
        "btn-sm"
    );

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function () {
        excluirEvento(evento.id);
    });

    acoes.appendChild(botaoExcluir);

    corpo.appendChild(titulo);
    corpo.appendChild(tipo);
    corpo.appendChild(data);
    corpo.appendChild(local);
    corpo.appendChild(status);
    corpo.appendChild(descricao);
    corpo.appendChild(acoes);

    card.appendChild(corpo);
    coluna.appendChild(card);
    lista.appendChild(coluna);
}

/** Altera o status de um evento específico para "Realizado" com base no ID fornecido e atualiza a interface.
 */
function EventoTerminado(id) {
    const evento = eventos.find(evento => evento.id === id);

    if (evento) {
        evento.status = "Realizado";
        mostrarEventos();
    }
}

/** Remove um evento do array de eventos com base no ID e atualiza a listagem exibida na tela.
 */
function excluirEvento(id) {
    eventos = eventos.filter(evento => evento.id !== id);

    mostrarEventos();
}

// Inicializa a aplicação abrindo primeiramente no Dashboard
mostrarDashboard();