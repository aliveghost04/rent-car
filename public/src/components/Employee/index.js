import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/employee',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'employee-create',
	    component: Create
	}, {
	    path: '',
	    name: 'employee-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'employee-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'employee-edit',
		    component: Edit
		}]
	}]
};