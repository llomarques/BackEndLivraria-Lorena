import {db} from "../config/db.js";

export async function listarFavoritos(req, res) { 
    try {
        const idUsuario = req.params.idUsuario;
        const [rows] = await db.execute("SELECT * FROM favoritos WHERE idUsuario = ?", [idUsuario]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message });
    }

}
 
export async function criarFavorito(req, res) {
    try{
        const { idUsuario, idLivros } = req.body;
    if (!idUsuario === undefined || !idLivros === undefined) 
        return res.status(400).json({erro: "Dados incompletos"});

    await db.execute(
        "INSERT INTO favoritos (idUsuario, idLivros) VALUES (?, ?)", 
        [idUsuario, idLivros]
    );
    res.json({mensagem: "Favorito adicionado com sucesso"}); 
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

export async function deletarFavorito(req, res) {
    try {
       await db.execute("DELETE FROM favoritos WHERE idFavoritos = ?", [req.params.id]);
       res.json({mensagem: "Favorito deletado com sucesso"});
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
