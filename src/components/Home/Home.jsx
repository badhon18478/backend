import React, { useState, useEffect } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({
    fid: '',
    name: '',
    email: '',
    url: '',
    photo: null,
  });

  const [users, setUsers] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Component load hole backend theke data fetch kora
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        console.log('Users loaded:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Input change handle
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Photo upload handle
  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });

      // Preview er jonno
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit handle
  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      fid: formData.fid,
      name: formData.name,
      email: formData.email,
      url: formData.url,
      photo: photoPreview,
    };

    // Backend e data pathano
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => {
        console.log('User created:', data);
        setUsers([...users, data]);

        // Form reset
        setFormData({
          fid: '',
          name: '',
          email: '',
          url: '',
          photo: null,
        });
        setPhotoPreview(null);

        alert('Profile created successfully!');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Create Your Profile
            </h2>

            <div>
              <div className="mb-6">
                <label
                  htmlFor="fid"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  FID
                </label>
                <input
                  type="text"
                  id="fid"
                  name="fid"
                  value={formData.fid}
                  onChange={handleChange}
                  placeholder="e.g., 12345-ABC"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Jane Doe"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., jane.doe@example.com"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="photo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Profile Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-28 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF (MAX. 5MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="url"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Profile URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="e.g., https://yourwebsite.com"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform hover:scale-105 transition duration-200"
                >
                  Create Profile
                </button>
              </div>
            </div>
          </div>

          {/* Users Display Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              All Users ({users.length})
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {users.map(user => (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 bg-gray-50"
                >
                  {user.photo && (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover mb-3"
                    />
                  )}
                  <p className="text-xs text-gray-500 mb-1">FID: {user.fid}</p>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                  {user.url && (
                    <a
                      href={user.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {user.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
