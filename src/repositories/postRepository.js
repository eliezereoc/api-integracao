import connection from "../database/connection.js";

async function createPost(post) {
  const db = await connection.getConnection();

  try {
    const sql = `INSERT INTO posts (userId, title, body)
                 VALUES (?, ?, ?)`;
    const values = [post.userId, post.title, post.body];
    const [result] = await db.query(sql, values);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        message: "Post criado ou atualizado com sucesso.",
      };
    }
    return {
      status: "error",
      message: "Falha ao criar ou atualizar o post.",
    };
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

async function getPostsByUserId(userId) {
  const db = await connection.getConnection();
  try {
    const sql = "SELECT * FROM posts WHERE userId = ?";
    const [rows] = await db.query(sql, [userId]);
    return rows;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

async function getPostsAll() {
  const db = await connection.getConnection();
  try {
    const sql = "SELECT * FROM posts";
    const [rows] = await db.query(sql);
    return rows;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

export { createPost, getPostsByUserId, getPostsAll };
