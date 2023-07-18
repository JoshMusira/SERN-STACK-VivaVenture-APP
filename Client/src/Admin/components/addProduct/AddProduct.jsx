import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../context/userContext/Context';
import { FaTimes } from 'react-icons/fa';
import './addproduct.css';
import { apiDomain } from '../../../utils/utilsDomain';
import { useForm } from 'react-hook-form';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = ({ setOpen, open }) => {
    const { user } = useContext(Context);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [imageUpload, setImageUpload] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [data, setProductData] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const id = JSON.parse(localStorage.getItem('id'))
    useEffect(() => {
        const handleUpdate = async () => {
            try {
                const response = await axios.get(`${apiDomain}/products/${id}`, {
                    headers: {
                        Authorization: `${user.token}`,
                    },
                });

                setProductData(response.data);
                setName(response.data[0]?.name);
                setEmail(response.data[0]?.email);
            } catch (error) {
                console.log(error);
                console.error('Error fetching user data:', error);
            }
        };

        handleUpdate();
    }, [id, user.token]);
    // console.log(data);
    const uploadImage = async () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `ecommerce/${imageUpload.name + uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);

        try {
            setIsUploading(true);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                null,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            saveDataToDatabase(url);
                            toast.success('Image Uploaded Successfully');
                            setIsUploading(false);
                        })
                        .catch((error) => {
                            console.log('Error retrieving image URL:', error);
                        });
                }
            );
        } catch (error) {
            console.log('Error uploading image:', error);
            toast.error('Error uploading image');
            setIsUploading(false);
        }
    };

    const saveDataToDatabase = async (image_url) => {
        try {
            const formData = new FormData(document.querySelector('form'));

            const requestData = {
                name: formData.get('name'),
                description: formData.get('description'),
                price: formData.get('price'),
                inventory_count: formData.get('inventory_count'),
                category: formData.get('category'),
                storage: formData.get('storage'),
                ram: formData.get('ram'),
                image_url: image_url,
            };

            const response = await axios.post(`${apiDomain}/product`, requestData, {
                headers: {
                    Authorization: user.token,
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Product created');
            setOpen(false);
        } catch (error) {
            console.log(error);
            toast.error('Error creating product');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const label = e.target.labels[0];
            if (label) {
                label.innerHTML = file.name;
            }
            setImageUpload(file);
        }
    };

    const onSubmit = (formData) => {
        uploadImage();
    };

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    <FaTimes />
                </span>
                <h1>{open ? 'Edit Product' : 'Add New Product'}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="productContainer">
                        <div className="pleft">
                            <label htmlFor="name">Name: </label>
                            <input
                                required
                                {...register('name', { required: true })}
                                type="text"
                                placeholder="Product name"
                            />
                            {errors.name && <p>This field is required</p>}
                            <label htmlFor="description">Description: </label>
                            <input
                                required
                                {...register('description')}
                                type="text"
                                placeholder="Product description"
                            />
                            <label htmlFor="price">Price: </label>
                            <input
                                required
                                {...register('price')}
                                type="text"
                                placeholder="Product price"
                            />
                            <label htmlFor="inventory_count">Total: </label>
                            <input
                                required
                                {...register('inventory_count')}
                                type="number"
                                placeholder="Total products in store"
                            />
                        </div>
                        <div className="pright">
                            <label htmlFor="category">Category: </label>
                            <input
                                required
                                {...register('category')}
                                type="text"
                                placeholder="Product Category"
                            />
                            <label htmlFor="storage">Storage: </label>
                            <input
                                required
                                {...register('storage')}
                                type="text"
                                placeholder="Total products in store"
                            />
                            <label htmlFor="ram">Ram: </label>
                            <input
                                required
                                {...register('ram')}
                                type="number"
                                placeholder="Products storage ram"
                            />
                            <label htmlFor="file" id="fileLabel">
                                Image
                            </label>
                            <input
                                {...register('image_url')}
                                type="file"
                                id="myFileInput"
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={isUploading}>
                        {isUploading ? `Uploading... ${uploadProgress.toFixed(2)}%` : 'Send'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddProduct;
