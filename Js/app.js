


//		BUDGET CONTROLER
var budgetController = (function () {

	
	var data = {
		allItems : {
			exp :  [],
			inc : []
		},
		totals :{
			exp : 0,
			inc : 0
		}
	}

	var Expense = function(id,description,value){
		this.id = id ;
		this.description = description ;
		this.value = value ;
	}



	var Income = function(id,description,value){
		this.id = id ;
		this.description = description ;
		this.value = value ;
	}

	return {
		addItem : function (type , des , val) {
			var newItem , id;
			if (data.allItems[type].length > 0)
				id = data.allItems[type][data.allItems[type].length - 1].id +1;	
			else
				id = 0 ;
			
			if (type === "inc")
					newItem = new Income(id,des,val);
			else if(type === "exp")
					newItem = new Expense(id,des,val);
			data.allItems[type].push(newItem);
			
			
			return newItem;	
		},
		testing : function () {
			console.log(data)
		}
	}
	

})();












//		BUDGET CONTROLER
var UIController = (function () {
	
	var DOMstrins = {
		inputType : ".add__type",
		inputDescription : ".add__description" ,
		inputValue: ".add__value",
		inputBtn: '.add__btn',
		incomeContainer : '.income__list',
		expenseContainer : '.expenses__list'

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
		},
		addListItem : function (obj,type) {
			var html , element;

			if (type === "inc") { 
				element=DOMstrins.incomeContainer;	
				html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
	            }
	        else if(type === "exp"){
	        	element=DOMstrins.expenseContainer;
	            html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
	        }

            html = html.replace("%id%", obj.id)   
		    html = html.replace("%description%", obj.description)   
		    html = html.replace("%value%", obj.value)

		    document.querySelector(element).insertAdjacentHTML('beforeend',html);
		},
		clearFileds : function () {
			var fileds ;
			fileds = document.querySelectorAll(DOMstrins.inputDescription+", "+DOMstrins.inputValue);
		}

	};
})();


















// 		CONTROLLER
var Controller = (function (budgetCrtl,UICrtl) {

	var setUpEventListener = function(){
	
		var DOM = UICrtl.getDomstrings();

		document.querySelector(DOM.inputBtn).addEventListener( 'click',crtlAddItem );

		document.addEventListener('keypress', function (Event) {
			if (Event.keyCode === 13 || Event.which === 13) { //when Press Ok
				crtlAddItem();
			};
		});
	};


	var crtlAddItem = function() {
		var input,newItem;

		input = UICrtl.getInput();

		if (input.description !=="" || input.value !=="") {
			
			newItem = budgetCrtl.addItem(input.type,input.description,input.value);

			UICrtl.addListItem(newItem,input.type);
		};
	}
	
	return{
		init : function(){
			setUpEventListener();
			crtlAddItem();
		}
	}

})(budgetController,UIController);



Controller.init();