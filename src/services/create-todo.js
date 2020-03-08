const pool = require('../db');

const createTodo = async (req, res) => {
  const { title, description, responsible, isComplete } = req.body;

  const poolPromise = pool.promise();

  try {
    const [
      result,
      fields
    ] = await poolPromise.query(
      'INSERT INTO todo (title, description, responsible, is_complete) VALUES (?, ?, ?, ?)',
      [title, description, responsible, isComplete]
    );

    res.send({
      id: result.insertId,
      title,
      description,
      responsible,
      isComplete
    });
  } catch (ex) {
    res.status(500).send({ message: 'Error de base de datos.', error: ex });
  }
};

module.exports = createTodo;
