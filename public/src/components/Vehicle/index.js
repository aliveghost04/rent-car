import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/vehicle',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'vehicle-create',
	    component: Create
	}, {
	    path: '',
	    name: 'vehicle-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'vehicle-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'vehicle-edit',
		    component: Edit
		}]
	}]
};