<template>
	<div>
		<table class="w-100 text-center" :key="tableKey">
			<thead>
				<tr>
					<td>UID</td>
					<td>Turnover</td>
					<td>Rebate Amount (RM)</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(entry, index) in formattedData.slice(visibleIndex, visibleIndex + 5)"
					:key="entry.maskedUID">
					<td>{{ entry.maskedUID }}</td>
					<td>{{ entry.turnover }}</td>
					<td>{{ entry.amount }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import playerDetail from './assets/playerDetail.json';

export default {
	data() {
		return {
			playerDetail: playerDetail,
			visibleIndex: 0, // Start from the latest data (the first in reversed data)
			interval: null, // For controlling the automatic update
			tableKey: 0, // A unique key to force table re-render
		};
	},
	computed: {
		formattedData() {
			return this.playerDetail.map(item => ({
				...item,
				maskedUID: item.uid ? this.applyMask(item.uid) : "Invalid UID",
				flip: false, // Add flip property for animation trigger
			}))
		},
	},
	methods: {
		applyMask(uid) {
			uid = uid.toString();
			if (uid.length < 2) return uid;

			const firstChar = uid.charAt(0).toUpperCase();
			const lastChar = uid.charAt(uid.length - 1);
			const maskedMiddle = '*'.repeat(uid.length - 2);
			return `${firstChar}${maskedMiddle}${lastChar}`;
		},
		updateData() {
			// Always update the visibleIndex to show the latest data at the top
			if (this.visibleIndex + 5 >= this.formattedData.length) {
				this.visibleIndex = 0; // Reset to the beginning if at the end
			} else {
				this.visibleIndex += 1; // Shift to show the next set of data
			}

			// After updating the visibleIndex, trigger a re-render for the table with a new key.
			this.tableKey++;
		}
	},
	mounted() {
		// Set interval to automatically update the data every 2 seconds
		this.interval = setInterval(this.updateData, 3000);
	},
	beforeDestroy() {
		// Clear the interval when the component is destroyed to prevent memory leaks
		clearInterval(this.interval);
	},
};
</script>

<style scoped>
table {
	border: 1px solid #0047FF;
	border-collapse: collapse;
	width: 100%;
	transform-style: preserve-3d;
	transition: transform 0.5s ease-in-out;
}

table td {
	width: calc(100% / 3);
	padding: 8px;
}

thead td {
	color: #0047FF;
	border-bottom: 1px solid #0047FF;
	border-left: 1px solid #0047FF;
	background-color: #FFF;
	font-weight: 700;
	text-transform: uppercase;
}

tbody td {
	color: white;
	border-left: 1px solid #FFF;
	background-color: #0047FF;
}

tbody tr {
	color: white;
	border-bottom: 1px solid white;
	border-left: 1px solid #FFF;
	background-color: #0844fc;
	transform: perspective(500px);
	transform-origin: top;
	/* transform-origin: center; */
	/* Pivot point at the center */
	/* animation: flip 1.5s ease-in-out, rotateOut 1.5s ease-in-out 1.5s; */
}

tbody tr:first-child {
	animation: flip 1.5s ease-in-out, rotateOut 1.5s ease-in-out 1.5s;
}

/* Flip (Rotate Toward You) Animation */
/* @keyframes flip {
	0% {
		transform: perspective(500px) rotateX(-90deg) scaleY(1.1);
	}

	100% {
		transform: perspective(500px) rotateX(0deg) scaleY(1);
	}
} */

/* Rotate Out Animation */
/* @keyframes rotateOut {
	0% {
		transform: perspective(500px) rotateX(0deg) scaleY(1);
	}

	100% {
		transform: perspective(500px) rotateX(90deg) scaleY(1.1);
	}
} */

/* Flip (Rotate Toward You) Animation */
@keyframes flip {
	0% {
		transform: rotateX(-90deg);
	}

	100% {
		transform: rotateX(0deg);
	}
}

/* Rotate Out Animation */
@keyframes rotateOut {
	0% {
		transform: rotateX(0deg);
	}

	100% {
		transform: rotateX(90deg);
	}
}

tbody tr:last-child {
	border-bottom: 2px solid #0047FF;
}
</style>
