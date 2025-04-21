class Cidade {
    constructor(id, nome, estado_id, estado_nome, pais_id, pais_nome) {
        this.id = id;
        this.nome = nome;
        this.estado_id = estado_id;
        this.estado_nome = estado_nome;
        this.pais_id = pais_id;
        this.pais_nome = pais_nome;
    }
}

module.exports = Cidade;