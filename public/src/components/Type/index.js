import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/type',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'type-create',
	    component: Create
	}, {
	    path: '',
	    name: 'type-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'type-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'type-edit',
		    component: Edit
		}]
	}]
}