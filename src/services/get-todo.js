const pool = require('../db');

const getTodo = async (req, res) => {
  const id = parseInt(req.params.id) || 0;

  const poolPromise = pool.promise();

  try {
    const [
      results
    ] = await poolPromise.query(
      'SELECT id, title, description, responsible, is_complete as isComplete FROM todo WHERE id = ?',
      [id]
    );

    res.send(results[0]);
  } catch (ex) {
    res.status(500).send({ message: 'Error de base de datos.', error: ex });
  }
};

module.exports = getTodo;
