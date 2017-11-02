import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/rent',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create/:id',
	    name: 'rent-create',
	    component: Create
	}, {
	    path: '',
	    name: 'rent-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'rent-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'rent-edit',
		    component: Edit
		}]
	}]
};