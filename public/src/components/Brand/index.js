import View from './View'
import List from './List'
import Edit from './Edit'
import Create from './Create'

export default {
	path: '/brand',
	component: {
		template: '<router-view></router-view>'
	},
	children: [{
	    path: 'create',
	    name: 'brand-create',
	    component: Create
	}, {
	    path: '',
	    name: 'brand-list',
	    component: List
	}, {
	    path: ':id',
	    component: {
	    	template: '<router-view></router-view>'
	    },
	    children: [{
	    	path: '',
	    	name: 'brand-view',
	    	component: View
	    }, {
		    path: 'edit',
		    name: 'brand-edit',
		    component: Edit
		}]
	}]
}