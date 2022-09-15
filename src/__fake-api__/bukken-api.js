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

	getUser() {
		const user = {
			id: '5e86805e2bafd54f66cc95c3',
			surname: '山田',
			name: '太郎',
			surnameKana: 'ヤマダ',
			nameKana: 'タロウ',
			email: 't.yamada@xxxx.co.jp',
		};

		return Promise.resolve(user);
	}

	getInformationList() {
		const information = [
			{
				id: '528651571N1',
				type: 'お知らせ',
				name: 'XXキャンペインのお知らせ',
				registeredAt: '2022/08/29 15:08',
			},
			{
				id: '311658671J2',
				type: '重要なお知らせ',
				name: 'XX製給湯器をお使いの方',
				registeredAt: '2022/08/29 15:09',
			},
		];

		return Promise.resolve(information);
	}

	getCsInformationList() {
		const information = [
			{
				id: '528651571N1',
				status: '下書き',
				type: 'お知らせ',
				url: '/images/mock-images/covers/cover_3.jpg',
				name: 'XXキャンペインのお知らせ',
				sendAt: '',
				registeredAt: '2022/09/15 12:34',
			},
			{
				id: '528651571N2',
				status: '下書き',
				type: 'お知らせ',
				url: '/images/mock-images/covers/cover_3.jpg',
				name: '〇〇キャンペインのお知らせ',
				sendAt: '2022/10/01 11:01',
				registeredAt: '2022/09/12 13:45',
			},
			{
				id: '528651571N3',
				status: '未送信',
				type: '重要なお知らせ',
				url: '',
				name: 'XX製給湯器をお使いの方',
				sendAt: '',
				registeredAt: '2022/08/30 17:11',
			},
			{
				id: '311658671J2',
				status: '送信予定',
				type: '重要なお知らせ',
				url: '/images/mock-images/covers/cover_3.jpg',
				name: '〇〇製給湯器をお使いの方',
				sendAt: '2022/09/01 11:01',
				registeredAt: '2022/08/05 14:31',
			},
			{
				id: '311658671J3',
				status: '送信済',
				type: '重要なお知らせ',
				url: '/images/mock-images/covers/cover_3.jpg',
				name: 'XX製〇〇リコールのお知らせ',
				sendAt: '2022/08/01 11:01',
				registeredAt: '2022/07/28 15:34',
			},
		];

		return Promise.resolve(information);
	}

	getCsDestinationList() {
		const information = [
			{
				id: '528651571N1',
				status: '有効',
				delivery: false,
				email: 'tanaka1@example.com',
				name: '田中 一郎',
				nameKana: 'タナカ イチロウ',
			},
			{
				id: '528651571N2',
				status: '有効',
				delivery: true,
				email: 'tanaka2@example.com',
				name: '田中 二郎',
				nameKana: 'タナカ ジロウ',
			},
			{
				id: '528651571N3',
				status: '有効',
				delivery: false,
				email: 'tanaka3@example.com',
				name: '田中 三郎',
				nameKana: 'タナカ サブロウ',
			},
			{
				id: '311658671J2',
				status: '有効',
				delivery: false,
				email: 'tanaka4@example.com',
				name: '田中 四郎',
				nameKana: 'タナカ シロウ',
			},
			{
				id: '311658671J3',
				status: '無効',
				delivery: true,
				email: 'tanaka5@example.com',
				name: '田中 五郎',
				nameKana: 'タナカ ゴロウ',
			},
		];

		return Promise.resolve(information);
	}
}

export const bukkenApi = new BukkenApi();
