let expenses = JSON.parse(localStorage.getItem("expenses")) || []

let form = document.getElementById("expenseForm")
let table = document.getElementById("expenseTable")
let totalDisplay = document.getElementById("total")

// Function to format date from YYYY-MM-DD to DD-MM-YYYY
function formatDateToIndian(dateString) {
  if(!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return day + '-' + month + '-' + year;
}

form.addEventListener("submit", function(e){

e.preventDefault()

let date = document.getElementById("date").value
let category = document.getElementById("category").value
let amount = document.getElementById("amount").value
let note = document.getElementById("note").value

let expense = {
date:date,
category:category,
amount:Number(amount),
note:note
}

expenses.push(expense)

localStorage.setItem("expenses", JSON.stringify(expenses))

form.reset()

displayExpenses()

})


function displayExpenses(){

table.innerHTML=""

expenses.sort(function(a,b){
return new Date(b.date) - new Date(a.date)
})

let total = 0

expenses.forEach(function(expense,index){

let row = document.createElement("tr")

row.innerHTML =
"<td>"+formatDateToIndian(expense.date)+"</td>"+
"<td>"+expense.category+"</td>"+
"<td>"+expense.amount+"</td>"+
"<td>"+expense.note+"</td>"+
"<td><button onclick='deleteExpense("+index+")'>X</button></td>"

table.appendChild(row)

total += expense.amount

})

totalDisplay.textContent = total

}


function deleteExpense(index){

expenses.splice(index,1)

localStorage.setItem("expenses", JSON.stringify(expenses))

displayExpenses()

}

displayExpenses()