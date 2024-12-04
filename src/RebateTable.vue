<template>
	<div class="w-100 mx-auto d-flex flex-column justify-content-center align-items-center" style="max-width: 1200px;">
		<div class="row Table">
			<div class="col-4 Table_Header d-flex justify-content-center align-items-center"
				style="border-right: 1px solid #0047FF;">
				<div class="fw-bold text-uppercase text-center py-2">
					uid
				</div>
			</div>
			<div class="col-4 Table_Header d-flex justify-content-center align-items-center"
				style="border-right: 1px solid #0047FF;">
				<div class="fw-bold text-uppercase text-center py-2">
					turnover
				</div>
			</div>
			<div class="col-4 Table_Header d-flex justify-content-center align-items-center">
				<div class="fw-bold text-uppercase text-center py-2">
					rebate amount (rm)
				</div>
			</div>
		</div>

		<div class="Table_Body_Container w-100 overflow-hidden"
			style="border: 1px solid #0047FF; max-height: 205px; position: relative;">
			<div class="Table_Body_Wrapper w-100 d-flex flex-column align-items-center">
				<!-- Loop through rows -->
				<div class="row Table_Body" v-for="(entry, index) in visibleData" :key="`${entry.uid}-${index}`"
					:style="{ transform: `translateY(${index > 0 ? tableOffset : 0}px)`, transition: 'transform 1s ease-in-out' }"
					:class="{ 'fade-out': index === 0 }">

					<div class="col-4 Table_Content_Box d-flex justify-content-center align-items-center">
						<div class="fw-bold text-uppercase text-center py-2">
							{{ entry.maskedUID }}
						</div>
					</div>
					<div class="col-4 Table_Content_Box d-flex justify-content-center align-items-center">
						<div class="fw-bold text-uppercase text-center py-2">
							{{ entry.turnover }}
						</div>
					</div>
					<div class="col-4 Table_Content_Box d-flex justify-content-center align-items-center">
						<div class="fw-bold text-uppercase text-center py-2">
							{{ entry.amount }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import playerDetail from './assets/playerDetail.json';

export default {
	data() {
		return {
			playerDetail: playerDetail,
			visibleData: [], // To store all the player data
			tableOffset: 0, // Offset to move rows upwards
			rowHeight: 41, // Height of one row in pixels
		};
	},
	computed: {
		// Prepare all data with masked UIDs
		formattedData() {
			return this.playerDetail.map(item => ({
				...item,
				maskedUID: item.uid ? this.applyMask(item.uid) : "Invalid UID",
			}));
		},
	},
	methods: {
		// Apply masking to the UID
		applyMask(uid) {
			uid = uid.toString();
			if (uid.length < 2) return uid;
			const firstChar = uid.charAt(0).toUpperCase();
			const lastChar = uid.charAt(uid.length - 1);
			const maskedMiddle = '*'.repeat(uid.length - 2);
			return `${firstChar}${maskedMiddle}${lastChar}`;
		},

		// Remove the first row and shift others
		removeRow() {
			if (this.visibleData.length) {
				// Move up the table and rotate first row to the end
				this.tableOffset -= this.rowHeight;

				// After 1 second, rotate the first row to the end
				setTimeout(() => {
					const firstRow = this.visibleData.shift();
					this.visibleData.push(firstRow); // Append the first row to the end
					this.tableOffset = 0; // Reset the offset to initial state
				}, 1000); // Match the animation duration
			}
		}
	},
	mounted() {
		// Initialize the visible data
		this.visibleData = [...this.formattedData];

		// Trigger the first animation immediately
		this.removeRow();

		// Continue the animation loop
		setInterval(() => {
			this.removeRow();
		}, 1500); // Execute every 1.5 seconds
	},
};
</script>

<style scoped>
.Table {
	border: 1px solid #0047FF;
	border-collapse: collapse;
	width: 100%;
}

.Table_Body_Container {
	scrollbar-width: none;
	-ms-overflow-style: none;
	overflow: hidden;
	position: relative;
}

.Table_Body_Container::-webkit-scrollbar {
	display: none;
}

.Table_Body {
	width: 100%;
	border-collapse: collapse;
	border-bottom: 0.5px solid white;
}

.Table_Body:last-child {
	border-bottom: unset;
}

.Table_Header {
	color: #0047FF;
	background-color: #FFF;
}

.Table_Content_Box {
	color: #FFF;
	background-color: #0047FF;
	border-right: 0.5px solid white;
	font-weight: 700;
}

.Table_Content_Box:last-child {
	border-right: unset;
}

.Table_Body_Wrapper {
	position: relative;
}

/* Fade-out animation for the first row */
.fade-out {
	transform-origin: top;
	animation: flip 1.5s ease-in-out;
}

@keyframes flip {
	25% {
		transform: rotateX(0deg);
	}

	100% {
		transform: rotateX(90deg);
	}
}
</style>
