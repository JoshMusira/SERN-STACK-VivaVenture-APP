import React, { useState } from 'react'
import './product.css'
import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add';
import ProductTable from '../../components/producttable/ProductTable';

const Product = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="products">
            <div>Product</div>
            <button onClick={() => setOpen(true)}>Add New Product</button>
            <ProductTable />
            {open && <Add setOpen={setOpen} />}
        </div>
    )
}

export default Product