<template>

	<main>
		<!-- <RebateTable /> -->
		<!-- <RebateTableCopy /> -->
		<RebateTableCopy2 />
	</main>
</template>

<script setup>
import RebateTable from './RebateTable.vue';
import RebateTableCopy from './RebateTable copy.vue';
import RebateTableCopy2 from './RebateTable copy 2.vue';

</script>

<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
