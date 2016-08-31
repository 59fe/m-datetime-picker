'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./index.less");
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pickerM = require('m-picker');

var _pickerM2 = _interopRequireDefault(_pickerM);

var _util = require('m-base/js/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getNumberAry = function getNumberAry(max) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    var arr = [];
    for (var i = min; i <= max; i++) {
        arr.push(i < 10 ? '0' + i : i);
    }
    return arr;
};

var getDaysByMonthAndYear = function getDaysByMonthAndYear(month, year) {
    var int_d = new Date(year, parseInt(month), 1); // 下个月的第一天，而不是当前月的第一天
    var d = new Date(int_d - 1); // 上个月(即本月)的最后一天
    return getNumberAry(d.getDate(), 1);
};

var formatNumber = function formatNumber(n) {
    return n < 10 ? '0' + n : n;
};

var _colLength = {
    M: [12, 1],
    d: [31, 1],
    H: [23, 0],
    m: [59, 0],
    s: [59, 0]
};

// 计算每一列的数据
var getCols = function getCols() {
    var fmt = arguments.length <= 0 || arguments[0] === undefined ? 'Y-M-d H:m' : arguments[0];
    var minDate = arguments[1];
    var maxDate = arguments[2];

    var cols = [];
    fmt.split('').forEach(function (x) {
        if (x === 'Y') {
            cols.push({ values: getNumberAry(maxDate.getFullYear(), minDate.getFullYear()) });
        } else if (/[MdHms]/.test(x)) {
            cols.push({ values: getNumberAry.apply(undefined, _toConsumableArray(_colLength[x])) });
        } else {
            cols.push({ divider: true, content: x });
        }
    });
    return cols;
};

/*const defaults = {
 defaultValue: [today.getFullYear(), formatNumber(today.getMonth() + 1), formatNumber(today.getDate()), today.getHours(), formatNumber(today.getMinutes())],
 formatValue: (p, values, displayValues) => displayValues[0] + '-' + values[1] + '-' + values[2] + ' ' + values[3] + ':' + values[4],
 onChange: function (picker, values, displayValues) {
 const cols = picker.cols.filter(col => !col.divider); // 过滤掉divider
 const days = getDaysByMonthAndYear(cols[1].value, cols[0].value);
 let currentValue = cols[2].value;
 if (currentValue > days.length) {currentValue = days.length}
 cols[2].setValue(currentValue);
 },

 cols: [
 {
 values: getNumberAry(2040, 1970) // Years
 },
 {
 divider: true,  // Divider
 content: '-'
 },
 {
 values: getNumberAry(12) // Months
 },
 {
 divider: true,  // Divider
 content: '-'
 },
 {
 values: getNumberAry(31) // Days
 },
 {
 values: getNumberAry(24) // Hours
 },
 {
 divider: true,  // Divider
 content: ':'
 },
 {
 values: getNumberAry(60) // Minutes
 }
 ]
 }*/

var DatetimePicker = function (_Component) {
    _inherits(DatetimePicker, _Component);

    function DatetimePicker(props) {
        _classCallCheck(this, DatetimePicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatetimePicker).call(this, props));

        _this.fmtAry = props.dateFormat.split('');
        _this.yearIndex = _this.fmtAry.indexOf('Y');
        _this.monthIndex = _this.fmtAry.indexOf('M');
        _this.dateIndex = _this.fmtAry.indexOf('d');
        _this.hoursIndex = _this.fmtAry.indexOf('H');
        _this.minutesIndex = _this.fmtAry.indexOf('m');
        _this.secondsIndex = _this.fmtAry.indexOf('s');
        var minDateArr = props.minDate.split('-');
        _this.minDate = new Date(+minDateArr[0], minDateArr[1] - 1, +minDateArr[2]);
        var maxDateArr = props.maxDate.split('-');
        _this.maxDate = new Date(+maxDateArr[0], maxDateArr[1] - 1, +maxDateArr[2]);


        _this.options = {
            defaultValue: _this.getDefaultValue.bind(_this)(),

            formatValue: _this.getFmtValue.bind(_this),

            onChange: _util2.default.createChainedFunction(_this.handleChange.bind(_this), props.onChange)
        };
        _this.options.cols = getCols(props.dateFormat, _this.minDate, _this.maxDate);
        _this.options = _extends({}, props, _this.options);
        return _this;
    }

    _createClass(DatetimePicker, [{
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            var _result = [];
            var dfv = this.props.defaultValue;
            // 可以没有默认值
            if (dfv) {
                var initDate = new Date(dfv);
                if (+initDate > +this.maxDate) initDate = this.maxDate;
                if (+initDate < +this.minDate) initDate = this.minDate;
                this.fmtAry.forEach(function (x) {
                    if (x === 'Y') {
                        _result.push(initDate.getFullYear());
                    } else if (x === 'M') {
                        _result.push(formatNumber(initDate.getMonth() + 1));
                    } else if (x === 'd') {
                        _result.push(formatNumber(initDate.getDate()));
                    } else if (x === 'H') {
                        _result.push(formatNumber(initDate.getHours()));
                    } else if (x === 'm') {
                        _result.push(formatNumber(initDate.getMinutes()));
                    } else if (x === 's') {
                        _result.push(formatNumber(initDate.getSeconds()));
                    }
                });
            }
            return _result;
        }
    }, {
        key: 'getFmtValue',
        value: function getFmtValue(picker, values, displayValues) {
            // 如果是空数组，表示此时日期选择器默认值是空，不需要补全“年月日”的汉字
            if (!displayValues.length) return ''

            var _result = [];
            var index = 0;
            this.fmtAry.forEach(function (x) {
                if (/[YMdHms]/.test(x)) {
                    _result.push(displayValues[index++]);
                } else {
                    _result.push(x);
                }
            });
            return _result.join('');
        }

        // 日期校验

    }, {
        key: 'handleChange',
        value: function handleChange(picker, values, displayValues) {
            if (this.monthIndex === -1 || this.dateIndex === -1) return;
            var cols = picker.cols;
            // 如果没有年，则按今年算
            var year = this.yearIndex > -1 ? cols[this.yearIndex].value : new Date().getFullYear();
            var month = cols[this.monthIndex].value;
            var _days = getDaysByMonthAndYear(month, year);
            var currentValue = cols[this.dateIndex].value;
            if (currentValue > _days.length) {
                currentValue = _days.length;
            }
            cols[this.dateIndex].setValue(currentValue);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_pickerM2.default, this.options);
        }
    }]);

    return DatetimePicker;
}(_react.Component);

DatetimePicker.propTypes = {
    onOpen: _react.PropTypes.func,
    onClose: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),// 默认的时间，timestamp，默认为现在
    dateFormat: _react.PropTypes.string, // Y: 年, M: 月, d: 日期, H: 时, m: 分, s: 秒，如果格式不规范，可能会导致一些奇怪的结果
    minDate: _react.PropTypes.string, // 起始日期, xxxx-xx-xx格式
    maxDate: _react.PropTypes.string, // 最大日期，格式同上

    toolbar: _react.PropTypes.bool,
    toolbarTitle: _react.PropTypes.node,
    showSubmitBtn: _react.PropTypes.bool,
    showClearBtn: _react.PropTypes.bool
};

DatetimePicker.defaultProps = {
    onOpen: function onOpen(x) {
        return x;
    },
    onClose: function onClose(x) {
        return x;
    },
    onChange: function onChange(x) {
        return x;
    },
    defaultValue: +new Date(),
    dateFormat: 'Y-M-d H:m',
    minDate: '1970-01-01',
    maxDate: '2040-12-31',

    toolbar: true,
    toolbarTitle: '请选择',
    showSubmitBtn: true,
    showClearBtn: false
};

exports.default = DatetimePicker;
module.exports = exports['default'];
