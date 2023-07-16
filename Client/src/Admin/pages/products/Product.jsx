import React, { useState } from 'react'
import './product.css'
import DataTable from '../../components/dataTable/DataTable';
// import Add from '../../components/add/Add';
import ProductTable from '../../components/producttable/ProductTable';
import AddProduct from '../../components/addProduct/AddProduct';
const Product = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="products">
            <h2>Product</h2>
            <button onClick={() => setOpen(true)}>Add New Product</button>
            <ProductTable />
            {open && <AddProduct setOpen={setOpen} />}
        </div>
    )
}

export default Product