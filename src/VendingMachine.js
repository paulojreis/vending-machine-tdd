var products = [
	{
		name: 'Beer',
		price: 2.4,
		stock: 5
	}, {
		name: 'Coke',
		price: 1.8,
		stock: 3,
	}, {
		name: 'Water',
		price: 1.2,
		stock: 0,
	},
];

var acceptedCoins = [
	0.1,
	0.2,
	0.5,
	1,
	2
];

function VendingMachine() {
	this.deposit = 0;
	this.display = '';
	this.tray = [];
	this.changeTray = 0;
	
	this.setDisplayWithDeposit();	
}

VendingMachine.prototype = {
	readDisplay : function () {
		return this.display;
	},

	pressBeerButton : function () {
		this.handleButtonPress('Beer');		
	},

	pressCokeButton : function () {
		this.handleButtonPress('Coke');		
	},

	pressWaterButton : function () {
		this.handleButtonPress('Water');		
	},

	pressCancelButton : function () {
		if (this.deposit > 0) {
			this.changeTray += this.deposit;
			this.deposit = 0;

			this.setDisplayWithDeposit();
		}
	},

	putCoin : function (coin) {
		if (acceptedCoins.indexOf(coin) > 0) {
			this.deposit += coin;
			this.setDisplayWithDeposit();
		}
	},

	trayHasItem : function (itemName) {
		return this.tray.indexOf(itemName.toLowerCase()) > -1;
	},

	// Private
	getItem : function (itemName) {
		return products.find(function (item) {
			return item.name.toLowerCase() === itemName.toLowerCase(); 	
		});
	},

	getChangeTrayAmount : function () {
		return Math.round(this.changeTray * 100) / 100;
	},

	setMoneyDisplayValue : function (moneyAmount) {
		this.display = '€ ' + moneyAmount.toFixed(2);
	},

	setDisplayWithDeposit : function (moneyAmount) {
		this.display = '€ ' + this.deposit.toFixed(2);
	},

	setNotEnoughMoneyDisplayValue: function () {
		this.display = 'Not enough money.';
	},

	setDispensedItemDisplayValue : function () {
		this.display = 'Item dispensed.';
	},

	setUnavailableItemDisplayValue : function () {
		this.display = 'Item unavailable.';
	},

	handleButtonPress: function (productName) {
		var item = this.getItem(productName),
			price = item.price;

		if (this.deposit === 0) {
			if (item.stock) {
				this.setMoneyDisplayValue(price);
			} else {
				this.setUnavailableItemDisplayValue();
			}
		} else {
			if (this.deposit < price) {
				this.setNotEnoughMoneyDisplayValue();
			} else if (Math.abs(this.deposit - price) < 0.01) {
				this.tray.push(productName.toLowerCase());
				this.setDispensedItemDisplayValue();
			} else if (this.deposit > price) {
				this.tray.push(productName.toLowerCase());
				this.setDispensedItemDisplayValue();
				this.changeTray += this.deposit - price;
			}
		}
	}

};