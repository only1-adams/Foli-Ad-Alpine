init(() => {
	Alpine.data("chooseAdType", () => ({
		chosenType: {
			type: "",
			adWidth: 0,
			adHeight: 0,
		},

		adDimension(types) {
			if (this.chosenType.type !== "") {
				const adType = types.find(
					(type) => type.value === this.chosenType.type
				);
				this.chosenType.adWidth = adType.dataset.dimensionwidth;
				this.chosenType.adHeight = adType.dataset.dimensionheight;
			}
		},
	}));
});
