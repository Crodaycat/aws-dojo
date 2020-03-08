const pool = require('../db');

const updateTodo = async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).send({ message: 'No se encontró el id para actualizar' });
    return;
  }

  const { title, description, responsible, isComplete } = req.body;

  const poolPromise = pool.promise();

  try {
    const [
      result,
      fields
    ] = await poolPromise.query(
      'UPDATE todo SET title = ?, description = ?, responsible = ?, is_complete = ? WHERE id = ?',
      [title, description, responsible, isComplete, id]
    );

    if (!result.affectedRows) {
      res.status(500).send({ message: 'No se actualizó ningún todo' });
      return;
    }

    res.send({
      id,
      title,
      description,
      responsible,
      isComplete
    });
  } catch (ex) {
    res.status(500).send({ message: 'Error de base de datos.', error: ex });
  }
};

module.exports = updateTodo;
