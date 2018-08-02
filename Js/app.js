


//		BUDGET CONTROLER
var budgetController = (function () {



})();





//		BUDGET CONTROLER
var UIController = (function () {
	
	var DOMstrins = {
		inputType : ".add__type",
		inputDescription : ".add__description" ,
		inputValue: ".add__value",
		inputBtn: '.add__btn',

	}

	return{
		getInput : function () {
			return {
				type :  document.querySelector(DOMstrins.inputType).value ,
				description : document.querySelector(DOMstrins.inputDescription).value ,
				value : document.querySelector(DOMstrins.inputValue).value
			}	
		},
		getDomstrings : function () {
			return DOMstrins;
		}

	};
})();





// 		CONTROLLER
var Controller = (function (budgetCrtl,UICrtl) {

	var DOM = UICrtl.getDomstrings();

	var crtlAddItem = function() {
		var input = UICrtl.getInput();
		console.log(input)

	}
	
	document.querySelector(DOM.inputBtn).addEventListener( 'click',crtlAddItem );

	document.addEventListener('keypress', function (Event) {
		if (Event.keyCode === 13 || Event.which === 13) { //when Press Ok
			crtlAddItem();
		};
	});

})(budgetController,UIController);



