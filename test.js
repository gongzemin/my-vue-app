'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mock = void 0
function mock(obj, key, mock) {
  var _a
  var origFn = obj[key]
  var count = 0
  obj[key] = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    count++
    return mock.apply(void 0, args)
  }
  return (
    (_a = {
      get count() {
        return count
      },
    }),
    (_a[Symbol.dispose] = function () {
      console.log('disposing')
      obj[key] = origFn
    }),
    _a
  )
}
exports.mock = mock
var MyModule = {
  sum: function (a, b) {
    return a + b
  },
  product: function (a, b) {
    var p = 0
    while (a--) {
      p = MyModule.sum(p, b)
    }
    return p
  },
}
{
  var m = mock(MyModule, 'sum', function () {
    return 10
  })
  var x_1 = MyModule.product(3, 4)
  console.log(x_1)
  console.log('call count', m.count)
}
var x = MyModule.product(3, 4)
console.log(x)
