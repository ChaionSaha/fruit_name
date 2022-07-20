"use strict";

const newFruit = document.querySelector("#fruits_name");
const displayField = document.querySelector(".fruits ul");
const notDiv = document.querySelector(".notification");
let fruits = [];

if (localStorage.length >= 1) {
	fruits = JSON.parse(localStorage.getItem("x"));
}

console.log(fruits);
// if(0) console.log('I am chaion');
// console.log(localStorage.);

// console.log(fruits);

const upperFirstLetter = function (word) {
	word = word.toLowerCase();
	return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
};

const notificationCenter = function (color, text) {
	const notification = document.createElement("p");
	notification.style.backgroundColor = color;
	notification.innerText = text;
	notDiv.appendChild(notification);
	setTimeout(function () {
		notification.classList.add("hidden");
		setTimeout(() => {
			notDiv.removeChild(notification);
		}, 400);
	}, 1000);
};

const fruitNameEnter = function () {
	const fruitName = newFruit.value.toLowerCase();
	if (fruits !== null && fruits.includes(fruitName)) {
		notificationCenter(
			"red",
			"Cannot add the fruit name. It is already added."
		);
	} else if (fruitName === "") {
		notificationCenter("red", "Input Field Empty.");
	} else {
		fruits.push(fruitName.toLowerCase());
		notificationCenter(
			"green",
			`${upperFirstLetter(fruitName)} has been added.`
		);
		updateUI();
		localStorage.setItem("x", JSON.stringify(fruits));
	}
	newFruit.value = "";
};

const updateUI = function () {
	displayField.innerHTML = "";
	if (fruits === null) return;
	fruits.forEach((fruit) => {
		const listItem = document.createElement("li");
		listItem.innerText = upperFirstLetter(fruit);
		displayField.appendChild(listItem);
	});
};
updateUI();

document.querySelector(".sub-btn").addEventListener("click", (e) => {
	e.preventDefault();
	fruitNameEnter();
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		fruitNameEnter();
	}
});

localStorage.removeItem('randid');