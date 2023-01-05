// ======= default data =======
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");
const url = 'https://ac-w3-dom-pos.firebaseio.com/products.json'

// 菜單資料
let cartItems = []
let productData = []
// ======= 請從這裡開始 =======
//運用axios library從api拿資料
//從端點response的object中找到data
//將資料帶入function參數製作menu
//axios屬於非同步，如果把productData放在axios之後，
//productData還會是原本的空array，
//所以要寫在.then裡，確保資料拿到後再將productData參數帶入function
axios.get(url)
  .then((res) => {
    productData = res.data
    displayMenu(productData)
    // const cartBtn = document.querySelector('#cart-button')
  })
//展示產品 response data裡所需的資料寫進literal裡
//運用bootstrap card樣式
function displayMenu(products) {
  let htmlContent = ''
  productData.forEach(product => {
    htmlContent += `
    <div class="col-3">
        <div class="card">
          <img src="${product.imgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <button class="btn btn-primary order-btn" id="${product.id}">加入購物車</button>
          </div>
        </div>
      </div>
    `
  })
  menu.innerHTML = htmlContent
}
//加入購物車
function addToCart(event) {
  if (!event.target.classList.contains('btn')) return
  const id = event.target.id
  console.log(id)
  //從array productdata裡去尋是否有跟event.target.id回傳一樣的element
  const addedProduct = productData.find(product => product.id === id)
  //將此object的name設為name,price設為price
  const name = addedProduct.name
  const price = addedProduct.price
  //將addToCart的資料建立成一個購物車object
  //運用判斷式判斷購物車是否已經有新增過的產品，有的話該產品的quantity+1，
  //沒有則新增一個產品物件
  const targetItem = cartItems.find(item => item.id === id)
  if (targetItem !== undefined) {
    targetItem.quantity += 1
  } else {
    cartItems.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    })
  }
  //畫面顯示購物車清單
  //運用.map將array每一個index編輯後，建立一個新的array
  //運用.join將array改為string，避免將array的逗號(，)也解析出來
  //render到element cart
  //innetHTML可以呈現一個完整的JHTMLtag
  cart.innerHTML = cartItems.map(item => ` 
  <li class="list-group-item">${item.name} X ${item.quantity} 小計:
  ${item.price * item.quantity}</li>
`).join('')
  calculateTotal(price)
}
//-----------------計算總金額----------------------
let total = 0
function calculateTotal(amount) {
  total += amount
  totalAmount.textContent = total
  // totalAmount.textContent += price
}
//彈跳視窗
function checkout(event) {
  const alertMessage = `感謝購買\n總金額：${totalAmount.innerText}`
  alert(alertMessage)
}
button.addEventListener('click', checkout)
menu.addEventListener('click', addToCart)
// menu.addEventListener('click', function (event) {
//   if (event.target.classList.contains("order-btn")) {
//     console.log(target)
//     addToCart
//     // alert('shit')
//   }
// })
// button.addEventListener('click', checkout)
