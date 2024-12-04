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
			<!-- Apply transition to the entire table body -->
			<div class="Table_Body_Wrapper w-100 d-flex flex-column align-items-center"
				:style="{ transform: `translateY(${tableOffset}px)`, transition: 'transform 0.5s ease' }">

				<!-- Loop through rows with dynamic class for the first row -->
				<transition-group name="fade" tag="div" class="w-100 d-flex flex-column align-items-center">
					<div class="row Table_Body" v-for="(entry, index) in visibleData" :key="`${entry.uid}-${index}`"
						:id="`${entry.uid}-${index}`" :class="{ 'fade-out': index === 0 }">
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
				</transition-group>
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
			tableOffset: 0, // Offset to move the table upwards
			rowHeight: 41, // Height of one row in pixels
		};
	},
	computed: {
		// Simply set all player data
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

		// Function to remove first row and shift up
		removeRow() {
			if (this.visibleData.length) {
				setTimeout(() => {
					// this.visibleData.shift(); // Remove the first row
					// const firstRow = this.visibleData.shift(); // Remove the first row
					// this.visibleData.push(firstRow); // Add it to the end
					this.tableOffset -= this.rowHeight; // Move the table up
				}, 500); // Delay the row removal to sync with fade-out animation
			}
		}
	},
	mounted() {
		// Initialize data
		this.visibleData = [...this.formattedData];

		// Start moving the table upwards and removing the first row periodically
		setInterval(() => {
			this.removeRow(); // Remove the first row and move the table up
		}, 2000); // This will execute every 2 seconds
	},
};
</script>

<style scoped>
.Table {
	border: 1px solid #0047FF;
	border-collapse: collapse;
	width: 100%;
	transform-style: preserve-3d;
	transition: transform 0.5s ease-in-out;
}

.Table_Body_Container {
	scrollbar-width: none;
	-ms-overflow-style: none;
	overflow: hidden;
	/* Hide the content outside the container */
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

/* Animation for fading out the first row */
.fade-enter-active,
.fade-leave-active {
	transform-origin: top;
	transition: transform 0.5s ease;
}

.fade-enter,
.fade-leave-to {
	transform: rotateX(90deg);
}
</style>
