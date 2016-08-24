# m-datetime-pciker

---

日期时间选择器,基于m-picker扩展来

## 何时使用

需要选择日期时间时，代替系统原生的datetime input

## 用法

基本的用法，默认是日期时间选择器，返回格式为`'yyyy-MM-dd HH:mm'`

通过设置`dateFormat`改变日期时间的选择字段及格式；

关键字含义：Y:'年', M:'月', d:'日', H:'时', m:'分', s:'秒'

通过设置`minDate`和`maxDate`限定日期选择的范围；

通过设置`defaultValue`改变初始值，注意，如果初始值不在限定日期内，则会失效。


## API

属性基本继承自Picker组件

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| onOpen      |  弹层打开时  | Function | noop       |
| onClose   | 弹层关闭时 | Function | noop |
| defaultValue | 默认时间，是一个时间戳 | number | `+new Date()` |
| dateFormat | 日期时间的格式`{Y:'年', M:'月', d:'日', H:'时', m:'分', s:'秒'}` | string | `'Y-M-d H:m'` |
| minDate | 限定起始日期，xxxx-xx-xx格式（或者要求作为new Date的参数能够返回正确的值）| string | `'1970-01-01'` |
| maxDate | 限定终止日期，同上 | string | `'2040-12-31'` |
| toolbar | 是否显示弹层的标题栏 | boolean | `true` |
| toolbarTitle | 弹层标题栏的内容 | string | `'请选择'` | 
| showSubmitBtn | 是否显示弹层的确定按钮 | boolean | `true` |
| showClearBtn | 是否显示弹层的清除按钮 | boolean | `false` |


