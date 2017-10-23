import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/gas',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'gas-create',
	    component: Create
	}, {
	    path: '',
	    name: 'gas-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'gas-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'gas-edit',
		    component: Edit
		}]
	}]
}