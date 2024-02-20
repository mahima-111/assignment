const DisplayTransactionTable = ({productList}) => {
    return (
    <table className="table-auto border-spacing-5	text-center border-2 border-blue-400">
        <thead className="border-b-2 border-blue-400">
            <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">sold</th>
                <th className="p-4">Image</th>
            </tr>
        </thead>
        <tbody>
            {productList.map((elem) => {
                const {id,title,price,description,category,sold,image}=elem;
                return <tr key={id}>
                <td className="p-4">{id}</td>
                <td className="p-4 w-[15%]">{title}</td>
                <td className="p-4 w-[50%]">{description}</td>
                <td className="p-4">{price}</td>
                <td className="p-4">{category}</td>
                <td className="p-4">{sold?'yes':'no'}</td>
                <td className="p-4 w-[20%]"><img src={image} className="object-cover" /></td>
            </tr>
            })}
        </tbody>
    </table>
    )
}

export default DisplayTransactionTable