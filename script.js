const fromText = document.querySelector(".from-text")
const from = document.querySelector(".from")
const fromDropdown = document.querySelector(".from-dropdown")
const toText = document.querySelector(".to-text")
const to = document.querySelector(".to")
const toDropdown = document.querySelector(".to-dropdown")
const additional = document.querySelector(".additional")
const showAdditional = document.querySelector(".add-content")
let fromSearch = document.querySelector("#search-from")
let toSearch = document.querySelector("#search-to")
let fromOptionList = document.querySelector(".from-option-list")
let toOptionList = document.querySelector(".to-option-list")
let allFromOptions = ["option 1", "option 2", "option 3", "option 4"]
let tableBody = document.querySelector("tbody")
let addRow = document.querySelector(".add-row")
const itemsArray = [
		{
				id: 1,
				unitPrice: 0,
				quantity: 0,
				tax: 15,
				netAmount: 0
		}
]









let fromOptions = allFromOptions.map(e =>{
				return `
						<li class="from-choice">${e}</li>
				`
})

let toOptions = allFromOptions.map(e =>{
				return `
						<li class="to-choice">${e}</li>
				`
})
fromOptions = fromOptions.join("")
toOptions = toOptions.join("")
fromOptionList.innerHTML = fromOptions
toOptionList.innerHTML = toOptions


const fromChoices = document.querySelectorAll(".from-choice")

fromChoices.forEach(function(choice){
		choice.addEventListener("click", (e) => {
			fromText.innerText = e.currentTarget.innerText
			fromDropdown.classList.remove("open")
		})
})

const toChoices = document.querySelectorAll(".to-choice")

//console.log(toChoices[0])
toChoices.forEach(function(choice){
		choice.addEventListener("click", (e) => {
			console.log(e.currentTarget.innerText)
			toText.innerText = e.currentTarget.innerText
			toDropdown.classList.remove("open")
		})
})

from.addEventListener("click", () => {
		fromDropdown.classList.toggle("open")
		toDropdown.classList.remove("open")
})
to.addEventListener("click", () => {
		toDropdown.classList.toggle("open")
		fromDropdown.classList.remove("open")
})

/*fromChoices.forEach(function(choice){
		choice.addEventListener("click", (e) => {
			fromText.innerText = e.currentTarget.innerText
			fromDropdown.classList.remove("open")
		})
})*/

/*toChoices.forEach(function(choice){
		choice.addEventListener("click", (e) => {
			toText.innerText = e.currentTarget.innerText
			toDropdown.classList.remove("open")
		})
})*/
showAdditional.addEventListener("click", (e) => {
		
		if (additional.style.display == "grid") {
				additional.style.display = "none"
		}else{
				additional.style.display = "grid"
		}
})

fromSearch.addEventListener("keyup", (e) =>{
		let newOptionsArr = allFromOptions.filter((option) => {
								if (option.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
										return option
								}
		})
		let newOptions = newOptionsArr.map(e =>{
				return `
						<li class="from-choice">${e}</li>
				`
		})
		newOptions = newOptions.join("")
		fromOptionList.innerHTML = newOptions
		
		const fromChoices = document.querySelectorAll(".from-choice")
		fromChoices.forEach(function(choice){
		choice.addEventListener("click", (e) => {
			fromText.innerText = e.currentTarget.innerText
			fromDropdown.classList.remove("open")
		})
})
})


toSearch.addEventListener("keyup", e => {
		let newOptionsArr = allFromOptions.filter((option) => {
			 if (option.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
										return option
				}
		})
		let newOptions = newOptionsArr.map(e =>{
				return `
						<li class="to-choice">${e}</li>
				`
		})
		newOptions = newOptions.join("")
		toOptionList.innerHTML = newOptions
		const toChoices = document.querySelectorAll(".to-choice")
		toChoices.forEach(function(choice){
				choice.addEventListener("click", (e) => {
		  	toText.innerText = e.currentTarget.innerText
			  toDropdown.classList.remove("open")
		})
		
})
})


function refreshTable() {
		let items = itemsArray.map(e => {
				return `
			<tr>
      <th scope="row">${e.id}</th>
      <td>
      		<select>
      				<option>Product</option>
      				<option>Services</option>
      		</select>
      </td>
      <td>$<input class="unit-price" value = "${e.unitPrice}" type = "number"></td>
      <td>
      		<div class="quantity">
      				<input type="number" class="qv" value = "${e.quantity}">
      				
      		</div>
      </td>
      <td>
      		<div class="tax">
      				<input type="number" class="tp" value = ${e.tax}>%
      				
      		</div>
      </td>
      <td>$${e.netAmount}</td>
      <td>
      		<div class="table-info">
      				<i class="fa-solid fa-ellipsis-vertical table-btn"></i>
      				<div class="table-drop">
      						<ul>
      								<li>Accounting Code</li>
      								<li>Description</li>
      								<li>Purchase Order</li>
      								<li class= "delete-row">Delete Row</li>
      						</ul>
      				</div>
      		</div>
      </td>
    </tr>
				`
		})
		
		items = items.join("")
		tableBody.innerHTML = items
		quantityIncrease()
		quantityDecrease()
		taxChange()
		showTableDrop()
	  updatePrice()
	  updateQuantity()
	  calcNetTotal()
	  calcTaxTotal()
	  calcTotalAmount()
	  deleteRow()
}

refreshTable()


addRow.addEventListener("click", addTableRow)

function addTableRow() {
		let placeholder = {
				id: itemsArray.length + 1 ,
				unitPrice: 0,
				quantity: 0,
				tax: 15,
				netAmount: 0
		}
		itemsArray.push(placeholder)
		refreshTable()
}


function quantityIncrease() {
		let qIncrease = Array.from(document.querySelectorAll(".q-increase"))

qIncrease.forEach(trow => {
		trow.addEventListener("click", ()=>{
		  itemsArray[qIncrease.indexOf(trow)].quantity = parseInt(itemsArray[qIncrease.indexOf(trow)].quantity) + 1
		  let sum = itemsArray[qIncrease.indexOf(trow)].quantity * itemsArray[qIncrease.indexOf(trow)].unitPrice
		  
		  itemsArray[qIncrease.indexOf(trow)].netAmount = sum
		 refreshTable()
		})
})

}

function quantityDecrease() {
		let qDecrease = Array.from(document.querySelectorAll(".q-decrease"))

qDecrease.forEach(trow => {
		trow.addEventListener("click", ()=>{
		if (itemsArray[qDecrease.indexOf(trow)].quantity > 0) {
				itemsArray[qDecrease.indexOf(trow)].quantity = itemsArray[qDecrease.indexOf(trow)].quantity - 1
				let sum = itemsArray[qDecrease.indexOf(trow)].quantity * itemsArray[qDecrease.indexOf(trow)].unitPrice
				
				itemsArray[qDecrease.indexOf(trow)].netAmount = sum
		}
		  
		 refreshTable()
		})
})

}

function taxChange(){
		let tChange = Array.from(document.querySelectorAll(".tp"))
		tChange.forEach(e => {
				e.addEventListener("keyup", a =>{
				
							itemsArray[tChange.indexOf(e)].tax = a.currentTarget.value
						let sum = itemsArray[tChange.indexOf(e)].quantity * itemsArray[tChange.indexOf(e)].unitPrice
						
						itemsArray[tChange.indexOf(e)].netAmount = sum
						if (a.keyCode == 13) {
								refreshTable()
						}
						
				})
		})
		
}

function showTableDrop() {
		let tableBtn = Array.from(document.querySelectorAll(".table-btn"))
		let tableDrop = document.querySelectorAll(".table-drop")
		
		tableBtn.forEach(e=> {
				e.addEventListener("click", ()=>{
					for(i = 0; i< tableDrop.length; i++){
							if (tableBtn.indexOf(e) == i) {
									tableDrop[i].classList.toggle("open")
							} else{
									tableDrop[i].classList.remove("open")
							}
							
					}	
				})
		})
}
function updatePrice() {
		let unitPrice = Array.from(document.querySelectorAll(".unit-price"))
		
		unitPrice.forEach(e=> {
				e.addEventListener("keyup", (a)=> {
				
							itemsArray[unitPrice.indexOf(e)].unitPrice = a.currentTarget.value
						let sum = itemsArray[unitPrice.indexOf(e)].quantity * itemsArray[unitPrice.indexOf(e)].unitPrice
						
						itemsArray[unitPrice.indexOf(e)].netAmount = sum
						
						
						if (a.keyCode == 13) {
								refreshTable()
						}
				})
				
		})
		
}

function updateQuantity() {
		let quantity = Array.from(document.querySelectorAll(".qv"))
		quantity.forEach(e => {
				e.addEventListener("keyup", a => {
						
						itemsArray[quantity.indexOf(e)].quantity  = a.currentTarget.value
						
						let sum = itemsArray[quantity.indexOf(e)].quantity * itemsArray[quantity.indexOf(e)].unitPrice
						
						itemsArray[quantity.indexOf(e)].netAmount = sum
						
						if (a.keyCode == 13) {
								refreshTable()
						}
						
						
				})
		})
}

function calcNetTotal() {
		let sum = 0
		for(i = 0; i< itemsArray.length; i++){
				sum += itemsArray[i].netAmount
		}
		document.querySelector(".net-amount").innerText = "$" + sum
}
function calcTaxTotal() {
		let sum = 0
		for(i= 0; i< itemsArray.length; i++){
				sum += itemsArray[i].tax / 100 * itemsArray[i].netAmount
		}
		document.querySelector(".dip-amount").innerText = "$" + sum
}

function calcTotalAmount() {
		let net = 0
		let tax = 0
		for(i= 0; i< itemsArray.length; i++){
				tax += itemsArray[i].tax / 100 * itemsArray[i].netAmount
				net += itemsArray[i].netAmount
		}
		let total = net + tax
		document.querySelector(".total-value").innerText = "$" + total
}

document.querySelector(".download-btn").addEventListener("click", () => {
		let body = document.querySelector("body")
		html2pdf().from(body).save()
})

function deleteRow() {
		let deleteR = Array.from(document.querySelectorAll(".delete-row"))
		
		deleteR.forEach(e => {
				e.addEventListener("click", () => {
						
						itemsArray.splice(deleteR.indexOf(e), 1)
						refreshTable()
				})
		})
}