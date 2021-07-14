var cap = document.getElementById('capital');
var fees = document.getElementById('fees');
var freq = document.getElementById('frequency');
var date = document.getElementById('start_date');
var btnCalc = document.getElementById('calculate');

if (btnCalc) {

	btnCalc.addEventListener('click', function (e) {

		e.preventDefault();

		if (validateFields()) {

			let formData = new FormData(document.getElementById("formu"));

			fetch('Calcular', {
				method: 'POST',
				body: formData,
			})
			.then(response => response.json())
			.then(res => {
				showTable();
			}).catch(error => console.log(error))

		} else {

			Swal.fire({
				position: 'center',
				icon: 'warning',
				title: '!Debe llenar todo los campos!',
				showConfirmButton: false,
				timer: 1100
			})

		}
	});

	cap.addEventListener('blur', validateField);
	fees.addEventListener('blur', validateField);
}

function validateField(evt) {

	if (evt.target.value < 1 || isNaN(evt.target.value) || evt.target.value == '') {
		evt.target.style.borderBottom = '1px solid red';
	} else {
		evt.target.style.borderBottom = 'none';
	}
}

function validateFields() {

	let isValid = true;

	let value_cap = cap.value;
	let value_fees = fees.value;
	let value_freq = freq.value;
	let value_date = date.value;

	if (value_cap == '' || value_cap == undefined || value_cap == null) {
		isValid = false;
	}

	if (value_fees == '' || value_fees == undefined || value_fees == null || value_fees == 0) {
		isValid = false;
	}

	if (value_freq == '' || value_freq == undefined || value_freq == null || value_freq == 'Frecuencia') {

		if (value_freq != 1 || value_freq != 2 || value_freq != 3 || value_freq != 4) {

			isValid = false;
		}
	}

	if (value_date == '' || value_date == undefined || value_date == null) {
		isValid = false;
	}

	return isValid;
}

function showTable() {

	switch (freq.value) {
		case "1":
			createFee(1);
			break;
		case "2":
			createFee(7);
			break;
		case "3":
			createFee(15);
			break;
		case "4":
			createFee(30);
			break;
	}
}

function createFee(value) {

	let myDate = new Date(date.value.replace(/-/g, '/'));

	const feess = fees.value;

	let amount_of_fee = cap.value / feess;

	let table = document.getElementById('body-loan');

	table.innerHTML = '';

	for (let i = 1; i <= feess; i++) {

		let bloc = `
			<tr>
				<td>${i}</td>
				<td>${myDate.toLocaleDateString()}</td>
				<td>${amount_of_fee.toFixed(2)}</td>
			</tr>`;

		table.innerHTML += bloc;

		myDate.setDate(myDate.getDate() + value);
	}
}
