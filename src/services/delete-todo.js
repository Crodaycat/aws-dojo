const pool = require('../db');

const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).send({ message: 'No se encontró el id para borrar' });
    return;
  }

  const poolPromise = pool.promise();
  let connection;
  try {
    connection = await poolPromise.getConnection();

    const [
      queryResult
    ] = await connection.query(
      'SELECT id, title, description, responsible, is_complete as isComplete FROM todo WHERE id = ?',
      [id]
    );

    const [
      deleteResult
    ] = await connection.query('DELETE FROM todo WHERE id = ?', [id]);

    if (!deleteResult.affectedRows) {
      connection.release();
      res.status(500).send({ message: 'No se borró ningún todo' });
      return;
    }

    res.send(queryResult[0]);
  } catch (ex) {
    connection.release();
    res.status(500).send({ message: 'Error de base de datos.', error: ex });
  }
};

module.exports = deleteTodo;
