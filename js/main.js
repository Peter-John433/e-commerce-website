// ==================start when the document is ready ====================

if(document.readyState == "loading" ) {
  document.addEventListener("DOMContentLoaded", start);
}else{
  start()
}


// ======================= start ======================

function start() {
  addEvents()
}




// ======================= update ======================

function upDate() {
  addEvents();
  upDateTotal();
}






// ======================= addevents ======================

function addEvents() {
//remove item from the cart

  let cartRemoveBtn = document.querySelectorAll(".cart-remove");
  console.log(cartRemoveBtn)
  cartRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem)
  });

  // change items quantity

  let cartQuantityInput = document.querySelectorAll(".cart-quantity");
  cartQuantityInput.forEach(input => {
    input.addEventListener("change", handleEventItem)
  });

  // add items to cart
  let addCart_btn = document.querySelectorAll(".buyme-now");
  addCart_btn.forEach(btn => {
    btn.addEventListener("click", handle_addCartItem);
  })

  // buy order
  const buyBtn = document.querySelector(".btn-buy");
  buyBtn.addEventListener("click", handle_buyOrder)
}

//====================== HANDLE EVENTS FUNCTIONS =======================

let itemsAdded = [];
function handle_addCartItem(){
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let img = product.querySelector(".product-img").src;
  console.log(title, price, img)


  let newToAdd = {
    title,
    price,
    img
  };
  //handle item is already exist
  if(itemsAdded.find((el) => el.title == newToAdd.title)) {
    swal.fire({
      title: `
              <bold style="
              color: red; 
              font-size: 40px; 
              font-weight: 600; 
              text-transform: capitalize;
              ">Error! &#128546;</bold>`,
      titleColor: "red",
      icon: "error",
      html: `
              <bold style='
              font-size: 20px; 
              text-transform: capitalize; 
              font-weight: 600;
              color: #000;
              '>this item aleardy exist in the cart</bold>`,
      showConfirmButton: true,
      confirmButtonText: "press <strong>OKAY!</strong>",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "press OKAY!",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#000",
      cancelButtonAriaLabel: "Cancel",
      width: 800,
      // background: "lightgray",
      backdrop: "rgba(0, 0, 0, 0.7)",
      padding: "3em",
      allowOutsideClick: false,
      color: "red",
      footer: `
            <strong 
            style="
            color: #000;
            font-size: 30px;
            text-align: center;"
            class="
            animate__animated
            animate__zoomIn
            animate__infinite
            animate__slow">Thanks for patronizing Eden's Perfumery</strong>`
      
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: `
              <bold style="
              color: #000; 
              font-size: 40px; 
              font-weight: 600; 
              text-transform: capitalize;
              ">Open cart at top right menu(scroll up)</bold>`,
          html: `
              <bold style='
              font-size: 20px; 
              text-transform: capitaliz; 
              font-weight: 600;
              '>increase your items in the cart</bold>`,
          showConfirmButton: true,
          confirmButtonText: `<strong style="letter-spacing: 1.6px;">THANKS</strong>`,
          confirmButtonColor: "green",
          confirmButtonAriaLabel: "THANKS",
          width: 800,
          backdrop: "rgba(0, 0, 0, 0.7)",
          padding: "3em",
          allowOutsideClick: false,
          footer: `
                <strong 
                style="
                color: #000;
                font-size: 30px;
                text-align: center;"
                class="
                animate__animated
                animate__zoomIn
                animate__infinite
                animate__slow">Thanks for patronizing Eden's Perfumery</strong>`
      
        })
      }
    })
    return;
  }else{
    itemsAdded.push(newToAdd)
  }
// add product to cart
  let cartBoxElement = cartBoxComponent(title, price, img);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = document.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  upDate()
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
    el.title !=
    this.parentElement.querySelector(".cart-product-title").innerHTML
  );
  upDate()
}

function  handleEventItem() {
  if(isNaN(this.value) || this.value < 1 ) {
    this.value = 0;
  }
  this.value = Math.floor(this.value); //to keep it in interger

  upDate()
}

function handle_buyOrder(){
  if(itemsAdded.length <= 0 ){
    // alert("There is no order to place \n please make an order first.");

    swal.fire({
      title: `
            <strong style='
            color: rgb(245, 0, 0); 
            border: 1px solid red; 
            padding: 10px; 
            border-radius: 4px; 
            font-size: 25px; 
            font-weight: 600;
            '>Error! &#128546;</strong>`,
      titleColor: "red",
      icon: "error",
      html: `
              <bold style='
              font-size: 20px; 
              text-transform: capitalize; 
              font-weight: 600;
              color: #000;
              '>Cart is empty, kindly place an order.</bold>`,
      showConfirmButton: true,
      confirmButtonText: "<strong>OKAY</strong>",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "okay",
      width: 800,
      backdrop: "rgba(0, 0, 0, 0.7)",
      padding: "3em",
      allowOutsideClick: false,
      position: "top",
      color: "red",
      footer: `
      <strong 
      style="
      color: #000;
      font-size: 30px;
      text-align: center;"
      class="
      animate__animated
      animate__zoomIn
      animate__infinite
      animate__slow">Thanks for patronizing Eden's Perfumery</strong>`
    })
  

    return;
  }
  const cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = "";
  
  swal.fire({
    title: "<strong style='color: green; font-size: 25px; font-weight: 600;'>SUCCESS</strong>",
    titleColor: "red",
    icon: "success",
    html: `
            <bold style='
            font-size: 20px; 
            text-transform: capitalize; 
            font-weight: 600;
            color: #000;
            '>your order is placed successfully.</bold>`,
    showConfirmButton: true,
    confirmButtonText: "<strong>OKAY</strong>",
    confirmButtonColor: "green",
    confirmButtonAriaLabel: "okay",
    width: 800,
    backdrop: "rgba(0, 0, 0, 0.7)",
    padding: "3em",
    allowOutsideClick: false,
    position: "top",
    footer: `
    <strong 
    style="
    color: #000;
    font-size: 30px;
    text-align: center;"
    class="
    animate__animated
    animate__zoomIn
    animate__infinite
    animate__slow">Thanks for patronizing Eden's Perfumery</strong>`
  })


  itemsAdded = []
  upDate()
}


//=======================UPDATE and RENDERING FUNCTIONS==================

function upDateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = document.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach(cartBox => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  })
  //to keep two numbers after decimal
  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}


//===================HTML COMPONENT ===================

function cartBoxComponent(title, price, img) {
  return `<div class="cart-box">
            <img src=${img} alt="my-cart" class="img-fluid cart-img">
            <div class="detail-box">
              <div class="cart-product-title text-uppercase">${title}</div>
              <div class="cart-price fw-bold fs-6">${price}</div>
              <input type="number" name="cart-input" id="cart-quantity" value="1" class="cart-quantity">
            </div>
            <!-- cart-remove -->
            <i class="bi bi-trash cart-remove text-danger fs-5"></i>
          </div>
  `
}












// confirm("Still want to add more items?");
  // alert("your order is placed successfully.");





