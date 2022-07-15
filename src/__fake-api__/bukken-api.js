class BukkenApi {
	getBukken() {
		const bukken = [
			{
				id: 'HONR0000001',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '自宅',
				plan: '2LDK',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: 'HONR0000002',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '自宅',
				plan: '5LDK',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: 'HONR0000003',
				image: null,
				type: '自宅',
				plan: '5LDK',
				registeredAt: '2022/05/01 10:00:00',
			},
		];

		return Promise.resolve(bukken);
	}

	getRelatedDocs() {
		const docs = [
			{
				id: '528651571NT',
				name: 'AAA.pdf',
				overview: 'XXXのファイル',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671JR',
				name: 'BBB.pdf',
				overview: 'XXXのファイル',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671JC',
				name: 'CCC.pdf',
				overview: 'XXXのファイル',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671JD',
				name: 'DDD.pdf',
				overview: 'XXXのファイル',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671JE',
				name: 'EEE.pdf',
				overview: 'XXXのファイル',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(docs);
	}

	getHistory() {
		const history = [
			{
				id: '528651571N1',
				overview: 'XXXXXXXXXXX',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J2',
				overview: 'XXXXXX',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				overview: 'XXX',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J4',
				overview: 'XXXXX',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				overview: 'XXXXXXXXXXX',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getExterirorList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				type: 'ブロック塀',
				name: 'ブロック塀A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				type: 'ブロック塀',
				name: 'ブロック塀B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				type: 'ブロック塀',
				name: 'ブロック塀C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				type: 'ブロック塀',
				name: 'ブロック塀D',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				type: 'ブロック塀',
				name: 'ブロック塀E',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: 'ブロック塀',
				name: 'ブロック塀D',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getRoomList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				type: '和室',
				name: '部屋A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				type: '寝室',
				name: '部屋B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				type: 'ダイニング',
				name: '部屋C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				type: '子供部屋',
				name: '子供部屋E',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getInteriorList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				name: '扉A',
				place: '部屋A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				name: '扉A',
				place: '部屋B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				name: '扉C',
				place: '部屋C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				name: '照明A',
				place: '部屋A',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				name: '照明B',
				place: '部屋B',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				name: '照明C',
				place: '部屋C',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getElectronicsList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				type: '和室',
				name: '部屋A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				type: '寝室',
				name: '部屋B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				type: 'ダイニング',
				name: '部屋C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				type: '子供部屋',
				name: '子供部屋E',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getFurnitureList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				type: '和室',
				name: '部屋A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				type: '寝室',
				name: '部屋B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				type: 'ダイニング',
				name: '部屋C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				type: '子供部屋',
				name: '子供部屋E',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getEquipmentList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				type: '和室',
				name: '部屋A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				type: '寝室',
				name: '部屋B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				type: 'ダイニング',
				name: '部屋C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				type: '子供部屋',
				name: '子供部屋E',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getOtherList() {
		const history = [
			{
				id: '528651571N1',
				image: '/static/mock-images/covers/cover_1.jpg',
				type: '和室',
				name: '部屋A',
				registeredAt: '2022/01/01 10:00:00',
			},
			{
				id: '311658671J2',
				image: '/static/mock-images/covers/cover_2.jpg',
				type: '寝室',
				name: '部屋B',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				image: '/static/mock-images/covers/cover_3.jpg',
				type: 'ダイニング',
				name: '部屋C',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				image: null,
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J5',
				image: '/static/mock-images/covers/cover_5.jpeg',
				type: '子供部屋',
				name: '子供部屋E',
				registeredAt: '2022/11/01 10:00:00',
			},
			{
				id: '311658671J6',
				image: '/static/mock-images/covers/cover_6.jpeg',
				type: '子供部屋',
				name: '部屋D',
				registeredAt: '2022/10/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}

	getHistoryList() {
		const history = [
			{
				id: '528651571N1',
				type: '物件',
				name: '',
				overview: 'XXXの修繕',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J2',
				type: '外装',
				name: 'ブロック塀A',
				overview: 'XXXの修繕',
				registeredAt: '2022/10/01 10:00:00',
			},
			{
				id: '311658671J3',
				type: '部屋',
				name: '部屋C',
				overview: 'XXXの修繕',
				registeredAt: '2022/13/01 10:00:00',
			},
			{
				id: '311658671J4',
				type: '建具（既製品）',
				name: 'ダイニングテーブルA',
				overview: 'XXXの修繕',
				registeredAt: '2022/05/01 10:00:00',
			},
			{
				id: '311658671J5',
				type: '建具（オーダー品）',
				name: 'ダイニングテーブルB',
				overview: 'XXXの修繕',
				registeredAt: '2022/01/01 10:00:00',
			},
		];

		return Promise.resolve(history);
	}
}

export const bukkenApi = new BukkenApi();
