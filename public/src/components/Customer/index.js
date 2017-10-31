import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/customer',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'customer-create',
	    component: Create
	}, {
	    path: '',
	    name: 'customer-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'customer-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'customer-edit',
		    component: Edit
		}]
	}]
};