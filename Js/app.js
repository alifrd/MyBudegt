


//		BUDGET CONTROLER
var budgetController = (function () {



})();





//		BUDGET CONTROLER
var UIController = (function () {
	

})();





// 		CONTROLLER
var Controller = (function (budgetCrtl,UICrtl) {

	var crtlAddItem = function() {
		

	}
	
	document.querySelector('.add__btn').addEventListener( 'click',crtlAddItem );

	document.addEventListener('keypress', function (Event) {
		if (Event.keyCode === 13 || Event.which === 13) { //when Press Ok
			crtlAddItem();
		};
	});

})(budgetController,UIController);



