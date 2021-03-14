$(() => {
    requestData();
    $('#incluir').on('click', () => {
        createNewDiscipline();
    });
    $("#cancelar").on('click', () => {
        changeLayoutToCreate();
    });
    $("#salvar").on('click', () => {
        updateDiscipline();
    });
});
function createTable(disciplinas) {
    let formatedHtml = '';
    disciplinas.forEach(({ id, cod_disciplina, descricao, data_inicio, valor_disciplina, optativa }) => {
        formatedHtml += `<tr>
      <th scope="row">${id}</th>
      <td>${cod_disciplina}</td>
      <td>${descricao}</td>
      <td>${formatDate(data_inicio)}</td>
      <td>${formatMoney(Number(valor_disciplina))}</td>
      <td>${optativa}</td>
      <td>
        <button type="button" class="btn btn-danger" onClick="deleteDiscipline('${id}')">Deletar</button>
        <button type="button" class="btn btn-primary" onClick="changeLayoutToUpdate('${id}', '${cod_disciplina}', '${descricao}', '${data_inicio}', '${valor_disciplina}', '${optativa}')">Alterar</button>
      </td>
    </tr>`;
    });
    $('#tbody').html(formatedHtml);
    cleanFields();
}
;
function cleanFields() {
    $("#id").val('');
    $("#cod_disciplina").val('');
    $("#descricao").val('');
    $("#data_inicio").val('');
    $("#valor_disciplina").val('');
    $("#optativa").val('Selecione...');
}
function changeLayoutToUpdate(id, cod_disciplina, descricao, data_inicio, valor_disciplina, optativa) {
    $("#id").val(id);
    $("#cod_disciplina").val(cod_disciplina);
    $("#descricao").val(descricao);
    $("#data_inicio").val(data_inicio);
    $("#valor_disciplina").val(valor_disciplina);
    $("#optativa").val(optativa);
    $("#create").hide();
    $("#update").show();
    $('#cod_disciplina').trigger('focus');
}
;
function changeLayoutToCreate() {
    $("#update").hide();
    $("#create").show();
    cleanFields();
}
function requestData() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/disciplinas',
    }).then(res => createTable(res));
}
;
function createNewDiscipline() {
    const cod_disciplina = $("#cod_disciplina").val();
    const descricao = $("#descricao").val();
    const data_inicio = $("#data_inicio").val();
    const valor_disciplina = $("#valor_disciplina").val();
    const optativa = $("#optativa").val();
    const data = {
        cod_disciplina,
        descricao,
        data_inicio,
        valor_disciplina,
        optativa
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/disciplinas',
        data
    }).then(() => requestData());
}
function deleteDiscipline(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8081/disciplinas/${id}`,
    }).then(() => requestData());
}
;
function updateDiscipline() {
    const id = $("#id").val();
    const cod_disciplina = $("#cod_disciplina").val();
    const descricao = $("#descricao").val();
    const data_inicio = $("#data_inicio").val();
    const valor_disciplina = $("#valor_disciplina").val();
    const optativa = $("#optativa").val();
    const data = {
        cod_disciplina,
        descricao,
        data_inicio,
        valor_disciplina,
        optativa
    };
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8081/disciplinas/${id}`,
        data
    }).then(() => {
        changeLayoutToCreate();
        requestData();
    });
}
;
function formatDate(date) {
    return date.split("-").reverse().join("/");
}
;
function formatMoney(valor) {
    return valor.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" });
}
