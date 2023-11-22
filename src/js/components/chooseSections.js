init(() => {
	Alpine.data("chooseSections", () => ({
		allSections: [
			{
				sectionName: "Home",
				pricePerMonth: 150000,
			},
			{
				sectionName: "News",
				pricePerMonth: 150000,
				subSections: [
					{
						sectionName: "Politics",
						viewPercentage: 10,
					},
					{
						sectionName: "Government",
						viewPercentage: 20,
					},
					{
						sectionName: "GCPR",
						viewPercentage: 18,
					},
					{
						sectionName: "International",
						viewPercentage: 40,
					},
					{
						sectionName: "CBN",
						viewPercentage: 12,
					},
				],
			},
			{
				sectionName: "Sports",
				pricePerMonth: 70000,
				subSections: [
					{
						sectionName: "Football",
						viewPercentage: 43,
					},
					{
						sectionName: "Basketball",
						viewPercentage: 9,
					},
					{
						sectionName: "Formula 1",
						viewPercentage: 12,
					},
					{
						sectionName: "Baseball",
						viewPercentage: 15,
					},
					{
						sectionName: "Moto GP",
						viewPercentage: 20,
					},
				],
			},
			{
				sectionName: "Entertainment",
				pricePerMonth: 90000,
				subSections: [
					{
						sectionName: "Music",
						viewPercentage: 50,
					},
					{
						sectionName: "Comedy",
						viewPercentage: 15,
					},
					{
						sectionName: "Nollywood",
						viewPercentage: 7,
					},
					{
						sectionName: "Culture",
						viewPercentage: 10,
					},
					{
						sectionName: "Lifestyle",
						viewPercentage: 20,
					},
				],
			},
		],
		selectedSections: [],
		totalCostPerMonth: 0,
		filterValue: "",

		checkAndUncheck(subSection, sectionName, bool) {
			if (subSection.identifier && subSection.identifier === sectionName) {
				subSection.checked = bool;
			}
		},

		selectSubsections(element, subSections, sectionName) {
			if (element.firstElementChild.checked) {
				subSections.forEach((subSection) => {
					this.checkAndUncheck(subSection, sectionName, true);
				});
			} else {
				subSections.forEach((subSection) => {
					this.checkAndUncheck(subSection, sectionName, false);
				});
			}
		},

		getSelectedSections(sections) {
			this.selectedSections = sections.filter((section) => section.checked);
		},

		returnSubsections(subSections, parentSection) {
			let eachSubsections = subSections.filter(
				(subSection) => subSection.identifier === parentSection.name
			);
			return eachSubsections;
		},

		checkSubSections(subSections, parentSection) {
			const parentSectionSub_sections = this.returnSubsections(
				subSections,
				parentSection
			);
			return parentSectionSub_sections.every((sec) => sec.checked);
		},

		calculateTotalCost(sections) {
			let parentSections = [];
			let subSections = [];
			this.totalCostPerMonth = 0;

			sections.forEach((section) => {
				if (section.isParentSection) {
					parentSections.push(section);
				} else {
					subSections.push(section);
				}
			});

			parentSections.forEach((section) => {
				if (this.returnSubsections(subSections, section).length > 0) {
					if (!this.checkSubSections(subSections, section)) {
						section.checked = false;
					} else {
						section.checked = true;
					}

					if (section.checked && this.checkSubSections(subSections, section)) {
						this.totalCostPerMonth += section.placementPrice;
					}

					if (
						!section.checked &&
						!this.checkSubSections(subSections, section)
					) {
						this.returnSubsections(subSections, section).forEach((sec) => {
							if (sec.checked) {
								this.totalCostPerMonth += sec.placementPrice;
							}
						});
					}
				} else {
					if (section.checked) {
						this.totalCostPerMonth += section.placementPrice;
					}
				}
			});

			this.getSelectedSections(sections);
		},

		uncheckSectionsWithPill(sections, sectionName, pill) {
			const removedSection = sections.find(
				(section) => section.originalName === sectionName
			);
			const subSections = sections.filter((sec) => !sec.isParentSection);

			if (pill.mySecIsParent) {
				removedSection.checked = false;
				this.returnSubsections(subSections, removedSection).forEach((sec) => {
					sec.checked = false;
				});
			} else {
				removedSection.checked = false;
			}
		},
	}));
});
