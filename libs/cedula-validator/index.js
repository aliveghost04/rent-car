module.exports = {
  validate: function (cedula) {
    var weight = [1,2,1,2,1,2,1,2,1,2];
    
    cedula = String(cedula)
      .replace(/-/g, '');
    
    if (!/^\d{11}$/.test(cedula)) {
      var error = new Error('INVALID_CEDULA');
      error.message = 'cedula should only contain number and hyphens';
      throw error;
    }

    cedula = cedula
      .split('');

    var validator = Number(cedula.pop());
    var total = cedula
      .reduce(function (b, a, k) {
        var mult = Number(a) * weight[k];
        return mult >= 10 ? b + (mult % 10) + 1 : b + mult; 
      }, 0);

    return 10 - (total % 10) === validator;
  }
};