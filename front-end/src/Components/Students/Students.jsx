import { useState, useEffect } from 'react';
import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      alert('Erro ao carregar alunos!');
    }
  };

   useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      alert('Preencha todos os campos!');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
      });

      await response.json();
      
      if (response.ok) {
        alert('Aluno adicionado com sucesso!');
        setName('');
        setEmail('');
        fetchStudents(); // Atualiza a lista
      }
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      alert('Erro ao adicionar aluno!');
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/students/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
      });

      if (response.ok) {
        alert('Aluno atualizado com sucesso!');
        cancelEdit();
        fetchStudents(); // Atualiza a lista
      }
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      alert('Erro ao atualizar aluno!');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setEmail('');
  };

  const editStudent = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setEmail(student.email);
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Aluno excluído com sucesso!');
          fetchStudents(); // Atualiza a lista
        }
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno!');
      }
    }
  };

  return (
    <div className="students-container">
      <div className="students-box">
        <h1 className="students-title">
          Sistema de Cadastro de Alunos
        </h1>
        
        <div className="students-form">
          <div className="form-group">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          
          {!editingId ? (
            <button onClick={handleSubmit} className="button btn-add">
              Adicionar
            </button>
          ) : (
            <div>
              <button onClick={handleUpdate} className="button btn-update">
                Atualizar
              </button>
              <button onClick={cancelEdit} className="button btn-cancel">
                Cancelar
              </button>
            </div>
          )}
        </div>
        
        <table className="students-table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Nome</th>
              <th className="table-header">Email</th>
              <th className="table-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="table-empty">
                  Nenhum aluno cadastrado
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                >
                  <td className="table-cell">{student.id}</td>
                  <td className="table-cell">{student.name}</td>
                  <td className="table-cell">{student.email}</td>
                  <td className="table-cell">
                    <button onClick={() => editStudent(student)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => deleteStudent(student.id)} className="btn-delete">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;