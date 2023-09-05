const socket = io()

socket.on('AllProducts', (data) => {

    updateProductList(data);
});

// Función para actualizar la lista de productos en la página web
function updateProductList(products) {
    const containerDiv = document.getElementById("allProductsContainer");
    let contenidocambiante = ""

    products.forEach(({ thumbnail, price, description, id, code, stock, status, category, title }) => {
        contenidocambiante += `<div class="form-container">
            <div>
                <div class="card">
                    <img src= "${thumbnail}" alt="..." class="images">
                    <div class="card-body">
                        <p class="card-text">Title : ${title} $'</p>
                        <p class="card-text">Price : ${price} $'</p>
                        <p class="card-text">Description : ${description} $'</p>
                        <p class="card-text">Id: ${id}</p>
                        <p class="card-text">Code: ${code}</p>
                        <p class="card-text">Stock: ${stock}</p>
                        <p class="card-text">Status: ${status}</p>
                        <p class="card-text">Category: ${category}</p>
                    </div>
                </div>
            </div>
        </div>`

    });

    containerDiv.innerHTML = contenidocambiante
}

let productForm = document.getElementById("formProduct");
productForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    let description = productForm.elements.description.value;
    let title = productForm.elements.title.value;
    let price = productForm.elements.price.value;
    let thumbnail = productForm.elements.thumbnail.value;
    let code = productForm.elements.code.value;
    let stock = productForm.elements.stock.value;
    // let status = productForm.elements.status.value;
    var status = document.getElementById('status').checked;
    let category = productForm.elements.category.value;

    socket.emit('sendNewProduct', {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
    })
    productForm.reset()
})

document.getElementById("deleteBoton").addEventListener("click", function () {
    const producttoDelete = document.getElementById("ProductID");
    const PRODID = parseInt(producttoDelete.value, 10);
    socket.emit("functionDeleteProduct", PRODID);
    producttoDelete.value = "";
});
