


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
		},
		budget : 0 ,
		percentage : 0
	}

	var Expense = function(id,description,value){
		this.id = id ;
		this.description = description ;
		this.value = value ;
		this.percentage = -1 ;
	}

	Expense.prototype.calcPercentage = function(totalincome){
		
		if (totalincome > 0 )
			this.percentage = Math.round((this.value / totalincome)*100) ;
		else
			this.percentage =-1 ;
		
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage ;
	};

	var Income = function(id,description,value){
		this.id = id ;
		this.description = description ;
		this.value = value ;
	}

	var calculateTotal =function (type) {
		var sum = 0;
		data.allItems[type].forEach(function (currrent,index) {
			sum = sum + currrent.value; 
		});
		data.totals[type] = sum ;
	};
	
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
		calculateBudget : function () {
			calculateTotal("exp");
			calculateTotal("inc");

			data.budget = data.totals.inc - data.totals.exp ;
			if (data.totals.inc > 0 )
				data.percentage = Math.round(((data.totals.exp / data.totals.inc)*100)) ;
			else
				data.percentage =-1 ;
		
		},
		calculatePercentages : function(){
			data.allItems.exp.forEach(function (cur) {
				cur.calcPercentage(data.totals.inc);
			});
		},
		getPercentages : function () {
			var allPerc = data.allItems.exp.map(function(cur) {
				return cur.getPercentage();
			});
			return allPerc ;
		},
		deleteItem : function ( type , id ) {
		   	var ids ;

		    ids = data.allItems[type].map(function(currrent) {
				return currrent.id;
			});
			index = ids.indexOf(id);

			if (index !== -1 ) {
				data.allItems[type].splice(index , 1)
			};
			console.log(data.allItems[type])

		},
		getBudget: function () {
			return {
				budget : data.budget ,
				totalInc : data.totals.inc ,
				totalExp : data.totals.exp ,
				percentage : data.percentage
			};
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
		expenseContainer : '.expenses__list',
		budgetLabel : '.budget__value',
		incomeLabel  : '.budget__income--value',
		epeneseLabel : '.budget__expenses--value',
		percentageLabel : '.budget__expenses--percentage',
		container : '.container',
		expensesPercLebel : '.item__percentage'

	}

	return{
		getInput : function () {
			return {
				type :  document.querySelector(DOMstrins.inputType).value ,
				description : document.querySelector(DOMstrins.inputDescription).value ,
				value : parseFloat(document.querySelector(DOMstrins.inputValue).value) 
			}	
		},
		getDomstrings : function () {
			return DOMstrins;
		},
		addListItem : function (obj,type) {
			var html , element;

			if (type === "inc") { 
				element=DOMstrins.incomeContainer;	
				html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
	            }
	        else if(type === "exp"){
	        	element=DOMstrins.expenseContainer;
	            html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
	        }

            html = html.replace("%id%", obj.id)   
		    html = html.replace("%description%", obj.description)   
		    html = html.replace("%value%", obj.value)

		    document.querySelector(element).insertAdjacentHTML('beforeend',html);
		},
		clearFileds : function () {
			var fileds ;
			
			fileds = document.querySelectorAll(DOMstrins.inputDescription+", "+DOMstrins.inputValue);

			fileds.forEach(function (item,index,array) {
				item.value = "";
			});

			fileds[0].focus();
		},
		deleteListItem : function (selectID) {
			var ele = document.getElementById(selectID) ;
			ele.parentNode.removeChild(ele);
		},
		displayBudegt : function (obj) {
			document.querySelector(DOMstrins.budgetLabel).textContent = obj.budget ;
			document.querySelector(DOMstrins.incomeLabel).textContent = obj.totalInc ;
			document.querySelector(DOMstrins.epeneseLabel).textContent = obj.totalExp ;
			
			console.log(obj.percentage)

			if (obj.percentage > 0 )	
				document.querySelector(DOMstrins.percentageLabel).textContent = (obj.percentage) + "%" ;
			else
				document.querySelector(DOMstrins.percentageLabel).textContent = "---" ;
		
		},
		displayPercentages : function (percentages) {
			var Fields = document.querySelectorAll(DOMstrins.expensesPercLebel);

			var nodeListForeach = function(list,callback){
				for (var i = 0; i < list.length; i++) {
					callback(list[i],i);
				};
			};

			nodeListForeach(Fields,function (currrent , index) {
				if (percentages[index] > 0)
					currrent.textContent = percentages[index] + "%";
				else 
					currrent.textContent = "---";	
			});
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

		document.querySelector(DOM.container).addEventListener('click',crtlDeleteItem)
	};

	var updateBudget = function () {
		budgetCrtl.calculateBudget();

		var budget = budgetCrtl.getBudget();

		UICrtl.displayBudegt(budget);	
	}

	var updatePercantages = function () {
		budgetCrtl.calculatePercentages();

		var percentages = budgetCrtl.getPercentages();

		UICrtl.displayPercentages(percentages);
	}


	var crtlAddItem = function() {
		var input,newItem;

		input = UICrtl.getInput();

		if (input.description !=="" && input.value !=="" && !isNaN(input.value ) && input.value>0) {
			
			newItem = budgetCrtl.addItem(input.type,input.description,input.value);

			UICrtl.addListItem(newItem,input.type);

			UICrtl.clearFileds();

			updateBudget();

			updatePercantages();
		};
	}

	var crtlDeleteItem = function (event) {
		var itemId , splitId , type , id;
		
		itemId = event.target.parentNode.parentNode.parentNode.parentNode.id
		
		if (itemId) {

			splitId = itemId.split('-');
			type = splitId[0];
			id = parseInt(splitId[1]) ;
		
			budgetCrtl.deleteItem(type,id);
			
			UICrtl.deleteListItem(itemId);
			
			updateBudget();
		};
		

	}
	
	return{
		init : function(){
			setUpEventListener();
			UICrtl.displayBudegt({
				budget : 0 ,
				totalInc : 0 ,
				totalExp : 0 ,
				percentage : 0
			});	

			crtlAddItem();
		}
	}

})(budgetController,UIController);



Controller.init();