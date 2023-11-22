init(() => {
	Alpine.data("createAd", () => ({
		// to be created Ad Info
		adInfo: {
			type: {
				adType: "",
				adWidth: 0,
				adHeight: 0,
			},
			adSections: [],
			adDuration: 1,
			adOverallCost: 0,
			otherDetails: {
				companyName: "",
				campaignName: "",
				contactEmail: "",
				contactMobile: "",
				targetPageUrl: "",
				adImageSrc: "",
			},
		},

		// Properties for manipulating the steps circles
		currentStep: 1,
		totalSteps: 4,
		stepTitles: [
			{ title: "SELECT AD TYPE", alreadyActive: false, completed: false },
			{
				title: "CHOOSE PLACEMENT SECTION",
				alreadyActive: false,
				completed: false,
			},
			{ title: "CREATE BUDGET", alreadyActive: false, completed: false },
			{ title: "UPLOAD MEDIA", alreadyActive: false, completed: false },
		],
		// Properties for error message
		errorMessage: {
			message: "",
			show: false,
		},
		// Properties for validation
		termsAccepted: false,
		typeChosen: false,
		sectionsSelected: false,
		costPerMonth: 0,
		lowBalance: false,
		mediaFieldsEmpty: true,
		invalidEmail: true,
		invalidUrl: true,
		noImage: true,
		wrongDimension: false,
		readyToCreate: false,

		// Methods
		gotoNextStep() {
			this.currentStep++;
			if (this.currentStep > this.totalSteps) {
				this.currentStep = this.totalSteps;
			}
		},

		gotoPrevStep() {
			this.currentStep--;
			if (this.currentStep < 1) {
				this.currentStep = 1;
			}
		},

		progressLineUpdate(element) {
			const alreadyActives = this.stepTitles.filter(
				(title) => title.alreadyActive === true
			);
			const width =
				((alreadyActives.length - 1) / (this.totalSteps - 1)) * 100 + "%";

			element.style.width = width;
		},

		checkImageDimension(imageElement) {
			if (
				imageElement.naturalWidth != this.adInfo.type.adWidth ||
				imageElement.naturalHeight != this.adInfo.type.adHeight
			) {
				this.wrongDimension = true;
			} else {
				this.wrongDimension = false;
			}
		},

		validateNextSteps(imageElement) {
			try {
				if (this.currentStep === 1) {
					if (this.stepTitles) {
						this.step1Validation();
						this.stepTitles[1 - 1].completed = true; // 1-1 = index 0
					}
				}

				if (this.currentStep === 2) {
					this.step2Validation();
					this.stepTitles[2 - 1].completed = true; // 2-1 = index 1
				}

				if (this.currentStep === 3) {
					this.step3Validation();
					this.stepTitles[3 - 1].completed = true; // 3-1 = index 2
				}

				if (this.currentStep === 4) {
					if (!this.noImage) {
						this.checkImageDimension(imageElement);
					}
					this.step4Validation();
					this.stepTitles[4 - 1].completed = true; // 4-1 = index 3
					this.readyToCreate = true;
				}

				this.gotoNextStep();
			} catch (error) {
				this.errorMessage.show = true;
				this.errorMessage.message = error.message;
				setTimeout(() => {
					this.errorMessage.show = false;
				}, 5000);
			}
		},

		validateStepsWithCircles(index) {
			try {
				const gotoStep = index + 1;
				let stepTitleIndex = this.currentStep - 1;

				if (this.currentStep === 1) {
					if (
						(this.stepTitles[stepTitleIndex + 1].completed === false &&
							gotoStep === 3) ||
						(this.stepTitles[stepTitleIndex + 1].completed === false &&
							gotoStep === 4)
					) {
						throw new Error(`Please complete step ${this.currentStep + 1}`);
					} else if (
						this.stepTitles[stepTitleIndex + 2].completed === false &&
						gotoStep === 4
					) {
						throw new Error(`Please complete step ${this.currentStep + 2}`);
					} else if (
						this.stepTitles[stepTitleIndex + 2].completed === true &&
						gotoStep === 4
					) {
						this.step1Validation();
						this.stepTitles[1 - 1].completed = true;
						this.currentStep = index + 1;
					} else {
						this.step1Validation();
						this.stepTitles[1 - 1].completed = true; // 1-1 = index 0
					}
				}

				if (this.currentStep === 2) {
					if (this.stepTitles[stepTitleIndex - 1].completed && gotoStep === 1) {
						this.currentStep = index + 1;
					} else if (
						this.stepTitles[stepTitleIndex + 1].completed === false &&
						gotoStep === 4
					) {
						throw new Error(`Please complete step ${this.currentStep + 1}`);
					} else {
						this.step2Validation();
						this.stepTitles[2 - 1].completed = true; // 1-1 = index 0
					}
				}

				if (this.currentStep === 3) {
					if (
						(this.stepTitles[stepTitleIndex - 1].completed && gotoStep === 1) ||
						(this.stepTitles[stepTitleIndex - 1].completed && gotoStep === 2)
					) {
						this.currentStep = index + 1;
					} else {
						this.step3Validation();
						this.stepTitles[3 - 1].completed = true; // 1-1 = index 0
					}
				}

				this.currentStep = index + 1;
			} catch (error) {
				this.errorMessage.show = true;
				this.errorMessage.message = error.message;
				setTimeout(() => {
					this.errorMessage.show = false;
				}, 5000);
			}
		},

		step1Validation() {
			if (!this.termsAccepted) {
				throw new Error("Please accept the terms of service to continue.");
			}

			if (!this.typeChosen) {
				throw new Error("Please select the type of Ad you want to create.");
			}
		},

		step2Validation() {
			if (!this.sectionsSelected) {
				throw new Error("Please select at least one section for Ad placement.");
			}
		},

		step3Validation() {
			if (this.lowBalance) {
				throw new Error("Insufficient balance, please add funds to continue.");
			}
		},

		step4Validation() {
			if (this.mediaFieldsEmpty) {
				throw new Error("Please fill in all details.");
			}

			if (this.invalidEmail) {
				throw new Error("Please provide a valid email.");
			}

			if (this.invalidUrl) {
				throw new Error("Please provide a valid URL.");
			}

			if (this.noImage) {
				throw new Error("Please upload Ad Media.");
			}

			if (this.wrongDimension) {
				throw new Error(
					"Please upload an image with the chosen Ad type dimension."
				);
			}
		},
	}));
});
