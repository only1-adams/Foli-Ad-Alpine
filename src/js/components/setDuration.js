init(() => {
	Alpine.data("setDuration", () => ({
		duration: 1,
		overallCost: 0,
		walletBalance: 300_000,

		setCost(costPerMonth) {
			this.overallCost = costPerMonth;
			this.overallCost *= this.duration;
		},
	}));
});
