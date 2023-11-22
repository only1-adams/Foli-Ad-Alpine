init(() => {
	Alpine.data("uploadMedia", () => ({
		companyName: "",
		campaignName: "",
		contactEmail: "",
		contactMobile: "",
		targetPageUrl: "",
		adImageSrc: "",
		fields: [],

		populateFields() {
			this.fields.length = 0;
			this.fields.push(
				this.companyName,
				this.campaignName,
				this.contactEmail,
				this.contactMobile,
				this.targetPageUrl
			);
		},

		uploadMedia(files) {
			if (files.length) {
				const file = files[0];
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();
					const blob = new Blob([file], {
						type: "image/",
					});
					const url = URL.createObjectURL(blob);
					this.adImageSrc = url;
					reader.readAsDataURL(file);
				}
			}
		},

		fieldsEmpty() {
			return this.fields.some((field) => field === "");
		},
	}));
});
