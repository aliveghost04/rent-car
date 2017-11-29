import http from './http'
import moment from 'moment'

const path = '/report'

export default {
  getAll: (params) => {
    return http.get(path, {
      params
    }).then(res => {
      return res
        .data
        .map(rent => {
          try {
            return {
              customer: `${rent.customer.name} (${rent.customer.cedula})`,
              vehicle: `${rent.vehicle.brand.description} 
                        ${rent.vehicle.model.description} 
                        (${rent.vehicle.plateNumber})`,
              rentDate: moment(rent.rentDate).format('DD/MM/YYYY'),
              returnedDate: moment(rent.returnedDate).format('DD/MM/YYYY'),
              surcharge: rent.surcharge || 'NA',
              total: rent.total ? rent.total.toFixed(2) : 'NA'
            }
          } catch (e) {
            console.error(e, rent)
            return {
              customer: '',
              vehicle: '',
              rentDate: '',
              returnedDate: '',
              surcharge: '',
              total: ''
            }
          }
        })
    })
  }
}
