import Create from './Create';

export default {
	path: '/inspect',
	component: {
		template: '<router-view/>'
	},
	children: [{
		path: 'create/:id',
		name: 'inspect-create',
		component: Create
	}, {
		path: ':id',
		name: 'inspect-list',
		component: {
			template: 'See'
		}
	}]
};