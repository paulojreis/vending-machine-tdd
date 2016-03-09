describe('Vending Machine', function() {
	var vendMachine;

	beforeEach(function() {
		vendMachine = new VendingMachine();
	});

	describe('Initial state', function() {
		it('Should start with no money deposit', function() {
			expect(vendMachine.readDisplay()).toBe('€ 0.00');
		});

		it('Should return the beer price when the beer button is pressed and there is no money deposit', function() {
			vendMachine.pressBeerButton();

			expect(vendMachine.readDisplay()).toBe('€ 2.40');
		});

		it('Should return the coke price when the coke button is pressed and there is no money deposit', function() {
			vendMachine.pressCokeButton();

			expect(vendMachine.readDisplay()).toBe('€ 1.80');
		});
	});

	describe('Accept money', function() {
		it('Should accept € 1,00 coin', function() {
			vendMachine.putCoin(1);

			expect(vendMachine.readDisplay()).toBe('€ 1.00');
		});

		it('Should ignore the 5 cents coin', function() {
			vendMachine.putCoin(0.05);

			expect(vendMachine.readDisplay()).toBe('€ 0.00');
		});

		it('Should accept multiple coins', function() {
			vendMachine.putCoin(0.2);
			vendMachine.putCoin(1);

			expect(vendMachine.readDisplay()).toBe('€ 1.20');
		});

		it('Should accept multiple coins but still ignore unacceptable coins', function() {
			vendMachine.putCoin(0.2);
			vendMachine.putCoin(0.01);
			vendMachine.putCoin(1);
			vendMachine.putCoin(2);

			expect(vendMachine.readDisplay()).toBe('€ 3.20');
		});
	});

	describe('Dispense products', function() {
		it('Should inform that money is not enough', function() {
			vendMachine.putCoin(1);
			vendMachine.pressBeerButton();

			expect(vendMachine.readDisplay()).toBe('Not enough money.');
		});

		it('Should dispense product when money is just enough', function() {
			vendMachine.putCoin(1);
			vendMachine.putCoin(1);
			vendMachine.putCoin(0.2);
			vendMachine.putCoin(0.2);

			vendMachine.pressBeerButton();

			expect(vendMachine.readDisplay()).toBe('Item dispensed.');
			expect(vendMachine.trayHasItem('beer')).toBe(true);
		});

		it('Should dispense product and change when money is more than enough', function() {
			vendMachine.putCoin(1);
			vendMachine.putCoin(1);
			vendMachine.putCoin(0.2);
			vendMachine.putCoin(0.5);

			vendMachine.pressBeerButton();

			expect(vendMachine.readDisplay()).toBe('Item dispensed.');
			expect(vendMachine.trayHasItem('beer')).toBe(true);
			expect(vendMachine.getChangeTrayAmount()).toBe(0.3);
		});
	});

	describe('Cancel button', function() {
		it('Should not do anything if the cancel button is pressed and there is no deposit', function() {
			vendMachine.pressCancelButton();

			expect(vendMachine.readDisplay()).toBe('€ 0.00');
		});

		it('Should return the deposit if the cancel button is pressed and there is deposit', function() {
			vendMachine.putCoin(1);
			vendMachine.putCoin(1);
			vendMachine.putCoin(0.2);
			vendMachine.putCoin(0.5);

			vendMachine.pressCancelButton();

			expect(vendMachine.getChangeTrayAmount()).toBe(1 + 1 + 0.2 + 0.5);
			expect(vendMachine.readDisplay()).toBe('€ 0.00');
		});
	});

	describe('Handle stock', function() {
		it('Should inform the client that there is no stock when he presses the product button without a deposit', function() {
			vendMachine.pressWaterButton();

			expect(vendMachine.readDisplay()).toBe('Item unavailable.');
		});
	});
});
