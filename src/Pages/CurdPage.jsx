import React, { useState, useEffect } from 'react';

const CrudPage = () => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    actor: '',
    director: '',
    date: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedMovies = movies.map((movie) => 
        movie.id === editId ? { ...formData, id: editId } : movie
      );
      setMovies(updatedMovies);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newMovie = {
        ...formData,
        id: Date.now().toString()
      };
      setMovies([...movies, newMovie]);
    }
    setFormData({ name: '', actor: '', director: '', date: '' });
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setEditId(movie.id);
    setFormData({
      name: movie.name,
      actor: movie.actor,
      director: movie.director,
      date: movie.date
    });
  };

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', actor: '', director: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Movie Database</h1>

        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl text-white mb-4">
            {isEditing ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Movie Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="text"
                placeholder="Lead Actor"
                value={formData.actor}
                onChange={(e) => setFormData({ ...formData, actor: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="text"
                placeholder="Director"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {isEditing ? 'Update Movie' : 'Add Movie'}
              </button>
            </div>
          </form>
        </div>

        {/* Movie List Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl text-white mb-4">Movie List</h2>
          <div className="space-y-4">
            {movies.length === 0 ? (
              <p className="text-center text-gray-400">No movies added yet</p>
            ) : (
              movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <h3 className="text-white font-semibold">{movie.name}</h3>
                    <p className="text-gray-300">Actor: {movie.actor}</p>
                    <p className="text-gray-300">Director: {movie.director}</p>
                    <p className="text-gray-300">Release Date: {movie.date}</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudPage;