import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/model',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'model-create',
	    component: Create
	}, {
	    path: '',
	    name: 'model-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'model-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'model-edit',
		    component: Edit
		}]
	}]
}