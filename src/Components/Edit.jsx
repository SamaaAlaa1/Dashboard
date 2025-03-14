import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

const Edit = ({ fetchData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        level: '',
        university: ''
    });

    const [errors, setErrors] = useState({});
    let universities = ["Cairo","Helwan","Ain Shams","Other"];
    useEffect(() => {
        axios.get(`https://fake-form.onrender.com/api/students/${id}`)
            .then(response => setData(response.data.data))
            .catch(error => console.log('Error fetching data:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    
        let errorMsg = '';
    
        if (name === 'name' && value.trim().length < 3) {
            errorMsg = 'Name must be at least 3 characters';
        }
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMsg = 'Invalid email format';
        }
        if (name === 'phone' && !/^[0-9]{10,15}$/.test(value)) {
            errorMsg = 'Phone number must be 10-15 digits';
        }
        if (name === 'age' && (value < 18 || value > 80)) {
            errorMsg = 'Age must be between 18 and 80';
        }
        if (name === 'level' && (value <= 0 || value > 5)) {
            errorMsg = 'Level must be between 1 and 5';
        }
        if (
            name === 'university' && 
            value.trim() !== '' && 
            !universities.map(u => u.toLowerCase()).includes(value.trim().toLowerCase()) &&
            value.trim().toLowerCase() !== "other"
        ) {
            errorMsg = 'University is not valid';
        }
    
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };
    

    const isFormValid = () => {
        return Object.values(errors).every((error) => error === '') &&
               Object.values(data).every((value) => value !== '');
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: `${Object.values(errors).join(', ')}`,
                confirmButtonColor: '#700601'
            });
            return;
        }

        setLoading(true);
        axios.patch(`https://fake-form.onrender.com/api/students/${id}`, data)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    confirmButtonColor: '#700601'
                });
                fetchData();
                navigate('/students');
            })
            .catch((err) => {
                console.error('Error updating data:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `Error updating data: ${err.message}`,
                    confirmButtonColor: '#700601'
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="w-full flex h-max">
            <Sidebar />
            <div className="w-[80%] bg-white flex items-center justify-center pl-8">
                <form className="flex flex-col gap-4 w-[90%]" onSubmit={handleUpdate}>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-left text-lg">Name</label>
                        <input type="text" name="name" className="py-2 border rounded-md" value={data.name} onChange={handleChange} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-left text-lg">Email</label>
                        <input type="email" name="email" className="py-2 border rounded-md" value={data.email} onChange={handleChange} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-left text-lg">Phone</label>
                        <input type="text" name="phone" className="py-2 border rounded-md" value={data.phone} onChange={handleChange} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-left text-lg">Age</label>
                        <input type="number" name="age" className="py-2 border rounded-md" value={data.age} onChange={handleChange} />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-left text-lg">Level</label>
                        <input type="number" name="level" className="py-2 border rounded-md" value={data.level} onChange={handleChange} />
                        {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-left text-lg">University</label>
                        <input type="text" name="university" className="py-2 border rounded-md" value={data.university} onChange={handleChange} />
                        {errors.university && <p className="text-red-500 text-sm">{errors.university}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="text-center text-xl py-2 bg-[#700601] text-white rounded-lg flex justify-center items-center"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Update"
                        )}
                    </button>
                    <Link to="/students" className="text-center text-xl py-2 bg-[#700601] text-white rounded-lg flex justify-center items-center">
                        Back
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Edit;
